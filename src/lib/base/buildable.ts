import {Tile} from './tile';
import {GameDataJSON, GameDataRepair} from '../data/gamedata';

export interface Buildable {
    id:string;

    getLevel(): number;
    setLevel(level:number);
    getCost(): number;
    getHealth(): number;
    canBuildOn(x:number, y:number, tile:Tile) : boolean;
    getID(): number;
    getName():string;
    getClassName():string;

    getPlunder():GameDataRepair;
    getGameData():GameDataJSON;
}