import { PartialResourceMap } from '../../extension/@types/client.lib.const';
import { GameDataObject } from '../data/game.data.object';
import { GameResources } from '../game.resources';
import { Tile } from './tile';

export interface Buildable {
    /** Current level of the object */
    level: number;
    /** Game object */
    type: GameDataObject;

    /** Cost for the next upgrade */
    getUpgradeCost(): GameResources;
    /** Total cost of the building */
    getTotalUpgradeCost(): GameResources;
    getHealth(): number;
    canBuildOn(x: number, y: number, tile: Tile): boolean;
    /** How many resources will this give if destroyed in combat */
    getPlunder(): PartialResourceMap;
}
