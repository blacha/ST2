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

base.setTile(1, 1, Tile.Tiberium);
base.setTile(1, 2, Tile.Tiberium);
base.setTile(1, 3, Tile.Tiberium);

base.setBase(1, 1, new Building(BuildingType.GDI.TiberiumHarvester, 1));
base.setBase(1, 2, new Building(BuildingType.GDI.TiberiumHarvester, 2));
base.setBase(1, 3, new Building(BuildingType.GDI.TiberiumHarvester, 3));
base.setBase(1, 0, new Building(BuildingType.GDI.Silo, 1));


console.log(base.toString());
var output = BaseProduction.getOutput(base);

console.log('output', output);
