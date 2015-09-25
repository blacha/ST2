export interface CNCBase extends CNCLocation {
    level: number;
    name: string;
    faction: number;
    version: number;
    world:number;
    owner:string;
    player:string;
    tiles: Array<CNCUnit|number>;
    upgrades:number[];
}

export interface CNCUnit {
    id: number;
    l: number;
}

export interface CNCTile extends CNCUnit {
    u: CNCUnit
    t?: number;
}

export interface CNCLocation {
    x: number;
    y: number;
}