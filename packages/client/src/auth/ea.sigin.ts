import fetch from 'node-fetch';
import { stringify } from 'querystring';
import { Cookies } from '../cookie';
import { getQuery, FetchArgs } from '../headers';
import { Logger } from '../log';

export interface SignInResponse {
    cookies: any;
    execution: string;
    initref: string;
}

export class EaSignIn {
    static BaseUrl = 'https://signin.ea.com/p/web2/login';

    // constructor(email: string, password: string) {
    //     this.email = email;
    //     this.password = password;
    //     this.cookies
    // }

    static async login(params: SignInResponse, email: string, password: string) {
        // Logger.info({ email }, 'Login');
        const headers = {
            ...Cookies.header(params.cookies),
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        const queryString = stringify({ execution: params.execution, initref: params.initref });
        const loginUrl = EaSignIn.BaseUrl + '?' + queryString;
        const res = await fetch(loginUrl, {
            ...FetchArgs.base(headers),
            method: 'post',
            body: stringify({
                email,
                password,
                _rememberMe: 'on',
                _eventId: 'submit',
            }),
        });
        Logger.trace({ url: loginUrl, status: res.status }, 'Fetch');

        if (res.status != 302) {
            const body = await res.text();
            Logger.fatal({ status: res.status, reason: res.statusText, body }, 'FailedLogin');
            throw new Error('Failed to login');
        }

        const location = res.headers.get('location') ?? '';
        const resB = await fetch(location + '&_eventId=end', FetchArgs.base(Cookies.header(params.cookies)));

        if (resB.status != 302) {
            const body = await resB.text();
            Logger.fatal({ status: resB.status, reason: resB.statusText, body }, 'FailedLogin');
            throw new Error('Failed to login');
        }
        Logger.trace({ url: location, status: resB.status }, 'Fetch');
    }

    static async startSignIn(fid: string): Promise<SignInResponse> {
        const url = EaSignIn.BaseUrl + `?fid=${fid}`;
        const res = await fetch(url, FetchArgs.base());
        Logger.trace({ url, status: res.status }, 'Fetch');

        const location = res.headers.get('location') ?? '';

        const { execution, initref } = getQuery(location);
        if (typeof execution != 'string' || typeof initref != 'string') {
            throw new Error('Failed to get EA SignIn params');
        }
        const cookies = Cookies.get(res);
        if (cookies == null) {
            throw new Error('Failed to get EA Signin cookies');
        }

        return {
            cookies,
            execution,
            initref,
        };
    }
}
