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
    /** CNC city Id */
    cityId: number;
    /** Id of the world that the base is on */
    worldId: number;

    /** Base level */
    level: number;
    /** Base Offense level */
    levelOff?: number;
    /** Base Defense level */
    levelDef?: number;

    /** Name of base */
    name: string;

    x: number;
    y: number;

    /** Faction, GDI, NOD, Forgotten */
    faction: number;

    /** Owners name */
    owner: string;
    /** Player GameId */
    ownerId: GamePlayerId;
    /** Alliance name */
    alliance?: string;
    /** Alliance Id */
    allianceId?: GameAllianceId | null;
    /** Base version  */
    version: number;
    tiles: CityLayoutTile[];
    /** Units that have upgrades */
    upgrades: number[];

    /** Time the base was last seen */
    timestamp: number;
}

export interface CacheObject<T> {
    timestamp: number;
    obj: T;
}
