import { Config } from '@st/shared';
import { ApiCall } from '../api.call';

export interface ApiVersionRequest {
    path: '/api/v1/version';
    method: 'get';
    params: null;
    body: null;
    response: { version: string; hash: string };
}
export class ApiVersion extends ApiCall<ApiVersionRequest> {
    name = 'api.version';
    path = '/api/v1/version' as const;
    method = 'get' as const;

    async handle(): Promise<{ version: string; hash: string }> {
        return { version: Config.version, hash: Config.hash };
    }
}
