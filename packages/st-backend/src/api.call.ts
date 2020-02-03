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
}

export interface ApiUser {
    uid: UId;
}

export abstract class ApiCall<T extends ApiFunc> {
    abstract path: T['path'];
    abstract method: T['method'];

    logContext: Record<string, any> = {};

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

    static async validateRequest<T extends ApiFunc>(req: express.Request, id: string): Promise<ApiRequest<T>> {
        const apiReq = req as ApiRequest<any>;
        apiReq.id = id;
        return apiReq;
    }

    async doRequest(req: express.Request, res: express.Response) {
        console.log('Starting', req.baseUrl);
        const startTime = Date.now();
        let status = 200;
        let response: T['response'] | null = null;
        const id = Id.generate();
        const childLog = StLog.child({ id });
        let error: Error | null = null;

        try {
            const apiReq = await ApiCall.validateRequest<T>(req, id);
            apiReq.log = childLog;
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
            childLog.error({ ...this.logContext, error: error }, 'Failed');
        } else if (status > 399 && error != null) {
            childLog.warn({ ...this.logContext, error: error }, error.message);
        } else {
            childLog.info({ ...this.logContext, url: req.url, duration: Date.now() - startTime, status }, 'Done');
        }
    }

    abstract handle(req: ApiRequest<T>): Promise<T['response']>;
}
