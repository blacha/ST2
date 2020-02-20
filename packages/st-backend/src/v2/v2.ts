import { V2Report } from '@st/api';
import { ApiV2 } from '@st/api/src/v2';
import { UserId } from '@st/api';
import { Config, Id, StLog } from '@st/shared';
import * as express from 'express';
import * as admin from 'firebase-admin';
import { HttpError } from '../http.error';
import { V2ApiHandler, V2Request } from './v2.request';
import { V2Service } from './v2.service';

export class V2 {
    static async validateUser(v2Req: V2Request, req: express.Request): Promise<UserId> {
        if (req.headers.authorization == null || !req.headers.authorization.startsWith('Bearer ')) {
            throw new HttpError(403, 'No Authorization');
        }
        // Read the ID Token from the Authorization header.
        const idToken = req.headers.authorization.split('Bearer ')[1];
        const authToken = await admin.auth().verifyIdToken(idToken);
        if (authToken == null) {
            throw new HttpError(403, 'Invalid authorization');
        }
        const userId = authToken.uid as UserId;
        const userIdPromise = Promise.resolve(userId);
        // Do not refetch the user
        v2Req.userId = () => userIdPromise;
        return userId;
    }

    static async validateParams(v2Req: V2Request, service: V2ApiHandler<ApiV2>, req: express.Request) {
        const params = service.def.request.decode(req.body);
        if (params._tag == 'Left') {
            const reason = V2Report.report(params.left);
            throw new HttpError(422, 'Invalid data', { reason });
        }
        return params.right;
    }

    async handle(req: express.Request<{ name: string }>, res: express.Response) {
        const requestId = Id.generate();
        const v2Req: V2Request = {
            id: requestId,
            userId: () => V2.validateUser(v2Req, req),
            log: StLog.child({ id: requestId, route: req.params.name }),
            logContext: {
                hash: Config.hash,
                version: Config.version,
            },
            track: (key: string, value: any) => (v2Req.logContext[key] = value),
        };

        v2Req.log.debug('Start');
        const startTime = Date.now();
        const service = V2Service.get(req.params.name as any);
        let error: Error | null = null;
        let status = 200;
        let response;

        try {
            if (service == null) {
                throw new HttpError(404, 'Path not found');
            }

            const params = await V2.validateParams(v2Req, service, req);
            response = await service.handle(v2Req, params);
        } catch (e) {
            status = 500;
            error = e;
            if (e instanceof HttpError) {
                status = e.code;
                response = { status, message: e.message, ...e.context };
            } else {
                v2Req.logContext['error'] = e;
                response = { status, message: 'Internal server error', error: e.message };
            }
        }

        v2Req.logContext['status'] = status;
        v2Req.logContext['duration'] = Date.now() - startTime;

        res.header('x-request-id', requestId);
        res.header('x-st-version', Config.version);
        res.header('x-st-hash', Config.hash);
        if (status > 499 && error != null) {
            v2Req.log.error(v2Req.logContext, 'Failed:' + error.message);
        } else if (status > 399 && error != null) {
            v2Req.log.warn(v2Req.logContext, 'Failed:' + error.message);
        } else {
            v2Req.log.info(v2Req.logContext, 'Done');
        }
        res.status(status);
        res.json(response);
        res.end();
    }
}
