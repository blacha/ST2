export interface GameDataJSON {
    id: number;
    name: string;
    display: string;
    health: number;
    tech: number;
    resources?: GameDataResource[];
    repair?: GameDataRepair[];
    faction: string;
    speed:number;
    movement: string;
    weapons?:GameDataWeapon[];
    modifiers?:any[];
}

export interface GameDataWeapon {
    range: {
        min: number;
        max: number;
    }
    armorType: string;
    damage: number;
}

export interface GameDataRepair {
    crystal?: number;
    RepairInf?: number;
    ResearchPoints?: number;
    tiberium?: number;
}

export interface GameDataResource {
    crystal?:number;
    power?: number;
    tiberium?: number;
}
