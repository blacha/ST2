import { ModifierType } from '../../extension/@types/client.lib.const';
import { Base } from '../base';
import { BaseIter } from '../base.iter';
import { Building } from '../building/building';
import { BuildingType } from '../building/building.type';
import { GameResources } from '../game.resources';
import { GrowthCalculator } from '../growth.calculator';
import { BuildingOutput, OutputCalculator } from './calculator';

const ONE_HOUR_SECONDS = 60 * 60;
const LinkSilo = {
    buildings: [BuildingType.GDI.Silo.id, BuildingType.NOD.Silo.id],
    values: [0, 72, 90, 125, 170, 220, 275, 335, 400, 460, 530, 610, 710],
};

export const HarvesterCalculator: OutputCalculator = {
    name: 'Harvester',
    buildings: [
        BuildingType.NOD.TiberiumHarvester.id,
        BuildingType.NOD.CrystalHarvester.id,
        BuildingType.GDI.TiberiumHarvester.id,
        BuildingType.GDI.CrystalHarvester.id,
    ],

    links: {
        Silo: LinkSilo,
    },

    calculate(base: Base, x: number, y: number, building: Building): BuildingOutput {
        const outputCont = new GameResources();
        const outputPackage = new GameResources();

        const resourceType = base.getResource(x, y);
        if (resourceType == null) {
            throw new Error('Invalid resource type');
        }

        const packTimeSeconds = GrowthCalculator.getModifierValue(
            BuildingType.GDI.TiberiumHarvester.data,
            ModifierType.TiberiumBonusTimeToComplete,
            building.level,
            1,
        );
        const packAmount = GrowthCalculator.getModifierValue(
            BuildingType.GDI.TiberiumHarvester.data,
            ModifierType.TiberiumPackageSize,
            building.level,
        );
        outputPackage.addResource(resourceType, (packAmount / packTimeSeconds) * ONE_HOUR_SECONDS);

        const nearBy = BaseIter.getSurroundings(base, x, y, LinkSilo.buildings);
        if (nearBy.length > 0) {
            outputCont.addResource(resourceType, GrowthCalculator.getLinkValue(LinkSilo.values, building.level));
        }

        return {
            cont: outputCont,
            pkg: outputPackage,
        };
    },
};
