import {ResearchInfoData, CommandInfoData, CityInfoData} from "../../api/player.info";
import {ParseBaseObject} from "./base.object";

export interface ParsePlayerObject extends ParseBaseObject {
    world:number;
    faction:number;
    player: number;
    rank: number;
    score: number;
    alliance:number;
    name: string;
    sub: string;
    credit: number;
    command: CommandInfoData;
    research: ResearchInfoData;
    cities: CityInfoData[]
}