import {Base} from '../base';
import {Building} from '../building/building';
import {Tile} from '../base/tile';

export interface RawProduction {
    cont: number;
    pkg?: number;
}

export interface BaseOutput {
    tiberium?: RawProduction;
    crystal?: RawProduction;
    power?: RawProduction;
    credit?: RawProduction;
}

export interface OutputCalculator {
    name: string;
    buildings: number[];
    calculate: (base:Base, x:number, y:number, building:Building) => BaseOutput;
    links: any;
}