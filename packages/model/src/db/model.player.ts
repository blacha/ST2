import { AllianceId, AllianceName, CityId, PlayerId, PlayerName, WorldId } from '@cncta/clientlib';
import { StCity } from '@cncta/util';
import { InvalidPlayerId, InvalidPlayerName, InvalidWorldId, Model } from './model';
import { CompositeId } from '@st/shared';

export class ModelPlayer extends Model<ModelPlayer> {
    /** User Uid */
    id: CompositeId<[WorldId, PlayerId]>;

    allianceKey?: CompositeId<[WorldId, AllianceId]>;
    cities: Record<number, StCity>;
    worldId: WorldId;
    player: PlayerName;
    playerId: PlayerId;
    alliance?: AllianceName;
    allianceId?: AllianceId;

    constructor(data?: ModelPlayer) {
        super(data);
        this.cities = data?.cities ?? {};
        this.allianceKey = data?.allianceKey ?? undefined;
        this.worldId = data?.worldId ?? InvalidWorldId;
        this.player = data?.player ?? InvalidPlayerName;
        this.playerId = data?.playerId ?? InvalidPlayerId;
        this.alliance = data?.alliance ?? undefined;
        this.allianceId = data?.allianceId ?? undefined;
    }

    get isValid() {
        return this.playerId != InvalidPlayerId;
    }

    addCity(city: StCity) {
        this.cities[city.cityId] = city;
    }
    getCity(cityId: CityId) {
        return this.cities[cityId];
    }
}
