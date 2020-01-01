import { Buildable } from '../base/buildable';
import { Tile } from '../base/tile';
import { GameResources } from '../game.resources';
import { BuildingType } from './building.type';

export class Building implements Buildable {
    level: number;
    type: BuildingType;

    constructor(building: BuildingType, level: number) {
        this.type = building;
        this.level = level;
    }

    getHealth() {
        return this.type.getHealth(this.level);
    }

    get data() {
        return this.type.data;
    }

    get className() {
        return this.type.className;
    }

    get name() {
        return this.type.name;
    }

    getUpgradeCost(): GameResources {
        return this.type.getUpgradeCost(this.level);
    }

    getTotalUpgradeCost(): GameResources {
        return this.type.getTotalUpgradeCost(this.level);
    }

    getPlunder() {
        return this.type.getPlunder(this.level);
    }

    canBuildOn(x: number, y: number, tile: Tile): boolean {
        return this.type.canBuildOn(x, y, tile);
    }

    toString() {
        return `[Building: ${this.type.toString()}: ${this.level}]`;
    }
}
