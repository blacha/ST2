import { Base } from '../base';
import { Building } from '../building/building';
import { GameResources } from '../game.resources';

export interface BuildingOutput {
    cont: GameResources;
    pkg: GameResources;
}
export interface BaseOutput extends BuildingOutput {
    alliance: GameResources;
    total: GameResources;
}

export interface OutputCalculator {
    name: string;
    buildings: number[];
    calculate: (base: Base, x: number, y: number, building: Building) => BuildingOutput;
    links: any;
}
