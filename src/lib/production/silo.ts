import { Base } from '../base';
import { BaseIter } from '../base.iter';
import { Tile } from '../base/tile';
import { Building } from '../building/building';
import { BuildingType } from '../building/building.type';
import { GameResources } from '../game.resources';
import { GrowthCalculator } from '../growth.calculator';
import { BuildingOutput, OutputCalculator } from './calculator';

export const SiloCalculator: OutputCalculator = {
    name: 'Silo',
    buildings: [BuildingType.NOD.Silo.id, BuildingType.GDI.Silo.id],

    links: {
        Harvester: {
            buildings: [
                BuildingType.GDI.TiberiumHarvester.id,
                BuildingType.GDI.CrystalHarvester.id,
                BuildingType.NOD.TiberiumHarvester.id,
                BuildingType.NOD.CrystalHarvester.id,
            ],
            values: [0, 72, 90, 125, 170, 220, 275, 335, 400, 460, 530, 610, 710],
        },
    },

    calculate(base: Base, x: number, y: number, building: Building): BuildingOutput {
        const outputCont = new GameResources();
        const outputPackage = new GameResources();

        const HarvesterLink = SiloCalculator.links.Harvester;
        const nearBy = BaseIter.getSurroundings(base, x, y, HarvesterLink.buildings);
        const perHarvester = GrowthCalculator.getLinkValue(HarvesterLink.values, building.level);
        for (const nearBuilding of nearBy) {
            const tile = base.getTile(nearBuilding.x, nearBuilding.y);
            if (tile === Tile.Tiberium) {
                outputCont.addResource(GameResources.TIBERIUM, perHarvester);
            } else if (tile === Tile.Crystal) {
                outputCont.addResource(GameResources.CRYSTAL, perHarvester);
            }
        }

        return {
            cont: outputCont,
            pkg: outputPackage,
        };
    },
};
