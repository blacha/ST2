import {Faction} from '../data/faction';
import {GameDataObject} from '../data/gamedataobject';
import {Tile} from '../base/tile';
import {Constants} from '../constants';

export class UnitType extends GameDataObject {

    faction:Faction;

    constructor(id:number) {
        super(id);
    }



    getName() {
        return this.data.display;
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

    getType() {
        return Constants.UNIT
    }

    toString() {
        return '<Unit:' + this.data.display + '>'
    }
}
