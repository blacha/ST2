import { V2WorldList, V2WorldUpdate } from '@st/api/build/v2/v2.world';
import { Stores, ModelWorldAlliance, ModelUtil, ModelWorldAllianceData, ModelUser } from '@st/model';
import { V2ApiHandler, V2Request } from '../v2.request';
import { WorldId, PlayerNameId, PlayerNameDisplay, PlayerScore, CompositeId, AllianceId } from '@cncta/clientlib';
import { HttpError } from '../../http.error';
import { Duration } from '@cncta/util';
import { StLog, WorldAllianceId } from '@st/shared';
import { GameSession } from '../../game.session';
import { PlayerAlliancePair } from '../../routes/update.world';
import { CustomClaims } from '../../permission/custom.claims';

export class V2WorldListService extends V2ApiHandler<typeof V2WorldList> {
    def = V2WorldList;

    async handle() {
        const worldData = await Stores.BotWorld.get('worlds');
        if (worldData == null) {
            return { worlds: [] };
        }

        return { worlds: worldData.worlds };
    }
}

export class V2WorldUpdateService extends V2ApiHandler<typeof V2WorldUpdate> {
    def = V2WorldUpdate;

    async handle(req: V2Request, params: { worldId: WorldId }): Promise<{ id: string }> {
        const { worldId } = params;

        req.track('worldId', worldId);
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
        req: V2Request,
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
