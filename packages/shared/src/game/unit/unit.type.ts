import { BaseX } from '@cncta/clientlib';
import { Tile } from '../base/tile';
import { Faction } from '../data/faction';
import { GameDataObject } from '../data/game.data.object';

export class UnitType extends GameDataObject {
    getName() {
        return this.data.display;
    }

    getFaction(): Faction {
        return this.faction;
    }

    canBuildOn(x: number, y: number, tile: Tile): boolean {
        if (x > BaseX.Max) {
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
