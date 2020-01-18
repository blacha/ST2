/* eslint-disable @typescript-eslint/camelcase */
import fetch from 'node-fetch';
import * as querystring from 'querystring';
import { Cookies } from '../cookie';
import { FetchArgs, getQueryArgStr } from '../headers';
import { Logger } from '../log';
import { EaSignIn } from './ea.sigin';
import { GameCdn } from './game.cdn';

export class EaAccountLogin {
    static BaseUrl = 'https://accounts.ea.com';
    static Locale = 'en_CA';
    email: string;
    password: string;
    sId: string | null;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    static get connectUrl() {
        return [EaAccountLogin.BaseUrl, 'connect', 'auth'].join('/');
    }

    async connectGameAuth(): Promise<string> {
        const queryObj = {
            response_type: 'code',
            client_id: 'ccta-web-server-game',
            redirect_uri: GameCdn.ssoConsumeUrl,
            state: '410',
            expires_in: '3599',
        };
        const url = EaAccountLogin.connectUrl + '?' + querystring.stringify(queryObj);

        const args = {
            ...FetchArgs.base({ Cookie: `sid=${this.sId}`, 'Content-Type': 'application/x-www-form-urlencoded' }),
            method: 'post',
            body: querystring.stringify({ sessionId: '', locale: 'en' }),
        };

        const res = await fetch(url, args);
        Logger.trace({ url, method: 'post', status: res.status }, 'Fetch');
        if (res.status != 302) {
            throw new Error('Failed to connect EA game auth');
        }

        const code = getQueryArgStr(res.headers.get('location') ?? '', 'code');
        if (code == null) {
            throw new Error('Failed to connect EA game auth, missing code');
        }
        return code;
    }

    async connectAuth(state: string, optional?: { fid?: string }): Promise<string> {
        const queryObj = {
            client_id: 'ccta-web-server',
            redirect_uri: 'https://www.tiberiumalliances.com/login_check',
            locale: EaAccountLogin.Locale,
            response_type: 'code',
            state: state,
            ...optional,
        };

        const connectUrl = EaAccountLogin.connectUrl + '?' + querystring.stringify(queryObj);
        const res = await fetch(connectUrl, FetchArgs.base());
        Logger.trace({ url: connectUrl, status: res.status }, 'Fetch');

        if (res.status != 302) {
            throw new Error('Failed to connect EA auth');
        }
        const cookies = Cookies.get(res);
        if (cookies) {
            this.sId = cookies['sid'] ?? this.sId;
        }

        return res.headers.get('location') ?? '';
    }

    async login(state: string): Promise<string> {
        const authResponse = await this.connectAuth(state);
        const fid = getQueryArgStr(authResponse, 'fid');
        if (fid == null) {
            throw new Error('Failed to get fid');
        }
        Logger.debug({ fid }, 'GotFid');

        const params = await EaSignIn.startSignIn(fid);
        await EaSignIn.login(params, this.email, this.password);
        const loginDone = await this.connectAuth(state, { fid });

        const code = getQueryArgStr(loginDone, 'code');
        if (code == null || this.sId == null) {
            throw new Error('Failed to get code');
        }
        return code;
    }
}
