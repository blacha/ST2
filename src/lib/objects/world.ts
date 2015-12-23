import {ParseBaseObject} from "./base.object";
export interface ParseWorldObject extends ParseBaseObject {
    world:number;
    name:string;
    hasBot:boolean;
}