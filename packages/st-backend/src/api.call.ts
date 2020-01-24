import * as express from 'express';
import * as expressCore from 'express-serve-static-core';
import { Id, StLog } from '@st/shared';
import * as admin from 'firebase-admin';
import { UId } from '@st/model';
import { HttpError } from './http.error';

export interface ApiFunc<Params = any, Body = any, Response = any, method = 'post'> {
    path: string;
    params: Params;
    body: Body;
    response: Response;
    method: 'get' | 'post';
}

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
        res.status(status);
        res.json(response);
        if (status > 499 && error != null) {
            childLog.error({ error: error }, 'Failed');
        } else if (status > 399 && error != null) {
            childLog.warn({ error: error }, error.message);
        } else {
            childLog.info({ url: req.url, duration: Date.now() - startTime, status }, 'Done');
        }
    }

    abstract handle(req: ApiRequest<T>): Promise<T['response']>;
}
