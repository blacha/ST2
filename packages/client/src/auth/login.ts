/* eslint-disable @typescript-eslint/camelcase */
import fetch from 'node-fetch';
import * as querystring from 'querystring';
import { Cookies } from '../cookie';
import { FetchArgs, getQueryArgStr } from '../headers';
import { Logger } from '../log';
import { EaAccountLogin } from './ea.account';
import { GameCdn } from './game.cdn';

export class ClientLogin {
    static BaseUrl = 'https://www.tiberiumalliances.com';

    private cookies: Record<string, string> = {};
    private ea: EaAccountLogin;

    constructor(username: string, password: string) {
        this.ea = new EaAccountLogin(username, password);
    }

    private get taAuthUrl() {
        return [ClientLogin.BaseUrl, 'login', 'auth'].join('/');
    }

    private get taLoginCheckUrl() {
        return [ClientLogin.BaseUrl, 'login_check'].join('/');
    }

    private async initTa(): Promise<string> {
        const res = await fetch(this.taAuthUrl, FetchArgs.base());
        Logger.trace({ url: this.taAuthUrl, status: res.status }, 'Fetch');

        if (res.status != 301) {
            throw new Error('Failed to fetch TA auth');
        }

        const cookies = Cookies.get(res);
        const state = getQueryArgStr(res.headers.get('location') ?? '', 'state');
        if (state == null || cookies == null) {
            throw new Error('Failed to fetch EA state');
        }

        this.cookies = cookies;
        Logger.debug({ state }, 'LoginState');
        return state;
    }

    private async taLoginCheck(state: string, code: string) {
        const url = this.taLoginCheckUrl + '?' + querystring.stringify({ state, code });
        const res = await fetch(url, FetchArgs.base(Cookies.header(this.cookies)));
        Logger.trace({ url, status: res.status }, 'Fetch');

        if (res.status != 302) {
            throw new Error('Failed to fetch TA auth');
        }

        const location = res.headers.get('location') ?? '';
        if (!location.endsWith('home')) {
            Logger.fatal({ location }, 'FailedToLogin');
            throw new Error('Failed to fetch TA auth');
        }
        const cookies = Cookies.get(res);
        if (cookies == null) {
            throw new Error('Failed to get TA auth login cookie');
        }
        this.cookies = cookies;
    }

    async login(): Promise<string> {
        const state = await this.initTa();
        const eaLoginCode = await this.ea.login(state);
        await this.taLoginCheck(state, eaLoginCode);

        const gameCode = await this.ea.connectGameAuth();
        const sessionId = await GameCdn.ssoConsume(gameCode);
        return sessionId;
    }
}
