import {Tile} from './tile';
import {GameDataJSON} from '../data/gamedata';

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

    getType():string;

    getGameData():GameDataJSON;
}