import {Faction} from '../data/faction';
import {GameDataObject} from '../data/gamedataobject';
import {Tile} from '../base/tile';
import {Constants} from '../constants';

export class UnitType extends GameDataObject {

    code: string;
    name: string;
    faction:Faction;

    constructor(id:number) {
        super(id);
    }

    getCode() {
        return this.code;
    }

    getName() {
        return this.name;
    }

    getFaction():Faction {
        return this.faction;
    }

    canBuildOn(x:Number, y:Number, tile:Tile):boolean {
        if (x > Constants.MAX_BASE_X) {
            return false;
        }

        if (tile !== Tile.Empty) {
            return false;
        }
    }

    toString() {
        return '<Unit:' + this.name + '>'
    }
}
