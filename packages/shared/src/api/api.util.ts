import { ApiFunc } from './api.func';
import { Config } from '../config';

export class ApiUtil {
    static BaseUrl = Config.api.url.replace('__URL__', 'https://shockr.dev');

    static request<T extends ApiFunc>(
        method: T['method'],
        url: T['path'],
        params: T['params'],
        body: T['body'] = undefined,
    ) {
        let output = url;
        for (const [key, value] of Object.entries(params)) {
            output = output.replace(`:${key}`, String(value));
        }
        return {
            method,
            url: `${ApiUtil.BaseUrl}/${output}`,
            params,
            body: JSON.stringify(body),
        };
    }
}
