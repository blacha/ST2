import { BuildingType } from '../lib/building/building.type';
import { GameDataObject } from '../lib/data/game.data.object';
import { DefUnitType } from '../lib/unit/def.unit.type';
import { OffUnitType } from '../lib/unit/off.unit.type';
import { pad } from '../lib/util';
import * as GameJson from './game.data.json';
import { BaseProduction } from '../lib/production';
import { HarvesterCalculator } from '../lib/production/harvester';
import { SiloCalculator } from '../lib/production/silo';
import { PowerPlantCalculator } from '../lib/production/power.plant';
import { AccumulatorCalculator } from '../lib/production/accumulator';
import { RefineryCalculator } from '../lib/production/refinery';

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
    load(printMessages = false) {
        this.register();

        const units = GameJson.units;
        if (printMessages) {
            units.sort((a, b) => a.id - b.id);
        }
        for (const data of units) {
            const gameObject: GameDataObject = GameDataObject.getById(data.id);
            if (gameObject != null) {
                gameObject.setGameData(data);
            } else if (printMessages) {
                const codeName = data.name.replace(/ /g, '_');
                console.log(
                    'Missing',
                    data.faction,
                    pad(4, String(data.id)),
                    pad(30, data.display),
                    ' ',
                    ' ',
                    codeName,
                );
            }
        }
    },
};
