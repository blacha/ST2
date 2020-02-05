import { WorldId, PlayerNameDisplay, PlayerScore } from '@cncta/clientlib';
import { Duration } from '@cncta/util';
import { ModelWorldAlliance, Stores, ModelWorldAllianceData, ModelUtil } from '@st/model';
import { ApiWorldUpdateRequest, StLog } from '@st/shared';
import { ApiCall, ApiRequest } from '../api.call';
import { GameSession } from '../game.session';
import { HttpError } from '../http.error';

export class ApiWorldUpdate extends ApiCall<ApiWorldUpdateRequest> {
    name = 'world.update';
    path = '/api/v1/world/:worldId/update' as const;
    method = 'post' as const;

    async handle(req: ApiRequest<ApiWorldUpdateRequest>): Promise<ApiWorldUpdateRequest['response']> {
        const worldId = Number(req.params.worldId) as WorldId;

        req.logContext['worldId'] = worldId;
        const bots = await Stores.BotWorld.get('worlds');
        if (bots == null) {
            throw new HttpError(500, 'Invalid bot configuration');
        }

        const matchedWorld = bots.worlds.find(f => f.worldId == worldId);
        if (matchedWorld == null) {
            throw new HttpError(400, 'No configuration for world');
        }

        if (matchedWorld.updatedAt != null && matchedWorld.updatedAt > Date.now() - Duration.minutes(30)) {
            StLog.info({ lastUpdate: matchedWorld.updatedAt }, 'SkippingUpdate');
            return { id: matchedWorld.updateId };
        }

        const worldModel = new ModelWorldAlliance();
        worldModel.id = ModelWorldAlliance.id(worldId);

        await Stores.BotWorld.transaction('worlds', () => {
            const world = bots.worlds.find(f => f.worldId == worldId);
            if (world) {
                world.updatedAt = ModelUtil.TimeStamp();
                world.updateId = worldModel.id;
            }
        });

        const gameSession = await GameSession.getClient(req, worldId);

        const worldData = await gameSession.loadWorldData();

        for (const [allianceId, allianceData] of worldData.alliances) {
            const players = allianceData.players.map(playerId => {
                const player = worldData.players.get(playerId);
                if (player == null) {
                    return { id: playerId, name: 'Unknown' as PlayerNameDisplay, points: 0 as PlayerScore };
                }
                return { id: playerId, name: player.name, points: player.points };
            });

            const worldModelAlliance: ModelWorldAllianceData = {
                id: allianceId,
                name: allianceData.name,
                points: allianceData.points,
                players,
            };
            worldModel.add(worldModelAlliance);
        }

        await Stores.WorldData.save(worldModel);

        return { id: worldModel.id };
    }
}
