import {
    CityId,
    WorldId,
    FactionType,
    PlayerId,
    PlayerNameDisplay,
    AllianceName,
    AllianceId,
    GameDataUnitId,
    GameDataResearchLevel,
} from '@cncta/clientlib';
import { InvalidAllianceName, InvalidAllianceId } from './id';

export interface CityArmy {
    def: string;
    off: string;
}

export interface IdName {
    id: number;
    name: string;
}

export interface StCity extends CityArmy {
    /** CNC city Id */
    cityId: CityId;
    /** Id of the world that the base is on */
    worldId: WorldId;

    level: {
        /** Base level */
        base: number;
        /** Base Offense level */
        off: number;
        /** Base Defense level */
        def: number;
    };

    /** Name of base */
    name: string;

    x: number;
    y: number;

    /** Faction, GDI, NOD, Forgotten */
    faction: FactionType;

    /** Owners name & Id */
    ownerId: PlayerId;
    owner: PlayerNameDisplay;

    /** Alliance name & Id*/
    alliance?: AllianceName | typeof InvalidAllianceName;
    allianceId?: AllianceId | typeof InvalidAllianceId;

    /** Base version  */
    version: number;

    /** Base data */
    tiles: string;
    base: string;

    /** Units that have upgrades */
    upgrades: Partial<Record<GameDataUnitId, GameDataResearchLevel>>;

    /** Time the base was last seen */
    timestamp: number;
}
