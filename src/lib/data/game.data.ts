export interface GameDataJson {
    id: number;
    name: string;
    display: string;
    health: number;
    tech: number;
    resources?: GameDataResource[];
    repair?: GameDataRepair[];
    faction: string;
    speed: number;
    movement: string;
    weapons?: GameDataWeapon[];
    modifiers?: any[];
}

export interface GameDataWeapon {
    range: {
        min: number;
        max: number;
    };
    armorType: string;
    damage: number;
    id: number;
    type: any;
    health: number;
}

export interface GameDataRepair {
    crystal?: number;
    RepairInf?: number;
    RepairVeh?: number;
    RepairAir?: number;
    RepairBase?: number;
    ResearchPoints?: number;
    SupplyPoints?: number;
    CommandPoints?: number;
    OnlyForRewards?: number;
    tiberium?: number;
    credits?: number;
}

export interface GameDataResource {
    crystal?: number;
    power?: number;
    tiberium?: number;
}
