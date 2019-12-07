import * as o from 'ospec';
import 'source-map-support/register';
import { GameData } from '../../data/loader';
import { Base } from '../base';
import { Tile } from '../base/tile';
import { Building } from '../building/building';
import { BuildingType } from '../building/building.type';
import { GameResource, GameResources } from '../game.resources';
import { BaseProduction } from '../production';
import { BaseOutput } from '../production/calculator';

GameData.load();

function getTotal(output: BaseOutput, key: GameResource) {
    return output.pkg[key] + output.cont[key];
}
o.spec('BaseProduction', () => {
    let base: Base;

    o.beforeEach(() => {
        base = new Base();
        base.setTile(0, 1, Tile.Tiberium);
        base.setTile(0, 2, Tile.Tiberium);
        base.setTile(0, 3, Tile.Tiberium);

        base.setTile(0, 5, Tile.Crystal);
        base.setTile(0, 6, Tile.Crystal);
        base.setTile(0, 7, Tile.Crystal);
    });

    o.spec('credit', () => {
        o('should produce from Refinery', () => {
            base.setBase(5, 1, new Building(BuildingType.GDI.Refinery, 12));
            base.setBase(5, 2, new Building(BuildingType.GDI.Refinery, 13));
            base.setBase(5, 3, new Building(BuildingType.GDI.Refinery, 14));
            const output = BaseProduction.getOutput(base);

            o(output.pkg.credits).equals(4117.5);
            o(output.cont.credits).equals(0);
            o(getTotal(output, GameResources.POWER)).equals(0);
            o(getTotal(output, GameResources.CRYSTAL)).equals(0);
            o(getTotal(output, GameResources.TIBERIUM)).equals(0);
        });

        o('should produce from tiberium', () => {
            base.setBase(1, 1, new Building(BuildingType.GDI.Refinery, 12));
            base.setBase(1, 2, new Building(BuildingType.GDI.Refinery, 13));
            base.setBase(1, 3, new Building(BuildingType.GDI.Refinery, 14));

            const output = BaseProduction.getOutput(base);
            o(output.pkg.credits).equals(4117.5);
            o(output.cont.credits).equals(4792.5);
            o(getTotal(output, GameResources.POWER)).equals(0);
            o(getTotal(output, GameResources.CRYSTAL)).equals(0);
            o(getTotal(output, GameResources.TIBERIUM)).equals(0);
        });

        o('should produce from power plants', () => {
            base.setBase(3, 1, new Building(BuildingType.GDI.Refinery, 12));
            base.setBase(3, 2, new Building(BuildingType.GDI.Refinery, 13));
            base.setBase(3, 3, new Building(BuildingType.GDI.Refinery, 14));

            base.setBase(2, 1, new Building(BuildingType.GDI.PowerPlant, 12));
            base.setBase(2, 2, new Building(BuildingType.GDI.PowerPlant, 13));
            base.setBase(2, 3, new Building(BuildingType.GDI.PowerPlant, 14));

            const output = BaseProduction.getOutput(base);

            o(output.cont.credits).equals(6294.375);
            o(output.pkg.credits).equals(4117.5);

            o(output.cont.power).equals(0);
            o(output.pkg.power).equals(4447.916666666666);

            o(getTotal(output, GameResources.CRYSTAL)).equals(0);
            o(getTotal(output, GameResources.TIBERIUM)).equals(0);
        });
    });

    o.spec('tiberium', () => {
        o('should produce from harvesters', () => {
            base.setBase(0, 1, new Building(BuildingType.GDI.TiberiumHarvester, 12));
            base.setBase(0, 2, new Building(BuildingType.GDI.TiberiumHarvester, 13));
            base.setBase(0, 3, new Building(BuildingType.GDI.TiberiumHarvester, 14));

            const output = BaseProduction.getOutput(base);

            o(getTotal(output, GameResources.CREDIT)).equals(0);
            o(getTotal(output, GameResources.POWER)).equals(0);
            o(getTotal(output, GameResources.CRYSTAL)).equals(0);

            o(output.cont.tiberium).equals(0);
            o(output.pkg.tiberium).equals(8997.5);
        });

        o('should produce from silos', () => {
            base.setBase(0, 1, new Building(BuildingType.GDI.TiberiumHarvester, 12));
            base.setBase(0, 2, new Building(BuildingType.GDI.TiberiumHarvester, 13));
            base.setBase(0, 3, new Building(BuildingType.GDI.TiberiumHarvester, 14));

            base.setBase(1, 1, new Building(BuildingType.GDI.Silo, 12));
            base.setBase(1, 2, new Building(BuildingType.GDI.Silo, 13));
            base.setBase(1, 3, new Building(BuildingType.GDI.Silo, 14));

            const output = BaseProduction.getOutput(base);

            o(getTotal(output, GameResources.CREDIT)).equals(0);
            o(getTotal(output, GameResources.POWER)).equals(0);
            o(getTotal(output, GameResources.CRYSTAL)).equals(0);
            o(output.cont.tiberium).equals(9008.125);
            o(output.pkg.tiberium).equals(8997.5);
        });
    });

    o.spec('crystal', () => {
        o('should produce from harvesters', () => {
            base.setBase(0, 5, new Building(BuildingType.GDI.TiberiumHarvester, 12));
            base.setBase(0, 6, new Building(BuildingType.GDI.TiberiumHarvester, 13));
            base.setBase(0, 7, new Building(BuildingType.GDI.TiberiumHarvester, 14));

            const output = BaseProduction.getOutput(base);

            o(getTotal(output, GameResources.CREDIT)).equals(0);
            o(getTotal(output, GameResources.POWER)).equals(0);
            o(getTotal(output, GameResources.TIBERIUM)).equals(0);

            o(output.cont.crystal).equals(0);
            o(output.pkg.crystal).equals(8997.5);
        });

        o('should produce from silos', () => {
            base.setBase(0, 5, new Building(BuildingType.GDI.TiberiumHarvester, 12));
            base.setBase(0, 6, new Building(BuildingType.GDI.TiberiumHarvester, 13));
            base.setBase(0, 7, new Building(BuildingType.GDI.TiberiumHarvester, 14));

            base.setBase(1, 5, new Building(BuildingType.GDI.Silo, 12));
            base.setBase(1, 6, new Building(BuildingType.GDI.Silo, 13));
            base.setBase(1, 7, new Building(BuildingType.GDI.Silo, 14));

            const output = BaseProduction.getOutput(base);

            o(getTotal(output, GameResources.CREDIT)).equals(0);
            o(getTotal(output, GameResources.POWER)).equals(0);
            o(getTotal(output, GameResources.TIBERIUM)).equals(0);

            o(output.cont.crystal).equals(9008.125);
            o(output.pkg.crystal).equals(8997.5);
        });
    });

    o.spec('power', () => {
        o('should produce from power plants', () => {
            base.setBase(3, 1, new Building(BuildingType.GDI.PowerPlant, 12));
            base.setBase(3, 2, new Building(BuildingType.GDI.PowerPlant, 13));
            base.setBase(3, 3, new Building(BuildingType.GDI.PowerPlant, 14));

            const output = BaseProduction.getOutput(base);
            o(output.cont.power).equals(0);
            o(output.pkg.power.toFixed(0)).equals('4448');

            o(getTotal(output, GameResources.CREDIT)).equals(0);
            o(getTotal(output, GameResources.CRYSTAL)).equals(0);
            o(getTotal(output, GameResources.TIBERIUM)).equals(0);
        });

        o('should produce cont power from crystal ', () => {
            base.setBase(1, 5, new Building(BuildingType.GDI.PowerPlant, 12));
            base.setBase(1, 6, new Building(BuildingType.GDI.PowerPlant, 13));
            base.setBase(1, 7, new Building(BuildingType.GDI.PowerPlant, 14));

            const output = BaseProduction.getOutput(base);
            o(output.cont.power).equals(5147.5);
            o(output.pkg.power.toFixed(0)).equals('4448');

            o(getTotal(output, GameResources.CREDIT)).equals(0);
            o(getTotal(output, GameResources.CRYSTAL)).equals(0);
            o(getTotal(output, GameResources.TIBERIUM)).equals(0);
        });

        o('should produce cont power from accumulators ', () => {
            base.setBase(3, 5, new Building(BuildingType.GDI.PowerPlant, 12));
            base.setBase(3, 6, new Building(BuildingType.GDI.PowerPlant, 13));
            base.setBase(3, 7, new Building(BuildingType.GDI.PowerPlant, 14));

            base.setBase(4, 5, new Building(BuildingType.GDI.Accumulator, 12));
            base.setBase(4, 6, new Building(BuildingType.GDI.Accumulator, 13));
            base.setBase(4, 7, new Building(BuildingType.GDI.Accumulator, 14));

            const output = BaseProduction.getOutput(base);
            o(output.cont.power.toFixed(0)).equals('6796');
            o(output.pkg.power.toFixed(0)).equals('4448');

            o(getTotal(output, GameResources.CREDIT)).equals(0);
            o(getTotal(output, GameResources.CRYSTAL)).equals(0);
            o(getTotal(output, GameResources.TIBERIUM)).equals(0);
        });

        o('should produce power from crystal and accumulators', () => {
            base.setBase(1, 5, new Building(BuildingType.GDI.PowerPlant, 12));
            base.setBase(1, 6, new Building(BuildingType.GDI.PowerPlant, 13));
            base.setBase(1, 7, new Building(BuildingType.GDI.PowerPlant, 14));

            base.setBase(2, 5, new Building(BuildingType.GDI.Accumulator, 12));
            base.setBase(2, 6, new Building(BuildingType.GDI.Accumulator, 13));
            base.setBase(2, 7, new Building(BuildingType.GDI.Accumulator, 14));

            const output = BaseProduction.getOutput(base);
            o(output.cont.power.toFixed(0)).equals('11943');
            o(output.pkg.power.toFixed(0)).equals('4448');

            o(getTotal(output, GameResources.CREDIT)).equals(0);
            o(getTotal(output, GameResources.CRYSTAL)).equals(0);
            o(getTotal(output, GameResources.TIBERIUM)).equals(0);
        });
    });
});
