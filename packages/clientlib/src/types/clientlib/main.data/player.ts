import { GameDataUnit, GameDataTech, GameDataResearchLevel } from '../../game';
import { ClientLibList } from '../util';
import { PlayerName, AllianceId, PlayerId } from 'packages/clientlib/src/id';

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
    name: PlayerName;
    accountId: number;
    allianceId: AllianceId;
    /** Player Id */
    id: PlayerId;
    get_PlayerResearch(): ClientLibPlayerResearch;
}
