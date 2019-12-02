import { Buildable } from '../base/buildable';
import { Tile } from '../base/tile';
import { GameDataJson } from '../data/game.data';
import { UnitType } from './unit.type';

const ID = 0;

export class Unit implements Buildable {
    public type: UnitType;
    public level: number;

    constructor(unit: UnitType, level: number) {
        this.type = unit;
        this.level = level;
    }

    getHealth() {
        return this.type.getHealth(this.level);
    }

    getUpgradeCost() {
        return this.type.getUpgradeCost(this.level);
    }

    getTotalUpgradeCost() {
        return this.type.getTotalUpgradeCost(this.level);
    }

    getPlunder() {
        return this.type.getPlunder(this.level);
    }

    get className(): string {
        return this.type.className;
    }

    get name(): string {
        return this.type.name;
    }

    canBuildOn(x: number, y: number, tile: Tile): boolean {
        if (tile !== Tile.Empty) {
            return false;
        }

        return this.type.canBuildOn(x, y, tile);
    }

    get data(): GameDataJson {
        return this.type.data;
    }

    toString() {
        return `[Unit: ${this.type.toString()}: ${this.level}]`;
    }
}
