import { Tile } from '../base/tile';
import { Constants } from '../constants';
import { Faction } from '../data/faction';
import { GameDataObject } from '../data/game.data.object';

export class UnitType extends GameDataObject {
    faction: Faction = Faction.Forgotten;

    constructor(id: number) {
        super(id);
    }

    getName() {
        return this.data.display;
    }

    getFaction(): Faction {
        return this.faction;
    }

    canBuildOn(x: number, y: number, tile: Tile): boolean {
        if (x > Constants.MAX_BASE_X) {
            return false;
        }

        if (tile !== Tile.Empty) {
            return false;
        }
        return true;
    }

    toString() {
        return '<Unit:' + this.data.display + '>';
    }
}
