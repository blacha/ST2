import * as Cookie from 'cookie';
import { Response } from 'node-fetch';

export class Cookies {
    static HeaderSet = 'set-cookie';
    private static getAll(res: Response): string[] | null {
        const resCookies = res.headers.raw()[Cookies.HeaderSet];
        if (resCookies == null) {
            return null;
        }
        if (!Array.isArray(resCookies)) {
            return [resCookies];
        }
        return resCookies;
    }
    static get(res: Response): Record<string, string> | undefined {
        const resCookies = Cookies.getAll(res);
        if (resCookies == null) {
            return;
        }
        const output: Record<string, string> = {};
        for (const header of resCookies) {
            for (const [key, value] of Object.entries(Cookie.parse(header))) {
                output[key] = value;
            }
        }
        return output;
    }

    static header(cookies?: Record<string, string>): { Cookie: string } | undefined {
        if (cookies == null) {
            return;
        }
        return {
            Cookie: Object.entries(cookies)
                .map(entry => entry.join('='))
                .join('; '),
        };
    }
}
