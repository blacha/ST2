import { GameDataRepair, GameDataResource } from '../data/game.data';
import { GameDataObject } from '../data/game.data.object';
import { Tile } from './tile';

export interface Buildable {
    /** Current level of the object */
    level: number;
    /** Game object */
    type: GameDataObject;

    /** Cost for the next upgrade */
    getUpgradeCost(): GameDataResource;
    /** Total cost of the building */
    getTotalUpgradeCost(): GameDataResource;
    getHealth(): number;
    canBuildOn(x: number, y: number, tile: Tile): boolean;
    /** How many resources will this give if destroyed in combat */
    getPlunder(): GameDataRepair;
}
