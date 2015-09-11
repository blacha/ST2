export interface CNCBase {
    x: number;
    y: number;
    level: number;
    name: string;
    faction: number;
    version: number;
    world:number;
    owner:string;
    player:string;
    tiles: {[key:string]: CNCTile|number };
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