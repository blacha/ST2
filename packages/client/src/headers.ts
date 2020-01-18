import * as querystring from 'querystring';
import { Duration } from '@cncta/util';
export const UserAgent =
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36';

export function getQuery(url: string): Record<string, string | string[]> {
    if (url.includes('?')) {
        return querystring.parse(url.split('?')[1]);
    }
    return querystring.parse(url);
}
export function getQueryArgStr(url: string, key: string): string | null {
    const res = getQuery(url)[key];
    if (typeof res == 'string') {
        return res;
    }
    return null;
}

export class FetchArgs {
    static base(headers?: Record<string, string>) {
        return {
            timeout: Duration.seconds(10),
            redirect: 'manual',
            headers: { 'User-Agent': UserAgent, ...headers },
        } as const;
    }

    static json(body: Record<string, any>, headers?: Record<string, string>) {
        return {
            ...FetchArgs.base({ 'Content-Type': 'application/json', ...headers }),
            method: 'post',
            body: JSON.stringify(body),
        } as const;
    }
}
