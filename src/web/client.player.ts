import {CNCLocation, CNCUnit} from './client.base.ts';

export interface CNCPlayer {
    faction: number;
    world: number;
    player:string;
    bases: CNCPlayerBase[];
    upgrades:number[];
}

export interface CNCPlayerBase extends CNCLocation {
    id: number;
    name: string;
    version: number;
    tiles: Array<CNCUnit|number>;
}