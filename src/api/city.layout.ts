export const LayoutDataVersion = 1;

export interface LayoutScanApi {
    version: number;
    player: string;
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
}
export type CityLayoutTile = number | CityLayoutTileObject;

export type GamePlayerId = number;
export type GameAllianceId = number;

export interface CityLayout {
    cityId?: number;
    level: number;
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
