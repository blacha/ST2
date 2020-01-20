import { CommandIgmBulkSendMsg, CommandOpenSession, CommandPlayerInfo, CommandPoll } from '@cncta/clientlib';
import { GameCommands } from '@cncta/clientlib/src/types/clientlib/net';
import fetch from 'node-fetch';
import { TaClient } from '../client';
import { FetchArgs } from '../headers';
import { Logger } from '../log';
import { WorldData } from './poll/world.data';

export enum GameWorldState {
    Init,
    Opened,
    Closed,
}

export class GameWorldClient {
    static MaxRetries = 5;
    private state: GameWorldState = GameWorldState.Init;
    private game: TaClient;
    private worldId: number;
    private worldUrl: string;
    private playerName: string;
    logger: typeof Logger;
    gameSessionId: string;

    public data: WorldData = new WorldData();

    private requestId = 0;
    private sequenceId = 0;

    constructor(game: TaClient, worldId: number, worldUrl: string) {
        this.game = game;
        this.worldId = worldId;
        this.worldUrl = worldUrl;
        this.logger = Logger.child({ worldId });
    }

    private url(method: string) {
        return [this.worldUrl, 'Presentation/Service.svc/ajaxEndpoint', method].join('/');
    }

    private async fetch<T extends GameCommands>(method: T['command'], body: T['request']): Promise<T['response']> {
        const url = this.url(method);
        const res = await fetch(url, FetchArgs.json(body));
        Logger.trace({ url, status: res.status }, 'Fetch');
        if (!res.ok) {
            Logger.fatal({ url, status: res.status }, 'Fetch');
            throw new Error('Failed to run request');
        }
        return await res.json();
    }

    /**
     * Open a connection to the game world
     */
    async open() {
        if (this.state != GameWorldState.Init) {
            throw new Error('Invalid open call, currentState: ' + GameWorldState[this.state]);
        }

        for (let i = 0; i < GameWorldClient.MaxRetries; i++) {
            const res = await this.fetch<CommandOpenSession>('OpenSession', {
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

    async poll(requests: string) {
        const res = await this.fetch<CommandPoll>('Poll', {
            requests,
            requestid: this.requestId,
            sequenceid: this.sequenceId,
            session: this.gameSessionId,
        });
        this.requestId++;
        this.sequenceId++;
        return res;
    }

    async getPlayerInfo() {
        const playerInfo = await this.fetch<CommandPlayerInfo>('GetPlayerInfo', { session: this.gameSessionId });
        this.playerName = playerInfo.Name;
        return playerInfo;
    }

    async sendMail(to: string, subject: string, body: string) {
        if (this.playerName == null) {
            await this.getPlayerInfo();
        }
        const messageBody = `<cnc><cncs>${this.playerName}</cncs><cncd>${Date.now()}</cncd><cnct>${body}</cnct></cnc>`;
        return this.fetch<CommandIgmBulkSendMsg>('IGMBulkSendMsg', {
            alliances: '',
            body: messageBody,
            players: to,
            subject,
            session: this.gameSessionId,
        });
    }
}
