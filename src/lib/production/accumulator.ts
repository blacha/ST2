import { Base } from '../base';
import { Building } from '../building/building';
import { BuildingType } from '../building/building.type';
import { GameResources } from '../game.resources';
import * as Util from '../util';
import { BaseOutput, OutputCalculator } from './calculator';

export var AccumulatorCalculator: OutputCalculator = {
    name: 'Accumulator',

    buildings: [BuildingType.NOD.Accumulator.id, BuildingType.GDI.Accumulator.id],

    links: {
        PowerPlant: {
            buildings: [BuildingType.GDI.PowerPlant.id, BuildingType.NOD.PowerPlant.id],
            values: [0, 48, 60, 80, 110, 145, 185, 225, 265, 310, 355, 405, 465],
        },
    },

    calculate: (base: Base, x: number, y: number, building: Building): BaseOutput => {
        const outputCont = new GameResources();
        const outputPackage = new GameResources();

        const PowerPlantLink = AccumulatorCalculator.links.PowerPlant;
        const nearBy = base.getSurroundings(x, y, PowerPlantLink.buildings);

        outputCont.addResource(
            GameResources.POWER,
            nearBy.length * Util.getGrowthValue(PowerPlantLink.values, building.level),
        );

        return {
            cont: outputCont,
            pkg: outputPackage,
        };
    },
};
