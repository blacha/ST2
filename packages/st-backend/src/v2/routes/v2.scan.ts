import {
    AllianceId,
    AllianceName,
    CityId,
    CompositeId,
    PlayerId,
    PlayerNameDisplay,
    TimeStamp,
    WorldId,
} from '@cncta/clientlib';
import { BaseLocationPacker, Duration, InvalidAllianceId, StCity } from '@cncta/util';
import { V2CityScan } from '@st/api/build/v2/v2.scan';
import { ModelCity, ModelUtil, Stores } from '@st/model';
import { BaseBuilder, NumberPacker, WorldAllianceId, WorldCityId, WorldPlayerId } from '@st/shared';
import { TypeOf } from 'io-ts';
import { V2ApiHandler, V2Request } from '../v2.request';

/* Expire after 3 days */
const LayoutExpireMs = Duration.days(3);

export class V2CityScanService extends V2ApiHandler<typeof V2CityScan> {
    def = V2CityScan;

    async storePlayer(req: V2Request, worldId: WorldId, playerId: PlayerId, cityList?: StCity[]): Promise<void> {
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

    async storeLayouts(req: V2Request, worldId: WorldId, player: PlayerNameDisplay, layoutsList: Map<string, string>) {
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
                const existing = model.layouts[key];
                if (existing?.layout == layout) {
                    model.layouts[key] = {
                        ...existing,
                        layout,
                        updatedAt,
                    };
                } else {
                    model.layouts[key] = {
                        layout,
                        updatedAt,
                        createdAt: updatedAt,
                    };
                }
            }
        });
    }

    async handle(req: V2Request, params: TypeOf<typeof V2CityScan['request']>) {
        const { worldId, player, cities } = params;

        req.logContext['player'] = player;
        req.logContext['worldId'] = worldId;

        const output: string[] = [];
        const layouts: Map<string, string> = new Map();
        const players: Map<number, StCity[]> = new Map();
        for (const baseJson of cities) {
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

        return { cityIds: output };
    }
}
