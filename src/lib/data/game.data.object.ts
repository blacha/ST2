import * as Util from '../util';
import { Faction } from './faction';
import { GameDataJson, GameDataRepair, GameDataResource } from './game.data';
import { DefUnitType } from '../unit/def.unit.type';
import { OffUnitType } from '../unit/off.unit.type';
import { BuildingType } from '../building/building.type';

export enum GameDataObjectType {
    Building = 'building',
    OffUnit = 'off',
    DefUnit = 'def',
}

export class GameDataObject {
    static UnknownCode = '?';
    id = -1;
    _data: GameDataJson | null = null;
    className = '';
    faction: Faction;
    code: string;
    objectType: GameDataObjectType;

    static Id: Record<number, GameDataObject> = {};
    static Type: Record<string, GameDataObject> = {};

    static getById(id: number): GameDataObject {
        return GameDataObject.Id[id];
    }

    static getByCode(objectType: GameDataObjectType, faction: Faction, code: string) {
        return GameDataObject.Type[`${objectType}__${faction.code}__${code}`];
    }

    constructor(type: GameDataObjectType, id: number, faction: Faction, code: string) {
        this.objectType = type;
        this.id = id;
        this.code = code;
        this.faction = faction;

        GameDataObject.Id[this.id] = this;
        GameDataObject.Type[this.hash] = this;
    }

    get hash(): string {
        return `${this.objectType}__${this.faction.code}__${this.code}`;
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
        this.className = data.name.replace(/ /g, '_');
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

    isDefUnit(): this is DefUnitType {
        return this.objectType == GameDataObjectType.DefUnit;
    }

    isOffUnit(): this is OffUnitType {
        return this.objectType == GameDataObjectType.OffUnit;
    }

    isBuildingUnit(): this is BuildingType {
        return this.objectType == GameDataObjectType.Building;
    }
}
