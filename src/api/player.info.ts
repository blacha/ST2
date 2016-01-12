import {Base} from "../lib/base";
import {GameResources} from "../lib/game.resources";
import {Resources} from "../lib/game.resources";


export const PlayerDataVersion = 1;

export interface PlayerData {
    world: WorldInfoData;
    player: PlayerInfoData;
    alliance: AllianceInfoData;
    version: number;
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
    mcv: MCVInfoData;
    command: CommandInfoData;
    research: ResearchInfoData;
    cities: CityInfoData[];
}

export interface MCVInfoData {
    time: number;
    level: number;
}
;

export interface AllianceInfoData {
    world?: number;
    name: string;
    alliance: number;
    players: AlliancePlayerInfoData[];
    bonus: AllianceBonusData;
}

export interface AlliancePlayerInfoData {
    name: string;
    rank: number;
    score: number;
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
    production: Resources,
    current: Resources,
    repair: {
        inf: number;
        veh: number;
        air: number;
        time: number;
    },
    $base?: Base;
    $cost?: GameResources;
}
