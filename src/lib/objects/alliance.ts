import {ParseJSONBaseObject} from "./base.object";
import {AllianceBonusData} from "../../api/player.info";
import {AlliancePlayerInfoData} from "../../api/player.info";

export interface ParseJSONAllianceObject extends ParseJSONBaseObject {
    world:number;
    alliance:number;
    name: string;
    bonus: AllianceBonusData;
    players: AlliancePlayerInfoData[]
}