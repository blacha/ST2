import { GameDataUnit, GameDataTech, GameDataResearchLevel } from '../../game';
import { ClientLibList } from '../util';

/* eslint-disable @typescript-eslint/camelcase */
export interface ClientLibPlayerResearchResult {
    get_CurrentLevel(): GameDataResearchLevel;
    get_GameDataUnit_Obj(): GameDataUnit;
    get_GameDataTech_Obj(): GameDataTech;
}

export const enum ClientLibTechType {
    TechOffense = 1,
    TechDefense = 2,
    TechSpecial = 5,
}

export interface ClientLibPlayerResearch {
    GetResearchItemListByType(type: ClientLibTechType): ClientLibList<ClientLibPlayerResearchResult>;
}

export interface ClientLibPlayer {
    /** Player Name */
    name: string;
    accountId: number;
    allianceId: number;
    /** Player Id */
    id: number;
    get_PlayerResearch(): ClientLibPlayerResearch;
}
