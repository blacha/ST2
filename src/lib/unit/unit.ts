import {Faction} from '../data/faction';
import {GameDataJSON} from '../data/gamedata';
import {Tile} from '../base/tile';
import {Buildable} from '../base/buildable';
import {Constants} from '../constants';
import {UnitType} from './unittype';

export class Unit implements Buildable {

    constructor(private unit:UnitType, private level:number) {
    }

    setLevel(level:number) {
        this.level = level;
    }

    getLevel() {
        return this.level;
    }

    getHealth() {
        return this.unit.getHealth(this.level);
    }

    getCost() {
        return this.unit.getCost(this.level);
    }

    getPlunder() {
        return this.unit.getPlunder(this.level);
    }

    getID():number {
        return this.unit.getID();
    }

    getClassName():string {
        return this.unit.getClassName();
    }

    getName():string {
        return this.unit.getName();
    }

    canBuildOn(x:number, y:number, tile:Tile):boolean {
        if (tile !== Tile.Empty) {
            return false;
        }

        return this.unit.canBuildOn(x, y, tile);
    }

    getGameData():GameDataJSON {
        return this.unit.getGameData();
    }


    toString() {
        return `[Unit: ${this.unit.toString()}: ${this.level}]`;
    }
}

