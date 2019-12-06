import { Base } from '../base';
import { BaseIter } from '../base.iter';
import { Tile } from '../base/tile';
import { Building } from '../building/building';
import { BuildingType } from '../building/building.type';
import { GameResources } from '../game.resources';
import * as Util from '../util';
import { BaseOutput, OutputCalculator, BuildingOutput } from './calculator';
import { ModifierType } from '../../extension/@types/client.lib.const';
import { GrowthCalculator } from '../growth.calculator';

const LinkAccumulator = {
    buildings: [BuildingType.GDI.Accumulator.id, BuildingType.NOD.Accumulator.id],
    values: [0, 72, 90, 120, 160, 215, 275, 335, 400, 460, 530, 610, 700],
};
const LinkRefinery = {
    buildings: [BuildingType.GDI.Refinery.id, BuildingType.NOD.Refinery.id],
    values: [0, 48, 60, 75, 100, 125, 160, 195, 230, 270, 315, 370, 430],
};
const LinkCrystal = {
    tiles: [Tile.Crystal],
    values: [0, 60, 75, 100, 135, 180, 230, 280, 330, 380, 440, 500, 580],
};

export const PowerPlantCalculator: OutputCalculator = {
    name: 'PowerPlant',
    buildings: [BuildingType.NOD.PowerPlant.id, BuildingType.GDI.PowerPlant.id],

    links: {
        Accumulator: LinkAccumulator,
        Refinery: LinkRefinery,
        Crystal: LinkCrystal,
    },

    calculate(base: Base, x: number, y: number, building: Building): BuildingOutput {
        const outputCont = new GameResources();
        const outputPackage = new GameResources();

        const gd = building.type.data;
        const packTime = GrowthCalculator.getModifierValue(
            gd,
            ModifierType.PowerBonusTimeToComplete,
            building.level,
            1,
        );
        const packAmount = GrowthCalculator.getModifierValue(gd, ModifierType.PowerPackageSize, building.level);
        outputPackage.addResource(GameResources.POWER, (packAmount / packTime) * 3600);

        const nearBy = BaseIter.getSurroundings(
            base,
            x,
            y,
            LinkAccumulator.buildings.concat(LinkRefinery.buildings),
            LinkCrystal.tiles,
        );
        const accumulatorBonus = GrowthCalculator.getLinkValue(LinkAccumulator.values, building.level);
        const crystalBonus = GrowthCalculator.getLinkValue(LinkCrystal.values, building.level);
        const creditBonus = GrowthCalculator.getLinkValue(LinkRefinery.values, building.level);

        let firstAccumulator = true;
        for (let i = 0; i < nearBy.length; i++) {
            const near = nearBy[i];

            if (near.tile === Tile.Crystal) {
                outputCont.addResource(GameResources.POWER, crystalBonus);
                continue;
            }

            if (near.building == null) {
                continue;
            }

            if (LinkRefinery.buildings.indexOf(near.building.type.id) > -1) {
                outputCont.addResource(GameResources.CREDIT, creditBonus);
                continue;
            }

            // only the first accumulator matters
            if (firstAccumulator) {
                firstAccumulator = false;
                outputCont.addResource(GameResources.POWER, accumulatorBonus);
            }
        }

        return {
            cont: outputCont,
            pkg: outputPackage,
        };
    },
};
