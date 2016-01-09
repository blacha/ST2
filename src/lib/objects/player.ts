import {ResearchInfoData, CommandInfoData, CityInfoData} from "../../api/player.info";
import {ParseJSONBaseObject} from "./base.object";
import {Base} from "../base";
import {GameResources} from "../game.resources";
import {AlliancePlayerInfoData} from "../../api/player.info";

export interface ParseJSONPlayerObject extends ParseJSONBaseObject {
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
    $alliance?: AlliancePlayerInfoData;
}

export interface PlayerStats {
    main: CityInfoData,
    total: {
        production: GameResources;
        resources: GameResources;
        cost: GameResources;
    }
}