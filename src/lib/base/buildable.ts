import {Tile} from './tile';
import {GameDataJSON, GameDataRepair} from '../data/gamedata';
import {GameDataResource} from "../data/gamedata";

export interface Buildable {
    id:string;

    getLevel(): number;
    setLevel(level:number);
    getUpgradeCost(): GameDataResource;
    getTotalUpgradeCost(): GameDataResource;
    getHealth(): number;
    canBuildOn(x:number, y:number, tile:Tile) : boolean;
    getID(): number;
    getName():string;
    getClassName():string;

    getPlunder():GameDataRepair;
    getGameData():GameDataJSON;
}