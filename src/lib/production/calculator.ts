import { Base } from '../base';
import { Building } from '../building/building';
import { GameResources } from '../game.resources';

export interface BaseOutput {
    cont: GameResources;
    pkg: GameResources;
}

export interface OutputCalculator {
    name: string;
    buildings: number[];
    calculate: (base: Base, x: number, y: number, building: Building) => BaseOutput;
    links: any;
}
