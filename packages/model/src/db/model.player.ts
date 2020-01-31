import {
    AllianceId,
    AllianceName,
    CityId,
    CompositeId,
    PlayerId,
    PlayerNameDisplay,
    PlayerNameId,
    WorldId,
} from '@cncta/clientlib';
import { StCity } from '@cncta/util';
import { InvalidPlayerId, InvalidPlayerName, InvalidWorldId, Model, ModelUtil } from './model';

export class ModelPlayer extends Model<ModelPlayer> {
    /** User Uid */
    id: CompositeId<[WorldId, PlayerId]>;

    allianceKey?: CompositeId<[WorldId, AllianceId]>;
    cities: Record<number, StCity>;
    worldId: WorldId;
    player: PlayerNameDisplay;
    playerNameId: PlayerNameId; // Firebase does not allow case insensitive searching
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
        this.playerNameId = ModelUtil.toPlayerNameId(this.player);
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
