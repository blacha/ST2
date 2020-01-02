import { BuildingType } from '../game/building/building.type';
import { GameDataObject } from '../game/data/game.data.object';
import { BaseProduction } from '../game/production';
import { AccumulatorCalculator } from '../game/production/accumulator';
import { HarvesterCalculator } from '../game/production/harvester';
import { PowerPlantCalculator } from '../game/production/power.plant';
import { RefineryCalculator } from '../game/production/refinery';
import { SiloCalculator } from '../game/production/silo';
import { DefUnitType } from '../game/unit/def.unit.type';
import { OffUnitType } from '../game/unit/off.unit.type';
import * as GameJson from './game.data.json';

export const GameObjects = [DefUnitType, OffUnitType, BuildingType];

export const GameData = {
    register() {
        BaseProduction.registerCalculator(HarvesterCalculator);
        BaseProduction.registerCalculator(SiloCalculator);
        BaseProduction.registerCalculator(PowerPlantCalculator);
        BaseProduction.registerCalculator(AccumulatorCalculator);
        BaseProduction.registerCalculator(RefineryCalculator);
    },
    /** Load the raw json game data into useful objects */
    load() {
        this.register();

        const units = GameJson.units;
        for (const data of units) {
            if (!GameDataObject.hasGameObject(data.id)) {
                continue;
            }
            const gameObject: GameDataObject = GameDataObject.getById(data.id);
            gameObject.setGameData(data);
        }
    },
};
