import { ModifierType } from '../../extension/@types/client.lib.const';
import { Base } from '../base/base';
import { BaseIter } from '../base/base.iter';
import { Tile } from '../base/tile';
import { Building } from '../building/building';
import { BuildingType } from '../building/building.type';
import { GameResources } from '../game.resources';
import { GrowthCalculator } from '../growth.calculator';
import { BuildingOutput, OutputCalculator } from './calculator';

export const RefineryCalculator: OutputCalculator = {
    name: 'Refinery',
    buildings: [BuildingType.NOD.Refinery.id, BuildingType.GDI.Refinery.id],

    links: {
        PowerPlant: {
            buildings: [BuildingType.GDI.PowerPlant.id, BuildingType.NOD.PowerPlant.id],
            values: [0, 72, 90, 110, 145, 190, 240, 290, 345, 410, 475, 555, 650],
        },
        Tiberium: {
            tiles: [Tile.Tiberium],
            values: [0, 60, 75, 90, 120, 160, 200, 240, 290, 340, 400, 460, 540],
        },
    },

    calculate: (base: Base, x: number, y: number, building: Building): BuildingOutput => {
        const gd = building.data;
        const buildingLevel = building.level;

        // Package amount is per minute
        const packTime = GrowthCalculator.getModifierValue(
            gd,
            ModifierType.CreditsBonusTimeToComplete,
            building.level,
            1,
        );
        const packAmount = GrowthCalculator.getModifierValue(gd, ModifierType.CreditsPackageSize, building.level);
        const outputPackage = new GameResources();
        outputPackage.addResource(GameResources.CREDIT, (packAmount / packTime) * 3600);

        const PowerLink = RefineryCalculator.links.PowerPlant;
        const TiberiumLink = RefineryCalculator.links.Tiberium;

        const nearBy = BaseIter.getSurroundings(base, x, y, PowerLink.buildings, TiberiumLink.tiles);

        const powerCont = GrowthCalculator.getLinkValue(PowerLink.values, buildingLevel);
        const tibCont = GrowthCalculator.getLinkValue(TiberiumLink.values, buildingLevel);

        const outputCont = new GameResources();
        let firstPower = true;
        for (const nearBuilding of nearBy) {
            if (nearBuilding.tile === Tile.Tiberium) {
                outputCont.addResource(GameResources.CREDIT, tibCont);
                continue;
            }

            if (firstPower) {
                firstPower = false;
                outputCont.addResource(GameResources.CREDIT, powerCont);
            }
        }

        return {
            cont: outputCont,
            pkg: outputPackage,
        };
    },
};
