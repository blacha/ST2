import { Logger } from '@cncta/client/src/log';
import { WorldId } from '@cncta/clientlib';
import { Duration } from '@cncta/util/src';
import { ModelWorldAlliance, Stores } from '@st/model';
import { ApiWorldUpdateRequest } from '@st/shared';
import { ApiCall, ApiRequest } from '../api.call';
import { GameSession } from '../game.session';
import { HttpError } from '../http.error';

export class ApiWorldUpdate extends ApiCall<ApiWorldUpdateRequest> {
    name = 'world.update';
    path = '/api/v1/world/:worldId/update' as const;
    method = 'post' as const;

    async handle(req: ApiRequest<ApiWorldUpdateRequest>): Promise<{}> {
        const worldId = Number(req.params.worldId) as WorldId;

        this.logContext['worldId'] = worldId;
        const bots = await Stores.BotWorld.get('worlds');
        if (bots == null) {
            throw new HttpError(500, 'Invalid bot configuration');
        }

        const matchedWorld = bots.worlds.find(f => f.worldId == worldId);
        if (matchedWorld == null) {
            throw new HttpError(400, 'No configuration for world');
        }

        if (matchedWorld.updatedAt != null && matchedWorld.updatedAt > Date.now() - Duration.minutes(30)) {
            Logger.info({ lastUpdate: matchedWorld.updatedAt }, 'SkippingUpdate');
            return {};
        }
        const gameSession = await GameSession.getClient(req, worldId);

        const worldData = await gameSession.loadWorldData();

        const worldModelUpdate = new ModelWorldAlliance();
        worldModelUpdate.id = ModelWorldAlliance.id(worldId);
        worldModelUpdate.alliances = {};

        // Object.values(worldData.players).map(c => )

        // await Stores.Install.transaction(installId, async obj => obj.touch(playerName, worldId));
        // TODO if new install send mail message to confirm
        return {};
    }
}
