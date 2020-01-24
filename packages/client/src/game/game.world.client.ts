import {
    CommandIgmBulkSendMsg,
    CommandOpenSession,
    CommandPlayerInfo,
    CommandPoll,
    GameCommands,
    CommandGetServerInfoResponse,
    CommandGetServerInfo,
    CommandPlayerInfoResponse,
    PlayerNameDisplay,
    CommandCheckPlayerExist,
    PlayerNameId,
} from '@cncta/clientlib';
import fetch from 'node-fetch';
import { TaClient } from '../client';
import { FetchArgs } from '../headers';
import { Logger } from '../log';
import { WorldData } from './poll/world.data';
import { getSectorCode } from './poll/sector';
import { createHash } from 'crypto';
import { promises as fs } from 'fs';

export enum GameWorldState {
    Init,
    Opened,
    Closed,
}

async function writeDebugFile(suffix: string, data: string | Buffer) {
    await fs.mkdir('./.debug', { recursive: true });
    const prefix = new Date().toISOString().replace(/:/g, '');
    await fs.writeFile(`./.debug/${prefix}-${suffix}.log`, data);
}

export class GameWorldClient {
    static MaxRetries = 5;
    private state: GameWorldState = GameWorldState.Init;
    private game: TaClient;
    private worldId: number;
    private worldUrl: string;
    logger: typeof Logger;
    gameSessionId: string;
    debug = false;

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

    private async fetch<T extends GameCommands>(
        method: T['command'],
        body: T['request'] & { session: string },
        jsonResponse = true,
    ): Promise<T['response']> {
        const url = this.url(method);
        const res = await fetch(url, FetchArgs.json(body));
        Logger.trace({ url, status: res.status }, 'Fetch');
        if (!res.ok) {
            Logger.fatal({ url, status: res.status }, 'Fetch');
            throw new Error('Failed to run request');
        }
        if (!res.headers.get('content-type')?.startsWith('application/json') && jsonResponse) {
            Logger.fatal({ url, status: res.status }, 'FailedToFetch');
            await writeDebugFile(method, await res.text());
            throw new Error('Failed to run request');
        }
        if (jsonResponse) {
            return await res.json();
        }
        return await res.text();
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

    async playerExists(name: PlayerNameDisplay | PlayerNameId): Promise<boolean> {
        const res = await this.fetch<CommandCheckPlayerExist>(
            'CheckPlayerExist',
            { name, session: this.gameSessionId },
            false,
        );
        if (res == 'true') {
            return true;
        }
        return false;
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

    private _player: Promise<CommandPlayerInfoResponse>;
    get player(): Promise<CommandPlayerInfoResponse> {
        if (this._player == null) {
            this._player = this.fetch<CommandPlayerInfo>('GetPlayerInfo', { session: this.gameSessionId });
        }
        return this._player;
    }

    private _server: Promise<CommandGetServerInfoResponse>;
    get server(): Promise<CommandGetServerInfoResponse> {
        if (this._server == null) {
            this._server = this.fetch<CommandGetServerInfo>('GetServerInfo', { session: this.gameSessionId });
        }
        return this._server;
    }

    private _data: Promise<WorldData>;
    get data(): Promise<WorldData> {
        if (this._data == null) {
            this._data = this.loadWorldData();
        }
        return this._data;
    }

    /** Load in all world data, this may take a while */
    async loadWorldData(): Promise<WorldData> {
        const data = new WorldData();

        const player = await this.player;
        const server = await this.server;
        const xSectors = server.ww / WorldData.SectorSize;
        const ySectors = server.wh / WorldData.SectorSize;

        this.logger.info({ sectors: xSectors * ySectors, user: player.Name }, 'GetSectors');
        const requests = Array(5).fill('WORLD:');
        for (let x = 0; x < xSectors; x++) {
            for (let y = 0; y < ySectors; y++) {
                const requestOffset = y % requests.length;
                requests[requestOffset] = requests[requestOffset] + getSectorCode(x, y);
            }
        }

        for (const request of requests) {
            this.logger.trace({ sectors: request }, 'SectorFetch');
            const response = await this.poll(request);

            if (this.debug) {
                const fileName = createHash('sha256')
                    .update(request)
                    .digest('hex');
                await writeDebugFile(fileName, JSON.stringify(response, null, 2));
            }

            for (const res of response) {
                if (res.t !== 'WORLD') {
                    continue;
                }
                this.logger.trace({ sectorCount: res.d.s.length }, 'SectorAdd');
                for (const sector of res.d.s) {
                    data.add(sector);
                }
            }
        }

        return data;
    }

    async sendMail(to: string, subject: string, body: string) {
        const player = await this.player;

        const messageBody = `<cnc><cncs>${player.Name}</cncs><cncd>${Date.now()}</cncd><cnct>${body}</cnct></cnc>`;
        return this.fetch<CommandIgmBulkSendMsg>('IGMBulkSendMsg', {
            alliances: '',
            body: messageBody,
            players: to,
            subject,
            session: this.gameSessionId,
        });
    }
}
