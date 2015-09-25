import {Base} from './base';
import {Building} from './building/building';
import {BuildingType} from './building/buildingtype';
import {Tile} from './base/tile';
import * as Util from './util';
import {Constants} from './constants';

import {BaseOutput, RawProduction, OutputCalculator} from './production/calculator';

export class BaseProduction {
    static BuildingMap:{[key:string] : OutputCalculator} = {}

    static registerCalculator(calculator:OutputCalculator) {
        calculator.buildings.forEach(function (building) {
            BaseProduction.BuildingMap[building] = calculator;
        });
    }

    static getBuildingOutput(output:BaseOutput, x:number, y:number, building:Building, tile:Tile, base:Base) {
        if (building == null) {
            return;
        }

        var id = building.getID();

        var calculator = BaseProduction.BuildingMap[id];
        if (calculator == null) {
            return;
        }

        var production = calculator.calculate(base, x, y, building);

        if (production.tiberium) {
            output.tiberium.cont += production.tiberium.cont;
            output.tiberium.pkg += production.tiberium.pkg;
        }
        if (production.crystal) {
            output.crystal.cont += production.crystal.cont;
            output.crystal.pkg += production.crystal.pkg;
        }

        if (production.credit) {
            output.credit.cont += production.credit.cont;
            output.credit.pkg += production.credit.pkg;
        }
        if (production.power) {
            output.power.cont += production.power.cont;
            output.power.pkg += production.power.pkg;
        }
    }

    static getOutput(base:Base):BaseOutput {
        var output = {
            tiberium: {
                cont: 0,
                pkg: 0
            },
            crystal: {
                cont: 0,
                pkg: 0
            },
            credit: {
                cont: 0,
                pkg: 0
            },
            power: {
                cont: 0,
                pkg: 0
            }
        };

        base.buildingsForEach(BaseProduction.getBuildingOutput.bind(null, output));
        return output;
    }


}


import {HarvesterCalculator} from './production/harvester';
import {SiloCalculator} from './production/silo';
import {PowerPlantCalculator} from './production/powerplant';
import {AccumulatorCalculator} from './production/accumulator';
import {RefineryCalculator} from './production/refinery';

BaseProduction.registerCalculator(HarvesterCalculator);
BaseProduction.registerCalculator(SiloCalculator);
BaseProduction.registerCalculator(PowerPlantCalculator);
BaseProduction.registerCalculator(AccumulatorCalculator);
BaseProduction.registerCalculator(RefineryCalculator);