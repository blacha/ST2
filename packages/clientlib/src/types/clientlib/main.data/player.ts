import { GameDataUnit, GameDataTech } from '../../game';
import { ClientLibList } from '../util';

/* eslint-disable @typescript-eslint/camelcase */
export interface ClientLibPlayerResearchResult {
    get_CurrentLevel(): 0 | 1 | 2;
    get_GameDataUnit_Obj(): GameDataUnit;
    get_GameDataTech_Obj(): GameDataTech;
}

export interface ClientLibPlayerResearch {
    GetResearchItemListByType(type: number): ClientLibList<ClientLibPlayerResearchResult>;
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
