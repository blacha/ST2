import { FactionType, ResourceType, WorldObjectType, VisObjectType } from './client.lib.const';
import { GameDataUnit, GameDataTech } from './game.data';
import { ClientLibSingleton, ClientLibList, ClientLibMap } from './client.lib.util';

/* eslint-disable @typescript-eslint/camelcase */

export interface ClientLibPlayerResearchResult {
    get_CurrentLevel(): 0 | 1 | 2;
    get_GameDataUnit_Obj(): GameDataUnit;
    get_GameDataTech_Obj(): GameDataTech;
}

export interface ClientLibPlayerResearch {
    GetResearchItemListByType(type: number): ClientLibList<ClientLibPlayerResearchResult>;
}

export interface ClientLibCityBuildable {
    get_Id(): number;
    get_CoordX(): number;
    get_CoordY(): number;
    get_MdbUnitId(): number;
    get_CurrentLevel(): number;
}

export interface ClientLibCityUnitRepairRequirements {
    Type: ResourceType;
    Count: number;
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
    get_OwnerName(): string;
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
    GetCities(): ClientLibMap<ClientLibWorldObject>;
}

export type RegionNpcCamp = VisObject;
export type RegionObject = VisObject;

export interface VisObject {
    get_Id(): number;
    get_X(): number;
    get_Y(): number;
    get_VisObjectType(): VisObjectType;
    get_Coordinates(): number;
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

    get_MouseMode(): MouseMode;

    get_SelectedObject(): VisObject | null;
}

export enum MouseMode {
    Default = 0,
    Repair = 1,
    Move = 2,
    Upgrade = 3,
    Sell = 4,
}

export interface ClientLibStatic {
    Data: {
        MainData: ClientLibSingleton<ClientLibMainData>;
    };
    Vis: {
        SelectionChange: Function;
        VisMain: ClientLibSingleton<ClientLibVis>;
        VisObject: {
            EObjectType: typeof VisObjectType;
        };
    };
    Base: {
        MathUtil: ClientLibMathUtil;
    };
}

export interface PheStatic {
    cnc: {
        Util: {
            attachNetEvent(
                mainData: ClientLibVis,
                evtName: 'SelectionChange',
                eventFunction: Function,
                thisArg: any,
                callback: Function,
            ): void;
            detachNetEvent(
                mainData: ClientLibVis,
                evtName: 'SelectionChange',
                eventFunction: Function,
                thisArg: any,
                callback: Function,
            ): void;
        };
    };
}
