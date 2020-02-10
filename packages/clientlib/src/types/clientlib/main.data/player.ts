import { GameDataUnit, GameDataTech, GameDataResearchLevel } from '../../game';
import { ClientLibList } from '../util';
import { PlayerNameDisplay, AllianceId, PlayerId } from '../../../id';

/* eslint-disable @typescript-eslint/camelcase */
export declare class ClientLibPlayerResearchResult {
    get_CurrentLevel(): GameDataResearchLevel;
    get_GameDataUnit_Obj(): GameDataUnit;
    get_GameDataTech_Obj(): GameDataTech;
}

export const enum ClientLibTechType {
    TechOffense = 1,
    TechDefense = 2,
    TechSpecial = 5,
}

export declare class ClientLibPlayerResearch {
    GetResearchItemListByType(type: ClientLibTechType): ClientLibList<ClientLibPlayerResearchResult>;
}

export declare class ClientLibPlayer {
    /** Player Name */
    name: PlayerNameDisplay;
    accountId: number;
    allianceId: AllianceId;
    /** Player Id */
    id: PlayerId;
    get_PlayerResearch(): ClientLibPlayerResearch;
}
