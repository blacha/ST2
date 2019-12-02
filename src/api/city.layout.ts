export const LayoutDataVersion = 1;

export interface LayoutScanAPI {
    version: number;
    player: string;
    world: number;
    layouts: CityLayout[];
}

export interface CityLayout {
    cityid: number;
    coord?: number;
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
