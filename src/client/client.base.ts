export interface CNCLocation {
    x: number;
    y: number;
}

export interface CNCBase extends CNCLocation {
    level: number;
    name: string;
    faction: number;
    version: number;
    buildings: CNCUnit[];
    units: {
        d: CNCUnit[];
        o: CNCUnit[];
    },
    upgrades:number[];
    resources:CNCTile[];
}

export interface CNCUnit extends CNCLocation {
    id: number;
    level: number;
}

export interface CNCTile extends CNCLocation {
    type: number;
}