import { MovementType } from './unit';
import { ResourceType, ModifierType } from './resource';
import { GameDataUnitId } from './unit.id';
import { GameDataTechId } from './tech.id';

/* eslint-disable @typescript-eslint/camelcase */
export type GameDataUnitModuleId = number;
export interface GameDataResourceCost {
    t: ResourceType;
    /** Resource count */
    c: number;
}

export interface GameDataModifiersLm {
    i: number;
    v: number;
    t: ModifierType;
}

export interface GameDataModifiers {
    lm: GameDataModifiersLm[];
    lr: unknown[];
    /** Resources required */
    rr: GameDataResourceCost[];
}
export interface GameDataTech {
    /**
     * @example NOD_Militants
     */
    dn: string;
    /**
     * @example "GDI_Construction Yard"
     */
    n: string;
    t: number | unknown;
    x: number | unknown;
    y: number | unknown;
    // Unknown
    c: number;

    r: GameDataModifiers[];

    ci: GameDataAssetLocation;
    tr: {
        /** Upgrade description */
        uds: string;
        /** Name of upgrade
         * @example "Transport"
         */
        dn: string;

        ds: string;

        tei: GameDataAssetLocation;
        /** Disabled asset */
        tdi: GameDataAssetLocation;
    };
}

export interface GameDataResources {
    lr: unknown[];
    /** Repair required resources */
    rer: GameDataResourceCost[];
    /** Resources */
    rr: GameDataResourceCost[];
}

export enum GameDataResearchLevel {
    NotResearched = 0,
    Researched = 1,
    Upgraded = 2,
}

export interface GameDataUnitModulesResearch {
    /**
     * TechId
     * @see GameDataStatic.Tech
     */
    i: GameDataTechId;
    /**
     *  Level
     */
    l: GameDataResearchLevel;
}
export interface GameDataUnitModules {
    /** Requirements to activate the module */
    r: GameDataUnitModulesResearch[];
    t: number;
    i: GameDataUnitModuleId;
}

/**
 * Location of a asset
 * @example 'battleground/gdi/units/off/APC/APC_detail.png'
 */
export type GameDataAssetLocation = string;
export interface GameDataUnit {
    /** Unit Id */
    i: GameDataUnitId;
    /**
     * Display name
     * @example "Militants"
     */
    dn: string;
    /** @example "Mobile anti-air infantry" */
    ds: string;
    id: string;

    /** Speed */
    s: number; //UnitSpeed

    /**
     * Class name
     * @example "GDI_Rifleman"
     */
    n: string;
    /** Tech Id */
    tl: GameDataTechId | -1;

    /** Base Life */
    lp: number;

    mt: MovementType;
    r: GameDataResources[];
    m: GameDataUnitModules[];

    /**
     * Battleground image
     * Generally unit when attacking
     */
    bi: GameDataAssetLocation;
    /**
     * Detail asset
     * @remarks
     */
    dimg: GameDataAssetLocation;
    /** Setup Asset */
    simg: GameDataAssetLocation;
    /** Icon Asset */
    iimg: GameDataAssetLocation;
    dd: GameDataAssetLocation;
}

export interface GameDataStatic {
    /** UnitId -> GameDataUnit */
    units: Record<GameDataUnitId, GameDataUnit>;
    /** TechId -> GameDataTech */
    Tech: Record<string, GameDataTech>;

    gdiTechIds: number[];
    gdiTechResearchIds: number[];
    gdiUnitIds: number[];

    nodTechIds: number[];
    nodTechResearchIds: number[];
    nodUnitIds: number[];

    npcTechIds: number[];
    npcTechResearchIds: number[];
    npcUnitIds: number[];
}

export * from './faction';
export * from './resource';
export * from './unit';
export * from './unit.id';
