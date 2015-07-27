import {Tile} from './tile';
import {GameDataJSON} from '../data/gamedata';

export interface Buildable {
    getLevel(): number;
    setLevel(level:number);
    getCost(): number;
    getHealth(): number;
    canBuildOn(x:number, y:number, tile:Tile) : boolean;
    getID(): number;
    getCodeName(): string;
    getCode(): string;
    getName():string;
    getClassName():string;

    getGameData():GameDataJSON;
}