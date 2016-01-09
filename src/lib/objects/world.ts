import {ParseJSONBaseObject} from "./base.object";
export interface ParseJSONWorldObject extends ParseJSONBaseObject {
    world:number;
    name:string;
    hasBot:boolean;
}