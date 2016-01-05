import {ResearchInfoData, CommandInfoData, CityInfoData} from "../../api/player.info";
import {ParseBaseObject} from "./base.object";
import {Base} from "../base";

export interface ParsePlayerObject extends ParseBaseObject {
    world:number;
    faction:number;
    player: number;
    rank: number;
    score: number;
    alliance:number;
    name: string;
    sub: string;
    rp: number;
    credit: number;
    command: CommandInfoData;
    research: ResearchInfoData;
    cities: CityInfoData[]
    $stats?: PlayerStats;
}

export interface Resources {
    power: number,
    tiberium: number,
    crystal: number,
    credits: number
}

export interface PlayerStats {
    main: CityInfoData,
    total: {
        production: Resources;
        resources: Resources;
    }
}