import { AllianceId, CompositeId, PlayerNameDisplay, PlayerNameId, PlayerScore, WorldId } from '@cncta/clientlib';
import { Duration } from '@cncta/util';
import { ModelUser, ModelUtil, ModelWorldAlliance, ModelWorldAllianceData, Stores } from '@st/model';
import { ApiWorldUpdateRequest, StLog, WorldAllianceId } from '@st/shared';
import { ApiCall, ApiRequest } from '../api.call';
import { GameSession } from '../game.session';
import { HttpError } from '../http.error';
import { CustomClaims } from '../permission/custom.claims';

export interface PlayerAlliancePair {
    allianceId: AllianceId;
    name: PlayerNameDisplay;
}

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
        worldModel.setWorld(worldId);

        await Stores.BotWorld.transaction('worlds', botUpdate => {
            const world = botUpdate.worlds.find(f => f.worldId == worldId);
            if (world) {
                world.updatedAt = ModelUtil.TimeStamp();
                world.updateId = worldModel.id;
            }
        });

        const gameSession = await GameSession.getClient(req, worldId);

        const worldData = await gameSession.loadWorldData();

        const playerMap = new Map<PlayerNameId, PlayerAlliancePair>();
        for (const [allianceId, allianceData] of worldData.alliances) {
            const players = allianceData.players.map(playerId => {
                const player = worldData.players.get(playerId);
                if (player == null) {
                    return { id: playerId, name: 'Unknown' as PlayerNameDisplay, points: 0 as PlayerScore, cities: [] };
                }

                playerMap.set(ModelUtil.toPlayerNameId(player.name), {
                    allianceId,
                    name: player.name,
                });

                return {
                    id: playerId,
                    name: player.name,
                    points: player.points,
                    faction: player.faction,
                };
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

        // TODO need to query more than this limit at some stage
        const allClaims = await Stores.User.getAllBy({}, 250);

        for (const claim of allClaims) {
            await this.updatePermission(req, claim, worldModel, playerMap);
        }

        return { id: worldModel.id };
    }

    async updatePermission(
        req: ApiRequest<ApiWorldUpdateRequest>,
        playerClaim: ModelUser,
        model: ModelWorldAlliance,
        playerMap: Map<PlayerNameId, PlayerAlliancePair>,
    ): Promise<void> {
        // TODO should really only update if we need to
        const playerIds = Object.keys(playerClaim.claimed).filter(playerId => playerMap.has(playerId as PlayerNameId));
        if (playerIds.length == 0) {
            return;
        }
        const uid = playerClaim.id;
        const worldId = model.worldId;
        await Stores.User.transaction(uid, async toUpdate => {
            const claims: CompositeId<[WorldId, AllianceId]>[] = [];
            for (const playerId of playerIds) {
                const playerData = playerMap.get(playerId as PlayerNameId);
                const claim = toUpdate.claimed[playerId];
                if (claim == null || playerData == null) {
                    continue;
                }
                const allianceId = playerData.allianceId;
                req.log.info(
                    {
                        updateId: model.id,
                        playerId,
                        allianceId,
                        worldId,
                        uid,
                    },
                    'UpdateClaim',
                );
                claim.alliances[worldId] = { validatedBy: model.id, allianceId };

                const allianceKey = WorldAllianceId.pack({ worldId, allianceId }) as CompositeId<[WorldId, AllianceId]>;
                claims.push(allianceKey);
            }

            await CustomClaims.updateClaims(uid, worldId, claims, req.log);
        });
    }
}
