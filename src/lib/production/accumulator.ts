import { Base } from '../base';
import { BaseIter } from '../base.iter';
import { Building } from '../building/building';
import { BuildingType } from '../building/building.type';
import { GameResources } from '../game.resources';
import { GrowthCalculator } from '../growth.calculator';
import { BuildingOutput, OutputCalculator } from './calculator';

export const AccumulatorCalculator: OutputCalculator = {
    name: 'Accumulator',

    buildings: [BuildingType.NOD.Accumulator.id, BuildingType.GDI.Accumulator.id],

    links: {
        PowerPlant: {
            buildings: [BuildingType.GDI.PowerPlant.id, BuildingType.NOD.PowerPlant.id],
            values: [0, 48, 60, 80, 110, 145, 185, 225, 265, 310, 355, 405, 465],
        },
    },

    calculate: (base: Base, x: number, y: number, building: Building): BuildingOutput => {
        const outputCont = new GameResources();
        const outputPackage = new GameResources();

        const PowerPlantLink = AccumulatorCalculator.links.PowerPlant;
        const nearBy = BaseIter.getSurroundings(base, x, y, PowerPlantLink.buildings);

        outputCont.addResource(
            GameResources.POWER,
            nearBy.length * GrowthCalculator.getLinkValue(PowerPlantLink.values, building.level),
        );

        return {
            cont: outputCont,
            pkg: outputPackage,
        };
    },
};
