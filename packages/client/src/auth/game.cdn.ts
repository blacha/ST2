import { FactionType } from '@cncta/clientlib/src';
import fetch from 'node-fetch';
import { stringify } from 'querystring';
import { Cookies } from '../cookie';
import { FetchArgs } from '../headers';
import { Logger } from '../log';

export interface GameAccountInfo {
    AcceptNewPlayer: boolean;
    Account: number;
    Changelist: number;
    Description: string;
    Faction: FactionType;
    Id: number;
    Friends: unknown[];
    Invites: unknown[];
    IsMultiLanguage: boolean;
    IsSeasonServer: boolean;
    IsVeteranServer: boolean;
    LastSeen: 0;
    MaintenanceMessage: string;
    MaxPlayers: number;
    Name: string;
    Online: boolean;
    PlayerCount: number;
    PresignupEnd: unknown;
    Recommended: boolean;
    SSOUrl: string;
    ScheduledMaintenanceEnd: unknown;
    StartTime: number;
    TimeZoneInfoId: string;
    Timezone: number;
    Url: string;
}

export class GameCdn {
    static BaseUrl = 'https://gamecdnorigin.alliances.commandandconquer.com/Farm/service.svc/ajaxEndpoint';

    static get ssoConsumeUrl() {
        return [GameCdn.BaseUrl, 'ssoconsume'].join('/');
    }

    static async ssoConsume(code: string) {
        const url = this.ssoConsumeUrl + '?' + stringify({ code, state: '0' });
        const res = await fetch(url, FetchArgs.base({ Cookie: 'loginRedirectInternal=1' }));
        Logger.trace({ url, status: res.status }, 'Fetch');

        if (res.status != 302) {
            throw new Error('Unable to get game sessionId');
        }
        const { sessionId } = Cookies.get(res) ?? {};
        if (sessionId == null) {
            throw new Error('Unable to get sessionId');
        }
        return sessionId;
    }

    static get accountInfoUrl() {
        return [GameCdn.BaseUrl, 'GetOriginAccountInfo'].join('/');
    }

    /**
     * get active world account info for the provided sessionIf
     *
     * @param sessionId session to use
     */
    static async getAccountInfo(sessionId: string): Promise<GameAccountInfo[]> {
        const res = await fetch(this.accountInfoUrl, FetchArgs.json({ session: sessionId }));
        Logger.trace({ url: this.accountInfoUrl, status: res.status }, 'Fetch');
        if (!res.ok) {
            const body = await res.text();
            Logger.fatal({ body }, 'FailedToLoad');
            throw new Error('Failed to load account info');
        }
        const body = (await res.json()) as { Servers: GameAccountInfo[] };
        if (body.Servers == null) {
            throw new Error('Failed to load account info');
        }

        return body.Servers.filter(f => f.Faction != FactionType.NotInitialized);
    }
}
