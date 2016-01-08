import {Base} from './base';
import {Building} from './building/building';
import {BuildingType} from './building/buildingtype';
import {Tile} from './base/tile';
import * as Util from './util';
import {Constants} from './constants';

import {BaseOutput, OutputCalculator} from './production/calculator';

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

        output.cont.add(production.cont);
        output.pkg.add(production.pkg);
    }

    static getOutput(base:Base):BaseOutput {
        var output = {
            cont: new GameResources(),
            pkg: new GameResources()
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
import {GameResources} from "./game.resources";

BaseProduction.registerCalculator(HarvesterCalculator);
BaseProduction.registerCalculator(SiloCalculator);
BaseProduction.registerCalculator(PowerPlantCalculator);
BaseProduction.registerCalculator(AccumulatorCalculator);
BaseProduction.registerCalculator(RefineryCalculator);