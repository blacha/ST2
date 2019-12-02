export const LayoutDataVersion = 1;

export interface LayoutScanApi {
    version: number;
    player: string;
    world: number;
    layouts: CityLayout[];
}

export interface CityLayout {
    cityId: number;
    level: number;
    name: string;
    x: number;
    y: number;
    faction: number;
    owner: string;
    version: number;
    player: string;
    alliance: number;
    world: number;
    tiles: any;
    upgrades: number[];
}
