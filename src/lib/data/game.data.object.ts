import * as Util from '../util';
import { GameDataJson, GameDataRepair, GameDataResource } from './game.data';
import { Constants } from '../constants';

export class GameDataObject {
    id = -1;
    _data: GameDataJson | null = null;
    className = '';
    codeName = ''; // cncopt code

    static Id: Record<number, GameDataObject> = {};
    static getById(id: number): GameDataObject {
        return GameDataObject.Id[id];
    }

    constructor(id: number) {
        this.id = id;
        GameDataObject.Id[this.id] = this;
    }

    get data(): GameDataJson {
        if (this._data == null) {
            throw new Error('GameData not loaded id:' + this.id);
        }
        return this._data;
    }

    get name() {
        return this.data.name;
    }

    setGameData(data: GameDataJson) {
        this._data = data;
        this.className = this.data.display.toLowerCase().replace(/ /g, '-');
        this.codeName = Constants.CODES[data.name];
    }

    getHealth(level: number) {
        return 0;
        //return Util.getSingleGrowthValue(this.data.health, level,
        //    Constants.HEALTH_GROWTH);
    }

    getPlunder(level: number): GameDataRepair {
        return Util.getRepairValue(this.data, level);
    }

    getUpgradeCost(level: number): GameDataResource {
        return Util.getUpgradeCost(this.data, level);
    }

    getTotalUpgradeCost(level: number): GameDataResource {
        return Util.getTotalUpgradeCost(this.data, level);
    }
}
