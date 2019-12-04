import { Base } from './base';
import { Tile } from './base/tile';
import { Building } from './building/building';
import { GameResources } from './game.resources';
import { AccumulatorCalculator } from './production/accumulator';
import { BaseOutput, OutputCalculator } from './production/calculator';
import { HarvesterCalculator } from './production/harvester';
import { PowerPlantCalculator } from './production/power.plant';
import { RefineryCalculator } from './production/refinery';
import { SiloCalculator } from './production/silo';

export class BaseProduction {
    static BuildingMap: { [key: string]: OutputCalculator } = {};

    static registerCalculator(calculator: OutputCalculator) {
        for (const building of calculator.buildings) {
            BaseProduction.BuildingMap[building] = calculator;
        }
    }

    static getBuildingOutput(output: BaseOutput, base: Base, x: number, y: number) {
        const building = base.getBase(x, y);
        if (building == null) {
            return;
        }

        const id = building.type.id;
        const calculator = BaseProduction.BuildingMap[id];
        if (calculator == null) {
            return;
        }

        const production = calculator.calculate(base, x, y, building as Building);

        output.cont.add(production.cont);
        output.pkg.add(production.pkg);
    }

    static getOutput(base: Base): BaseOutput {
        const output: BaseOutput = {
            cont: new GameResources(),
            pkg: new GameResources(),
        };

        Base.buildingForEach((x, y) => BaseProduction.getBuildingOutput(output, base, x, y));
        return output;
    }
}

BaseProduction.registerCalculator(HarvesterCalculator);
BaseProduction.registerCalculator(SiloCalculator);
BaseProduction.registerCalculator(PowerPlantCalculator);
BaseProduction.registerCalculator(AccumulatorCalculator);
BaseProduction.registerCalculator(RefineryCalculator);
