import * as express from 'express';
import * as expressCore from 'express-serve-static-core';
import { Id, StLog, ApiFunc, Config } from '@st/shared';
import * as admin from 'firebase-admin';
import { UId } from '@st/model';
import { HttpError } from './http.error';

export interface ApiRequest<T extends ApiFunc> extends expressCore.Request<T['params'], T['response'], T['body']> {
    id: string;
    log: typeof StLog;
    user?: ApiUser;
    logContext: Record<string, any>;
}

export interface ApiUser {
    uid: UId;
}

export abstract class ApiCall<T extends ApiFunc> {
    abstract name: string;
    abstract path: T['path'];
    abstract method: T['method'];

    static bind<T extends ApiFunc>(app: express.Application, ApiFunc: ApiCall<T>) {
        app[ApiFunc.method](ApiFunc.path, ApiFunc.doRequest.bind(ApiFunc));
    }

    async validateUser(req: ApiRequest<T>): Promise<ApiUser> {
        if (req.headers.authorization == null || !req.headers.authorization.startsWith('Bearer ')) {
            throw new Error('No Authorization');
        }
        console.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        const idToken = req.headers.authorization.split('Bearer ')[1];
        const user = ((await admin.auth().verifyIdToken(idToken)) as unknown) as ApiUser;
        req.user = user;
        return user;
    }

    static validateRequest<T extends ApiFunc>(req: express.Request, id: string): ApiRequest<T> {
        const apiReq = req as ApiRequest<any>;
        apiReq.id = id;
        apiReq.logContext = {
            hash: Config.hash,
            version: Config.version,
        };
        apiReq.log = StLog.child({ id });
        return apiReq;
    }

    async doRequest(req: express.Request, res: express.Response) {
        console.log('Starting', req.baseUrl);
        const startTime = Date.now();
        let status = 200;
        let response: T['response'] | null = null;
        const id = Id.generate();
        const apiReq = await ApiCall.validateRequest<T>(req, id);

        let error: Error | null = null;

        try {
            apiReq.logContext['id'] = id;
            apiReq.logContext['route'] = this.name;
            response = await this.handle(apiReq);
        } catch (e) {
            error = e;
            status = 500;
            if (e instanceof HttpError) {
                status = e.code;
                response = { status, message: e.message };
            } else {
                response = { status: 500, message: 'Internal server error', error: e.message };
            }
        }

        res.header('x-request-id', id);
        res.header('x-st-version', Config.version);
        res.header('x-st-hash', Config.hash);
        res.status(status);
        res.json(response);
        if (status > 499 && error != null) {
            apiReq.log.error({ ...apiReq.logContext, error: error }, 'Failed');
        } else if (status > 399 && error != null) {
            apiReq.log.warn({ ...apiReq.logContext, error: error }, error.message);
        } else {
            apiReq.log.info({ ...apiReq.logContext, url: req.url, duration: Date.now() - startTime, status }, 'Done');
        }
    }

    abstract handle(req: ApiRequest<T>): Promise<T['response']>;
}
