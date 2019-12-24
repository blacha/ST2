export const LayoutDataVersion = 1;

export interface LayoutScanApi {
    v: 1;
    player: {
        id: number;
        accountId: number;
        name: string;
    };
    world: number;
    layouts: CityLayout[];
}

export interface CityLayoutTileObject {
    /** Tile Id */
    t?: number;
    /** Object level */
    l: number;
    /** Object Id */
    id: number;
    /** Unit inside another unit */
    u?: any;
}
export type CityLayoutTile = null | number | CityLayoutTileObject;

export type GamePlayerId = number;
export type GameAllianceId = number;

export interface CityLayout {
    baseId?: string;
    cityId?: number;

    level: number;
    levelOff?: number;
    levelDef?: number;

    name: string;

    x: number;
    y: number;

    faction: number;

    owner: string;
    /** Player GameId */
    ownerId?: GamePlayerId;
    alliance?: string;
    allianceId?: GameAllianceId | null;
    version: number;
    world: number;
    tiles: CityLayoutTile[];
    upgrades: number[];
}
