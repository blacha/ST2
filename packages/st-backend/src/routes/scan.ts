import { BaseLocationPacker, StCity, InvalidAllianceId, Duration } from '@cncta/util';
import {
    ApiScanRequest,
    ApiScanResponse,
    BaseBuilder,
    NumberPacker,
    WorldCityId,
    WorldAllianceId,
    WorldPlayerId,
} from '@st/shared';
import { ApiCall, ApiRequest } from '../api.call';
import {
    WorldId,
    PlayerId,
    AllianceId,
    AllianceName,
    PlayerNameDisplay,
    CompositeId,
    TimeStamp,
    CityId,
} from '@cncta/clientlib';
import { Stores, ModelCity, ModelUtil } from '@st/model';

const OneMinuteMs = 60 * 1000;
const OneHourMs = 60 * OneMinuteMs;
const OneDayMs = 25 * OneHourMs;
/* Expire after 3 days */
const LayoutExpireMs = 3 * OneDayMs;

export class ApiScan extends ApiCall<ApiScanRequest> {
    name = 'scan.create';
    path = '/api/v1/world/:worldId/player/:player/scan' as const;
    method = 'post' as const;

    async storePlayer(
        req: ApiRequest<ApiScanRequest>,
        worldId: WorldId,
        playerId: PlayerId,
        cityList?: StCity[],
    ): Promise<void> {
        if (cityList == null) {
            return;
        }
        const [firstCity] = cityList;
        const { allianceId } = firstCity;
        // No point storing everyone without alliance
        if (allianceId == null || allianceId == InvalidAllianceId) {
            return;
        }

        const allianceKey = WorldAllianceId.pack({ worldId, allianceId }) as CompositeId<[WorldId, AllianceId]>;
        const playerDocId = WorldPlayerId.pack({ worldId, playerId }) as CompositeId<[WorldId, PlayerId]>;
        await Stores.Player.transaction(playerDocId, playerCity => {
            playerCity.allianceKey = allianceKey;
            for (const city of cityList) {
                playerCity.addCity(city);
            }
            playerCity.worldId = worldId;
            playerCity.player = firstCity.owner;
            playerCity.playerId = playerId;
            playerCity.allianceId = allianceId;
            playerCity.alliance = firstCity.alliance as AllianceName;
        });
        req.log.info({ allianceKey, playerDocId, cities: cityList.length }, 'SetPlayer');
    }

    async storeLayouts(
        req: ApiRequest<ApiScanRequest>,
        worldId: WorldId,
        player: PlayerNameDisplay,
        layoutsList: Map<string, string>,
    ) {
        if (layoutsList.size == 0) {
            return;
        }
        const playerObj = await Stores.Player.getBy({ worldId, player });
        if (playerObj == null || playerObj.allianceId == null) {
            return;
        }

        const allianceId = playerObj.allianceId;
        // TODO this may get too much write contention, might be a idea to shard based on layout XY
        const allianceLayoutDoc = WorldAllianceId.pack({ worldId, allianceId }) as CompositeId<[WorldId, AllianceId]>;

        const updatedAt = ModelUtil.TimeStamp();
        await Stores.Layout.transaction(allianceLayoutDoc, model => {
            for (const [xy, layout] of Object.entries(model.layouts)) {
                if (Date.now() - layout.updatedAt > LayoutExpireMs) {
                    delete model.layouts[xy];
                }
            }
            for (const [key, layout] of layoutsList.entries()) {
                model.layouts[key] = { layout, updatedAt };
            }
        });
    }

    async handle(req: ApiRequest<ApiScanRequest>): Promise<ApiScanResponse> {
        const worldId = Number(req.params.worldId) as WorldId;
        const player = req.params.player as PlayerNameDisplay;

        req.logContext['player'] = player;
        req.logContext['worldId'] = worldId;

        const bases = req.body;

        const output: string[] = [];
        const layouts: Map<string, string> = new Map();
        const players: Map<number, StCity[]> = new Map();
        for (const baseJson of bases) {
            // Update is really old
            if (baseJson.timestamp > Date.now() || baseJson.timestamp < Date.now() - Duration.OneHour) {
                // Add a bit of randomness to when a base was updated
                baseJson.timestamp = Date.now() - Duration.minutes(1) * Math.random();
            }
            const base = BaseBuilder.load(baseJson);

            if (baseJson.ownerId < 0) {
                const xy = BaseLocationPacker.pack(base.x, base.y);
                layouts.set(NumberPacker.pack(xy), baseJson.tiles);
            } else {
                const existing = players.get(baseJson.ownerId) ?? [];
                existing.push(baseJson);
                players.set(baseJson.ownerId, existing);
            }

            const baseId = WorldCityId.pack({
                worldId: base.worldId,
                timestamp: base.updatedAt,
                cityId: base.cityId,
            }) as CompositeId<[WorldId, TimeStamp, CityId]>;
            await Stores.City.set(baseId, new ModelCity({ city: baseJson }));
            output.push(baseId);
        }

        if (players.size > 0) {
            for (const playerId of players.keys()) {
                req.log.info({ playerId, count: players.get(playerId)?.length }, 'StorePlayer');
                await this.storePlayer(req, worldId, playerId as PlayerId, players.get(playerId));
            }
        }

        if (layouts.size > 0) {
            req.log.info({ player, layouts: layouts.size }, 'StoreLayouts');
            await this.storeLayouts(req, worldId, player, layouts);
        }

        req.logContext['baseCount'] = output.length;

        return { id: output, worldId };
    }
}
