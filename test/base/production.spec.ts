
import * as o from 'ospec';
import 'source-map-support/register';
import { GameData } from '../../src/data/loader';
import { Base } from '../../src/lib/base';
import { Tile } from '../../src/lib/base/tile';
import { Building } from '../../src/lib/building/building';
import { BuildingType } from '../../src/lib/building/building.type';
import { GameResource, GameResources } from "../../src/lib/game.resources";
import { BaseProduction } from '../../src/lib/production';
import { BaseOutput } from '../../src/lib/production/calculator';

GameData.load();

function printBase(base: Base) {
    Base.buildingForEach((x, y) => {
        if (y == 0) {
            process.stdout.write('\n')
        }
        const building = base.getBase(x, y)
        if (building) {
            // const res = base.getTile(x, y);
            process.stdout.write(`${building.level}`.padStart(3, ' ') + building.type.codeName);
        } else {
            const res = base.getTile(x, y);
            process.stdout.write(res.code.padStart(4, ' '));
        }
    })
}


o.spec('BasePlunder', () => {
    o('should plunder buildings', () => {
        const plunder = new Building(BuildingType.Forgotten.Silo, 13).getPlunder();
        o(Math.floor(plunder.crystal!)).equals(3685);
        o(Math.floor(plunder.tiberium!)).equals(3685);

        const plunderB = new Building(BuildingType.Forgotten.TiberiumHarvester, 13).getPlunder();
        o(Math.floor(plunderB.tiberium || 0)).equals(7229);
        o(plunderB.crystal).equals(undefined);

        const plunderC = new Building(BuildingType.Forgotten.CrystalHarvester, 13).getPlunder();
        o(Math.floor(plunderC.crystal!)).equals(7229);
        o(plunderC.tiberium).equals(undefined);

        const plunderD = new Building(BuildingType.Forgotten.ConstructionYard, 13).getPlunder();
        o(plunderD.crystal).equals(undefined);
        o(plunderD.tiberium).equals(2520);
    });
});

o.spec('BaseCost', () => {
    var base: Base;

    o.beforeEach(() => {
        base = new Base();
    });

    o('should get upgrade cost', () => {
        // silo : 15, 11,478
        // harv : 15, 11,478
        var building = new Building(BuildingType.GDI.Refinery, 15);
        var cost = building.getUpgradeCost();
        // console.log('cost', cost);
    });
});


function getTotal(output: BaseOutput, key: GameResource) {
    return output.pkg[key] + output.cont[key];
}
o.spec('BaseProduction', () => {

    var base: Base;

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
            var output = BaseProduction.getOutput(base);

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

            var output = BaseProduction.getOutput(base);
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

            var output = BaseProduction.getOutput(base);

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

            var output = BaseProduction.getOutput(base);

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

            var output = BaseProduction.getOutput(base);

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

            var output = BaseProduction.getOutput(base);

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

            var output = BaseProduction.getOutput(base);

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

            var output = BaseProduction.getOutput(base);
            o(output.cont.power).equals(0);
            o(output.pkg.power.toFixed(0)).equals("4448");

            o(getTotal(output, GameResources.CREDIT)).equals(0);
            o(getTotal(output, GameResources.CRYSTAL)).equals(0);
            o(getTotal(output, GameResources.TIBERIUM)).equals(0);
        });

        o('should produce cont power from crystal ', () => {
            base.setBase(1, 5, new Building(BuildingType.GDI.PowerPlant, 12));
            base.setBase(1, 6, new Building(BuildingType.GDI.PowerPlant, 13));
            base.setBase(1, 7, new Building(BuildingType.GDI.PowerPlant, 14));

            var output = BaseProduction.getOutput(base);
            o(output.cont.power).equals(5147.5);
            o(output.pkg.power.toFixed(0)).equals("4448");

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

            var output = BaseProduction.getOutput(base);
            o(output.cont.power.toFixed(0)).equals("6796");
            o(output.pkg.power.toFixed(0)).equals("4448");

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

            var output = BaseProduction.getOutput(base);
            o(output.cont.power.toFixed(0)).equals("11943");
            o(output.pkg.power.toFixed(0)).equals("4448");

            o(getTotal(output, GameResources.CREDIT)).equals(0);
            o(getTotal(output, GameResources.CRYSTAL)).equals(0);
            o(getTotal(output, GameResources.TIBERIUM)).equals(0);
        });
    });

});
