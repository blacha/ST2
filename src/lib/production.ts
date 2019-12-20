import { Base } from './base';
import { Building } from './building/building';
import { GameResources } from './game.resources';
import { BaseOutput, OutputCalculator } from './production/calculator';

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
            total: new GameResources(),
            alliance: base.poi.clone(),
        };

        Base.buildingForEach((x, y) => BaseProduction.getBuildingOutput(output, base, x, y));
        output.total.add(output.cont);
        output.total.add(output.pkg);
        output.total.add(output.alliance);
        return output;
    }
}
