export interface TaBase extends TaLocation {
    level: number;
    name: string;
    faction: number;
    version: number;
    world: number;
    owner: string;
    player: string;
    tiles: Array<TaUnit | number>;
    upgrades: number[];
}

export interface TaUnit {
    id: number;
    l: number;
}

export interface TaTile extends TaUnit {
    u: TaUnit;
    t?: number;
}

export interface TaLocation {
    x: number;
    y: number;
}
