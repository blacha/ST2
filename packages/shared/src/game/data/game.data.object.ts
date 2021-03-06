import { BuildingType } from '../building/building.type';
import { Constants } from '../constants';
import { GameResources, PartialResourceMap } from '../game.resources';
import { GrowthCalculator } from '../growth.calculator';
import { DefUnitType } from '../unit/def.unit.type';
import { OffUnitType } from '../unit/off.unit.type';
import { Faction } from './faction';
import { GameDataJson } from './game.data';
import { GameDataUnitId } from '@cncta/clientlib';

export enum GameDataObjectType {
    Building = 'building',
    OffUnit = 'off',
    DefUnit = 'def',
}

export class GameDataObject {
    static UnknownCode = '?';
    id: GameDataUnitId = -1;
    className = '';
    faction: Faction;
    code: string;
    objectType: GameDataObjectType;

    static Id: Partial<Record<GameDataUnitId, GameDataObject>> = {};
    static Type: Record<string, GameDataObject> = {};

    static hasGameObject(id: GameDataUnitId): boolean {
        return GameDataObject.Id[id] != null;
    }

    static getById(id: GameDataUnitId): GameDataObject {
        const obj = GameDataObject.Id[id];
        if (obj == null) {
            console.trace('BadId');
            throw new Error(`Unable to find game object for ${id}`);
        }
        return obj;
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

    _data: GameDataJson | null = null;
    get data(): GameDataJson {
        if (this._data == null) {
            throw new Error(`GameData not loaded id:${this.id} ${this.code}`);
        }
        return this._data;
    }

    get isGameDataLoaded() {
        return this._data != null;
    }

    get name() {
        return this.data.name;
    }

    setGameData(data: GameDataJson) {
        this._data = data;
        this.className = data.name.replace(/ /g, '_');
    }

    getHealth(level: number) {
        return 0 * level;
        //return Util.getSingleGrowthValue(this.data.health, level,
        //    Constants.HEALTH_GROWTH);
    }

    getPlunder(level: number): PartialResourceMap {
        if (this.data.repair == null) {
            return {};
        }
        return GrowthCalculator.getResourceValues(this.data.repair, level, Constants.ResourcePlunderGrowth);
    }

    getUpgradeCost(level: number): GameResources {
        if (this.data.resources == null) {
            return new GameResources();
        }
        const resources = GrowthCalculator.getResourceValues(this.data.resources, level, Constants.ResourceCostGrowth);
        return GameResources.fromResourceType(resources);
    }

    getTotalUpgradeCost(level: number): GameResources {
        if (this.data.resources == null) {
            return new GameResources();
        }
        const totalCost = new GameResources();
        for (let i = 1; i <= level; i++) {
            const levelResources = GrowthCalculator.getResourceValues(
                this.data.resources,
                i,
                Constants.ResourceCostGrowth,
            );
            totalCost.addResources(levelResources);
        }
        return totalCost;
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
