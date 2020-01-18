import { ClientLogin } from './auth/login';
import { GameWorldClient } from './game/game.world.client';
import { Logger } from './log';
import { GameCdn } from './auth/game.cdn';

export class TaClient {
    static InvalidGameSession = '00000000-0000-0000-0000-000000000000';

    session: ClientLogin;
    sessionId: string;

    constructor(username: string, password: string) {
        this.session = new ClientLogin(username, password);
    }

    static fromSessionId(sessionId: string) {
        const client = new TaClient('', '');
        client.sessionId = sessionId;
        return client;
    }

    async login(): Promise<void> {
        if (this.sessionId == null) {
            this.sessionId = await this.session.login();
            console.log(this.sessionId);
        }
    }

    /**
     * Get a list of worlds this account is active on
     */
    async getWorlds() {
        await this.login();

        return await GameCdn.getAccountInfo(this.sessionId);
    }

    /**
     * Open a connection to a specific world
     * @param worldId world to open
     */
    async open(worldId: number): Promise<GameWorldClient> {
        await this.login();

        Logger.info({ worldId }, 'OpenWorld');
        const worlds = await this.getWorlds();
        const world = worlds.find(f => f.Id == worldId);

        if (world == null) {
            throw new Error(`Account is not active on world ${worldId}`);
        }

        if (!world.Online) {
            throw new Error(`World ${worldId} is offline`);
        }

        const worldClient = new GameWorldClient(this, worldId, world.Url);
        await worldClient.open();
        return worldClient;
    }
}
