import { TaClient } from '@cncta/client';
import { TimeStamp, WorldId } from '@cncta/clientlib';
import { Duration } from '@cncta/util';
import { AccountSessionId } from '@st/model';
import { ApiRequest } from './api.call';
import { BackEndStore } from './backend.store';
import { HttpError } from './http.error';

export class GameSession {
    static async getClient(req: ApiRequest<any>, worldId: WorldId) {
        const botConfig = await BackEndStore.BotConfig.get('bot');
        if (botConfig == null) {
            throw new HttpError(500, 'Unable to find bot session');
        }
        if (botConfig.isSessionValid()) {
            req.log.info({ expiresAt: botConfig.session.expiresAt }, 'ActiveSession');
            return TaClient.fromSessionId(botConfig.session.id).open(worldId);
        }

        req.log.info({ email: botConfig.email }, 'NewSession');
        const client = new TaClient(botConfig.email, botConfig.password);
        await client.login();

        botConfig.session = {
            id: client.sessionId as AccountSessionId,
            expiresAt: (Date.now() + Duration.minutes(59)) as TimeStamp,
        };
        await BackEndStore.BotConfig.set('bot', botConfig);
        return client.open(worldId);
    }
}
