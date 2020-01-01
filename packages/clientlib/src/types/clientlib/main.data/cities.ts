import { GameDataUnit } from '../../game';
import { ClientLibPlayerResearch } from './player';
import { ClientLibMap } from '../util';
import { ResourceType } from '../../game/resource';
import { FactionType } from '../../game/faction';

/* eslint-disable @typescript-eslint/camelcase */

export interface ClientLibCityUnitRepairRequirements {
    Type: ResourceType;
    Count: number;
}

export interface ClientLibCityBuildable {
    get_Id(): number;
    get_CoordX(): number;
    get_CoordY(): number;
    get_MdbUnitId(): number;
    get_CurrentLevel(): number;
}

export type ClientLibCityBuilding = ClientLibCityBuildable;
export interface ClientLibCityUnit extends ClientLibCityBuildable {
    get_Health(): number;
    get_CurrentDamage(): number;
    /** Health percent between 0-1 */
    get_HitpointsPercent(): number;
    get_UnitGameData_Obj(): GameDataUnit;
    get_IsAlive(): boolean;
    get_UnitLevelRepairRequirements(): ClientLibCityUnitRepairRequirements[];
}

export interface ClientLibBattleViewUnit {
    get_UnitDetails(): ClientLibCityUnit;
}

export interface ClientLibCityUnits {
    get_TotalDefenseHeadCount(): number;
}

export interface ClientLibCity {
    IsOwnBase(): boolean;
    GetBuildingsConditionInPercent(): number;

    get_Id(): number;
    /** Rounds level */
    get_BaseLevel(): number;
    /** Get full level */
    get_LvlBase(): number;
    get_LvlDefense(): number;
    get_LvlOffense(): number;

    get_Name(): string;
    /** Null if current player's base */
    get_ActiveModules(): number[] | null;
    get_Buildings(): ClientLibMap<ClientLibCityBuilding>;
    get_CityFaction(): FactionType;
    get_CityUnitsData(): ClientLibCityUnits;
    get_Version(): number | -1;

    get_IsGhostMode(): boolean;
    /** Name of owner, undefined if player */
    get_OwnerName(): string | undefined;
    get_OwnerId(): number;
    get_OwnerAllianceId(): number | null;
    get_OwnerAllianceName(): string | undefined;

    get_PosX(): number;
    get_PosY(): number;

    GetResourceType(x: number, y: number): ResourceType;
}

export interface ClientLibCities {
    get_PlayerResearch(): ClientLibPlayerResearch;
    get_CurrentCity(): ClientLibCity | null;
    get_AllCities(): ClientLibMap<ClientLibCity>;
    get_CurrentCityId(): number | -1;
    get_CurrentForeignCityId(): number | -1;
    get_CurrentOwnCity(): ClientLibCity;
    get_CurrentOwnCityId(): number | -1;
    get_HomeCityId(): number | -1;

    set_CurrentCityId(cityId: number): void;
    GetCity(cityId: number): ClientLibCity | null;
}
