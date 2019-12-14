import { MovementType, ModifierType, ResourceType } from './client.lib.const';

/* eslint-disable @typescript-eslint/camelcase */
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

export interface GameDataUnitM {
    t: number;
    i: number;
}
export type UnitId = number;
export type TechId = number;
/**
 * Location of a asset
 * @example 'battleground/gdi/units/off/APC/APC_detail.png'
 */
export type GameDataAssetLocation = string;
export interface GameDataUnit {
    /** Unit Id */
    i: UnitId;
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
    tl: TechId | -1;

    /** Base Life */
    lp: number;

    mt: MovementType;
    r: GameDataResources[];
    m: GameDataUnitM[];

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
    units: Record<UnitId, GameDataUnit>;
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
