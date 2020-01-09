import { ClientLibEventEmitter } from './event';
import { ClientLibWorldObject } from './main.data/world';

/* eslint-disable @typescript-eslint/camelcase */

export const enum MouseMode {
    Default = 0,
    Repair = 1,
    Move = 2,
    Upgrade = 3,
    Sell = 4,
}

export const enum VisViewMode {
    UseCurrent = -1,
    None = 0,
    City = 1,
    Region = 2,
    Battleground = 3,
    ArmySetup = 4,
    DefenseSetup = 5,
    World = 6,
    CombatSetup = 7,
}

export const enum VisObjectType {
    UnknownType = 0,
    CityBuildingType = 1,
    CityResourceFieldType = 2,
    CityWallType = 3,
    RegionCityType = 4,
    RegionSuperWeaponType = 5,
    RegionTerrainType = 6,
    BattlegroundUnit = 7,
    ArmyUnitType = 8,
    ArmyDismissArea = 9,
    DefenseUnitType = 10,
    DefenseTerrainFieldType = 11,
    RegionMoveTarget = 12,
    RegionFreeSlotType = 13,
    RegionNPCBase = 14,
    RegionNPCCamp = 15,
    RegionPointOfInterest = 16,
    RegionRuin = 17,
    RegionGhostCity = 18,
    RegionNewPlayerSpot = 19,
    DefenseTerrainFieldAdditionalSlosType = 20,
    DefenseOffScreenUnit = 21,
    WorldObject = 24,
    WorldMapMarker = 25,
    WorldSatelliteCrashMarker = 26,
    WorldHubCenterMarker = 27,
    WorldHubControlMarker = 28,
    RegionHubServer = 29,
    RegionHubControl = 30,
    RegionHubCenter = 31,
    RegionAllianceMarker = 32,
    WorldCityOwn = 33,
    WorldAllianceMarker = 34,
    WorldPOI = 35,
    WorldCityNotOwn = 36,
}
export enum RegionCityType {
    Own = 0,
    Alliance = 1,
    Enemy = 2,
}

export interface VisObject {
    get_Id?(): number;

    /** rawX offset by GridWidth */
    get_X(): number;
    /** rawY offset by GridHeight */
    get_Y(): number;
    get_VisObjectType(): VisObjectType;
    get_Coordinates(): number;
}

export interface RegionObject extends VisObject {
    get_RawX(): number;
    get_RawY(): number;

    /** XY Encoded */
    get_Coordinates(): number;
}

export interface RegionGhostCity extends RegionObject {
    get_VisObjectType(): number;
}

export type RegionHub = RegionObject;
export type RegionHubCenter = RegionObject;
export type RegionHubControl = RegionObject;
export type RegionHubServer = RegionObject;
export type RegionRuin = RegionObject;
export type RegionAllianceMarker = RegionObject;
export type RegionPointOfInterest = RegionObject;

/** Shared between all Base, City & Camp */
export interface RegionObjectBase extends RegionObject {
    /** CityId @see ClientLibCity.CityId */
    get_Id(): number;
    /**
     * @example
     * "Outpost"
     */
    get_Name(): string;
    /* Level rounded down */
    get_BaseLevel(): number;
    /** Base building health between 0-100 */
    get_ConditionBuildings(): number;
    /** Defense health between 0-100 */
    get_ConditionDefense(): number;

    get_PlayerId(): number;
    get_AllianceId(): number;

    /* Show info about base */
    ShowInfos(): void;
    /** Hide info about base */
    HideInfos(): void;

    /** Update the color of the info panel */
    UpdateColor(): void;
}

/** Player base */
export interface RegionCity extends RegionObjectBase {
    get_AllianceName(): string;
    get_TargetObject(): ClientLibWorldObject;

    /** Current command center level, 0 if out of range */
    get_CommandCenterLevel(): number | 0;
}
/** Forgotten base */
export interface RegionNpcBase extends RegionObjectBase {
    CalculateBuildingAndDefenseCondition(a: unknown): unknown;
    get_IsHubBase(): boolean;
    get_BaseLevelFloat(): number;
    get_TargetObject(): ClientLibWorldObject;
}

/** Forgotten Camp or Outpost */
export interface RegionNpcCamp extends RegionObjectBase {
    get_BaseLevelFloat(): number;
    get_TargetObject(): ClientLibWorldObject;
}

export type RegionObjectType =
    | RegionNpcCamp
    | RegionNpcBase
    | RegionCity
    | RegionHub
    | RegionHubCenter
    | RegionHubControl
    | RegionHubServer
    | RegionRuin
    | RegionAllianceMarker
    | RegionPointOfInterest;

export interface ClientLibVisRegion extends ClientLibEventEmitter {
    get_GridWidth(): number;
    get_GridHeight(): number;
    /** Number between 0-1, 1 is full zoomed in */
    get_ZoomFactor(): number;

    /* height in pixels */
    get_ViewHeight(): number;
    /** width in pixels */
    get_ViewWidth(): number;

    GetObjectFromPosition(regionX: number, regionY: number): RegionObjectType;

    /* Force a redraw of bases */
    SetColorDirty(): void;
}

export interface ClientLibVisMain extends ClientLibEventEmitter {
    CenterGridPosition(x: number, y: number): void;
    Update(): void;
    ViewUpdate(): void;

    get_MouseMode(): MouseMode;
    get_Mode(): VisViewMode;

    ScreenPosFromWorldPosX(x: number): number;
    ScreenPosFromWorldPosY(y: number): number;

    get_Region(): ClientLibVisRegion;
    get_SelectedObject(): VisObject | null;
}
