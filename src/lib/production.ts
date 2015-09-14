import {Base} from './base';
import {Building} from './building/building';
import {Tile} from './base/tile';
import * as Util from './util';
import {Constants} from './constants';

interface RawProduction {
    continuous: number;
    pacakage: number;
}

interface BaseOutput {
    tiberium: RawProduction;
    crystal: RawProduction;
    power: RawProduction;
    credit: RawProduction;
}

export class BaseProduction {
    static getOutput(base:Base) {
        var tiberium = [];
        base.buildingsForEach(function (x, y, building, tile, base) {
            if (building == null) {
                return;
            }

            if (building.getClassName() === 'harvester' && tile == Tile.Tiberium) {
                tiberium.push(building);
            }
        });


        console.log(tiberium);

        return tiberium.map(function (building:Building) {
            var GD = building.getGameData();
            var output = BaseProduction.getProductionValue(building);
        })
    }

    static getProductionValue(building:Building) {
        var tiberium = [];
        var gd = building.getGameData();

        var modifiers = gd.modifiers;
        var maxMod = modifiers[modifiers.length - 1];
        if (maxMod.TiberiumContinous == null) {
            return 0;
        }

        var outputCont = Util.getSingleGrowthValue(maxMod.TiberiumContinous,
            building.getLevel(),
            Constants.RESOURCE_PRODUCTION_GROWTH);

        var outputPack = Util.getSingleGrowthValue(maxMod.TiberiumPackage,
            building.getLevel(),
            Constants.RESOURCE_PRODUCTION_GROWTH);
        console.log('tib-output', building.getLevel(), outputCont, outputPack);
        return null;
    }
}