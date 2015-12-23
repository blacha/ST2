import {ParseBaseObject} from "./base.object";
import {AllianceBonusData} from "../../api/player.info";

export interface ParseAllianceObject extends ParseBaseObject {
    world:number;
    alliance:number;
    name: string;
    bonus: AllianceBonusData;
    players: string[]
}