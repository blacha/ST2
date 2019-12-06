import { FactionType, ResourceType, WorldObjectType } from './client.lib.const';
import { GameDataUnit, GameDataTech } from './game.data';

/* eslint-disable @typescript-eslint/camelcase */

export interface ClientLibPlayerResearchResult {
    get_CurrentLevel(): 0 | 1 | 2;
    get_GameDataUnit_Obj(): GameDataUnit;
    get_GameDataTech_Obj(): GameDataTech;
}

export interface ClientLibPlayerResearch {
    GetResearchItemListByType(type: number): ClientLibArray<ClientLibPlayerResearchResult>;
}

export interface ClientLibCityBuildable {
    get_CoordX(): number;
    get_CoordY(): number;
    get_MdbUnitId(): number;
    get_CurrentLevel(): number;
}

export type ClientLibCityBuilding = ClientLibCityBuildable;
export type ClientLibCityUnit = ClientLibCityBuildable;

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

    get_Name(): string;
    /** Null if current player's base */
    get_ActiveModules(): number[] | null;
    get_Buildings(): ClientLibMap<ClientLibCityBuilding>;
    get_CityFaction(): FactionType;
    get_CityUnitsData(): ClientLibCityUnits;
    get_Version(): number | -1;

    get_IsGhostMode(): boolean;
    /** Name of owner, undefined if player */
    get_OwnerName(): string;
    get_OwnerId(): number;
    get_OwnerAllianceId(): number | null;
    get_OwnerAllianceName(): string | undefined;

    get_PosX(): number;
    get_PosY(): number;

    GetResourceType(x: number, y: number): ResourceType;
}

export interface ClientLibMap<T> {
    /** Id to record map */
    d: Record<string, T>;
    /** Number of records */
    c: number;
}

export interface ClientLibArray<T> {
    l: T[];
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

    set_CurrentCityId(id: number): void;
    GetCity(id: number): ClientLibCity | null;
}

export interface ClientLibAlliance {
    get_Id(): number;
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

export interface ClientLibServer {
    get_WorldId(): number;
    get_MaxAttackDistance(): number;
}
export interface ClientLibWorldObject {
    Type: WorldObjectType;
}
export interface ClientLibWorld {
    GetObjectFromPosition(x: number, y: number): ClientLibWorldObject;
}

export interface ClientLibMainData {
    get_Time(): unknown;
    get_Chat(): unknown;
    get_Server(): ClientLibServer;
    get_World(): ClientLibWorld;
    get_Player(): ClientLibPlayer;
    get_Alliance(): ClientLibAlliance;
    get_Cities(): ClientLibCities;
    get_CitiesSupport(): unknown;
    get_Mail(): unknown;
    get_Reports(): unknown;
    get_Missions(): unknown;
    get_BaseColors(): unknown;
    get_Gift(): unknown;
    get_Forum(): unknown;
    get_Notifications(): unknown;
    get_Combat(): unknown;
    get_AllianceCombatState(): unknown;
    get_AllianceSupportState(): unknown;
    get_AllianceTargetWatcher(): unknown;
    get_Inventory(): unknown;
    get_ShopCatalog(): unknown;
    get_PlayerSubstitution(): unknown;
    get_EndGame(): unknown;
    get_Challenge(): unknown;
    get_ArsenalHandler(): unknown;
}

export interface ClientLibMathUtil {
    EncodeCoordId(x: number, y: number): number;
}
export interface ClientLibVis {
    CenterGridPosition(x: number, y: number): void;
    Update(): void;
    ViewUpdate(): void;
}

export interface Singleton<T> {
    GetInstance(): T;
}

export interface ClientLibStatic {
    Data: {
        MainData: Singleton<ClientLibMainData>;
    };
    Vis: {
        VisMain: Singleton<ClientLibVis>;
    };
    Base: {
        MathUtil: ClientLibMathUtil;
    };
}
