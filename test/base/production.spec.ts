declare function require(name:string);
require('source-map-support').install();


import {BaseProduction} from '../../src/lib/production';
import {Base} from '../../src/lib/base';
import {Tile} from '../../src/lib/base/tile';

import * as Util from '../../src/lib/util';

import {DUnitType} from '../../src/lib/unit/dunittype';
import {OUnitType} from '../../src/lib/unit/ounittype';
import {BuildingType} from '../../src/lib/building/buildingtype';
import {Building} from '../../src/lib/building/building';

Util.createTechMap(DUnitType);
Util.createTechMap(OUnitType);
Util.createTechMap(BuildingType);
Util.loadGameData(false);

var base = new Base();

base.setTile(0, 1, Tile.Tiberium);
base.setTile(0, 2, Tile.Tiberium);
base.setTile(0, 3, Tile.Tiberium);

base.setTile(0, 5, Tile.Tiberium);
base.setTile(0, 6, Tile.Tiberium);
base.setTile(0, 7, Tile.Tiberium);

//base.setTile(2, 1, Tile.Crystal);
//base.setTile(2, 2, Tile.Crystal);
//base.setTile(2, 3, Tile.Crystal);


base.setBase(0, 1, new Building(BuildingType.GDI.TiberiumHarvester, 12));
base.setBase(0, 2, new Building(BuildingType.GDI.TiberiumHarvester, 13));
base.setBase(0, 3, new Building(BuildingType.GDI.TiberiumHarvester, 14));

base.setBase(1, 1, new Building(BuildingType.GDI.Silo, 12));
base.setBase(1, 2, new Building(BuildingType.GDI.Silo, 13));
base.setBase(1, 3, new Building(BuildingType.GDI.Silo, 14));

base.setBase(1, 5, new Building(BuildingType.GDI.Refinery, 12));
base.setBase(1, 6, new Building(BuildingType.GDI.Refinery, 13));
base.setBase(1, 7, new Building(BuildingType.GDI.Refinery, 14));

base.setBase(2, 1, new Building(BuildingType.GDI.TiberiumHarvester, 12));
base.setBase(2, 2, new Building(BuildingType.GDI.TiberiumHarvester, 13));
base.setBase(2, 3, new Building(BuildingType.GDI.TiberiumHarvester, 14));

base.setBase(3, 1, new Building(BuildingType.GDI.PowerPlant, 12));
//base.setBase(3, 2, new Building(BuildingType.GDI.PowerPlant, 13));
//base.setBase(3, 3, new Building(BuildingType.GDI.PowerPlant, 14));

base.setBase(4, 1, new Building(BuildingType.GDI.Accumulator, 12));
base.setBase(4, 2, new Building(BuildingType.GDI.Accumulator, 13));
//base.setBase(4, 3, new Building(BuildingType.GDI.Accumulator, 14));


console.log(base.toString());
var output = BaseProduction.getOutput(base);

console.log('tiberium', Util.formatNumber(output.tiberium.pkg), Util.formatNumber(output.tiberium.cont));
console.log('crystal', Util.formatNumber(output.crystal.pkg), Util.formatNumber(output.crystal.cont));
console.log('power', Util.formatNumber(output.power.pkg), Util.formatNumber(output.power.cont));
