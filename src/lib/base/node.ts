import {Tile} from './tile';
import {Buildable} from './buildable';

export interface BaseNode {
    level?: number;
    tile: Tile;
    obj?: Buildable;
    selected?:boolean;
    x: number;
    y: number;

    def?: any;
}
