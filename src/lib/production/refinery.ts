import { Base } from '../base';
import { Tile } from '../base/tile';
import { Building } from '../building/building';
import { BuildingType } from '../building/building.type';
import { GameResources } from '../game.resources';
import * as Util from '../util';
import { BaseOutput, OutputCalculator } from './calculator';

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

    calculate: (base: Base, x: number, y: number, building: Building): BaseOutput => {
        const gd = building.data;
        const buildingLevel = building.level;

        // Package amount is per minute
        const packTime = Util.getModifierValue(gd, 'CreditPackageTime', buildingLevel, 1);
        const packAmount = Util.getModifierValue(gd, 'CreditPackage', buildingLevel);
        const outputPackage = new GameResources();
        outputPackage.addResource(GameResources.CREDIT, (packAmount / packTime) * 3600);

        const PowerLink = RefineryCalculator.links.PowerPlant;
        const TiberiumLink = RefineryCalculator.links.Tiberium;

        const nearBy = base.getSurroundings(x, y, PowerLink.buildings, TiberiumLink.tiles);

        const powerCont = Util.getGrowthValue(PowerLink.values, buildingLevel);
        const tibCont = Util.getGrowthValue(TiberiumLink.values, buildingLevel);

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
