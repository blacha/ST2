import fetch from 'node-fetch';
import { FetchArgs } from '../headers';
import { Logger } from '../log';
import { GameWorldRequest } from './requests/game';
import { OpenSessionRequest } from './requests/open.session';
import { PlayerInfoRequest } from './requests/player.info';
import { SendMessageRequest } from './requests/send.message';
import { TaClient } from '../client';

export enum GameWorldState {
    Init,
    Opened,
    Closed,
}

export class GameWorldClient {
    static MaxRetries = 5;
    state: GameWorldState = GameWorldState.Init;
    game: TaClient;
    worldId: number;
    worldUrl: string;
    logger: typeof Logger;
    gameSessionId: string;
    playerName: string;

    constructor(game: TaClient, worldId: number, worldUrl: string) {
        this.game = game;
        this.worldId = worldId;
        this.worldUrl = worldUrl;
        this.logger = Logger.child({ worldId });
    }

    url(method: string) {
        return [this.worldUrl, 'Presentation/Service.svc/ajaxEndpoint', method].join('/');
    }

    private async fetch<T extends GameWorldRequest>(method: T['method'], body: T['request']): Promise<T['response']> {
        const url = this.url(method);
        const res = await fetch(url, FetchArgs.json(body));
        Logger.trace({ url, status: res.status }, 'Fetch');
        if (!res.ok) {
            Logger.fatal({ url, status: res.status }, 'Fetch');
            throw new Error('Failed to run request');
        }
        return await res.json();
    }

    async open() {
        if (this.state != GameWorldState.Init) {
            throw new Error('Invalid open call, currentState: ' + GameWorldState[this.state]);
        }

        for (let i = 0; i < GameWorldClient.MaxRetries; i++) {
            const res = await this.fetch<OpenSessionRequest>('OpenSession', {
                platformId: 1,
                refId: -1,
                reset: true,
                version: -1,
                session: this.game.sessionId,
            });

            this.gameSessionId = res.i;
            if (this.gameSessionId != TaClient.InvalidGameSession) {
                this.state = GameWorldState.Opened;
                break;
            }
            Logger.debug('Failed to open game world');
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        if (this.state != GameWorldState.Opened) {
            throw new Error('Failed to open game world');
        }
    }

    async getPlayerInfo() {
        const playerInfo = await this.fetch<PlayerInfoRequest>('GetPlayerInfo', { session: this.gameSessionId });
        this.playerName = playerInfo.Name;
        return playerInfo;
    }

    async sendMail(to: string, subject: string, body: string) {
        if (this.playerName == null) {
            await this.getPlayerInfo();
        }
        const messageBody = `<cnc><cncs>${this.playerName}</cncs><cncd>${Date.now()}</cncd><cnct>${body}</cnct></cnc>`;
        return this.fetch<SendMessageRequest>('IGMBulkSendMsg', {
            alliances: '',
            body: messageBody,
            players: to,
            subject,
            session: this.gameSessionId,
        });
    }
}
