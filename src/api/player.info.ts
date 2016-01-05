import {Base} from "../lib/base";
export interface PlayerData {
    world: WorldInfoData;
    player: PlayerInfoData;
    alliance: AllianceInfoData;
}

export interface WorldInfoData {
    world: number;
    name: string;
}

export interface PlayerInfoData {
    world?: number;
    player: number;
    faction: number;
    name: string;
    score:number;
    rank: number;
    sub: string;
    rp: number;
    credit: number;
    command: CommandInfoData;
    research: ResearchInfoData;
    cities: CityInfoData[];
}

export interface AllianceInfoData {
    world?: number;
    name: string;
    alliance: number;
    players: string[];
    bonus: AllianceBonusData;
}

export interface AllianceBonusData {
    power: number;
    crystal: number;
    tiberium: number;
    air: number;
    def: number;
    vec: number;
    inf: number;
}

export interface ResearchInfoData {
    [key:string]: number;
}
export interface PlayerRepairInfo {
    veh: number;
    air: number;
    inf: number;
    time: number;
}
export interface CommandInfoData {
    current: number;
    max: number;
}

export interface CityInfoData {
    defense: number;
    offense: number;
    level : number;
    id : number;
    x: number;
    y: number;
    v: number;
    name: string;
    tiles: any;
    production: {
        power: number;
        tiberium: number;
        crystal: number;
        credits: number;
    },
    current: {
        power :number;
        tiberium: number;
        crystal: number;
    },
    repair: {
        inf: number;
        veh: number;
        air: number;
        time: number;
    },
    $base?: Base;
}
