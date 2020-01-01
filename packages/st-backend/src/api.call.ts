import * as express from 'express';
import * as expressCore from 'express-serve-static-core';
import { Id, StLog } from '@st/shared';

export interface ApiFunc<Params = any, Body = any, Response = any> {
    path: string;
    params: Params;
    body: Body;
    response: Response;
}

export interface ApiRequest<T extends ApiFunc> extends expressCore.Request<T['params'], T['response'], T['body']> {
    id: string;
    log: typeof StLog;
}

export abstract class ApiCall<T extends ApiFunc> {
    abstract path: T['path'];
    abstract method: 'get' | 'post';

    static bind<T>(app: express.Application, ApiFunc: ApiCall<any>) {
        app[ApiFunc.method](ApiFunc.path, ApiFunc.doRequest.bind(ApiFunc));
    }
    static async validateRequest<T extends ApiFunc>(req: express.Request, id: string): Promise<ApiRequest<T>> {
        const apiReq = req as ApiRequest<any>;
        apiReq.id = id;
        return apiReq;
    }

    async doRequest(req: express.Request, res: express.Response) {
        const startTime = Date.now();
        let status = 200;
        let response: T['response'] | null = null;
        const id = Id.generate();

        try {
            const apiReq = await ApiCall.validateRequest<T>(req, id);
            apiReq.log = StLog.child({ id });
            response = await this.handle(apiReq);
        } catch (e) {
            status = 500;
            StLog.error({ error: e }, 'Failed');
            response = { status: 500, message: 'Internal server error', error: e.message };
        }

        res.header('x-request-id', id);
        res.status(status);
        res.json(response);

        StLog.info({ duration: Date.now() - startTime, status }, 'Done');
    }

    abstract handle(req: ApiRequest<T>): Promise<T['response']>;
}
