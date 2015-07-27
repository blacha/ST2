import {BuildingType} from './buildingtype';
import {Buildable} from '../base/buildable';

export class Building implements Buildable {

    constructor(private building:BuildingType, private level:number) {
    }

    getLevel():number {
        return this.level;
    }

    setLevel(level:number) {
        this.level = level;
    }

    getHealth() {
        return this.building.getHealth(this.level);
    }

    getID():number {
        return this.building.getID();
    }

    getCode():string {
        return this.building.getCode();
    }

    getCodeName():string {
        return this.building.getCodeName();
    }

    getClassName():string {
        return this.building.getClassName();
    }

    getName():string {
        return this.building.getName();
    }

    getCost() {
        return this.building.getCost(this.level);
    }

    getPlunder() {
        return this.building.getPlunder(this.level);
    }

    canBuildOn(x:number, y:number, tile:Tile):boolean {
        return this.building.canBuildOn(x, y, tile);
    }

    getGameData() {
        return this.building.getGameData();
    }
}
