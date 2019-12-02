import { GameData } from './data/loader';
import { Base } from './lib/base';
import { Tile } from './lib/base/tile';
import { Building } from './lib/building/building';
import { BuildingType } from './lib/building/building.type';
import { BaseProduction } from './lib/production';
import { GameResources } from './lib/game.resources';
import { pad, formatNumber } from './lib/util';

console.time('Loading');
GameData.load(false);
console.timeEnd('Loading');
console.log('Loaded');

const base = new Base();

base.setTile(0, 1, Tile.Tiberium);
base.setTile(0, 2, Tile.Tiberium);
base.setTile(0, 3, Tile.Tiberium);

base.setTile(0, 5, Tile.Crystal);
base.setTile(0, 6, Tile.Crystal);
base.setTile(0, 7, Tile.Crystal);

base.setTile(2, 1, Tile.Tiberium);
base.setTile(2, 2, Tile.Tiberium);
base.setTile(2, 3, Tile.Tiberium);

base.setBase(0, 1, new Building(BuildingType.GDI.TiberiumHarvester, 1));
base.setBase(0, 2, new Building(BuildingType.GDI.TiberiumHarvester, 1));
// base.setBase(0, 3, new Building(BuildingType.GDI.TiberiumHarvester, 1));

const l50 = new Building(BuildingType.GDI.Silo, 50);
console.log(l50.getTotalUpgradeCost());
base.setBase(1, 1, new Building(BuildingType.GDI.Silo, 1));
base.setBase(1, 2, new Building(BuildingType.GDI.Silo, 50));
base.setBase(1, 3, new Building(BuildingType.GDI.Silo, 1));

// base.setBase(1, 5, new Building(BuildingType.GDI.Refinery, 12));
// base.setBase(1, 6, new Building(BuildingType.GDI.Refinery, 13));
// base.setBase(1, 7, new Building(BuildingType.GDI.Refinery, 14));

base.setBase(2, 1, new Building(BuildingType.GDI.TiberiumHarvester, 1));
base.setBase(2, 2, new Building(BuildingType.GDI.TiberiumHarvester, 1));
base.setBase(2, 3, new Building(BuildingType.GDI.TiberiumHarvester, 1));

// base.setBase(3, 1, new Building(BuildingType.GDI.PowerPlant, 12));
// base.setBase(3, 2, new Building(BuildingType.GDI.PowerPlant, 13));
// base.setBase(3, 3, new Building(BuildingType.GDI.PowerPlant, 14));

// Power plant for Refinery
//base.setBase(2, 6, new Building(BuildingType.GDI.PowerPlant, 14));
//
//base.setBase(4, 1, new Building(BuildingType.GDI.Accumulator, 12));
//base.setBase(4, 2, new Building(BuildingType.GDI.Accumulator, 13));
//base.setBase(4, 3, new Building(BuildingType.GDI.Accumulator, 14));

const output = BaseProduction.getOutput(base);
console.log(output);

[GameResources.TIBERIUM, GameResources.CRYSTAL, GameResources.POWER, GameResources.CREDIT].forEach(key => {
    console.log(
        key.padEnd(10, ' '),
        pad(5, formatNumber(output.pkg[key])),
        pad(5, formatNumber(output.cont[key])),
        pad(5, formatNumber(output.pkg[key] + output.cont[key])),
    );
});
