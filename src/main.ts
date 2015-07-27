import * as Util from './lib/util';

import {DUnitType} from './lib/unit/dunittype';
import {OUnitType} from './lib/unit/ounittype';
import {BuildingType} from './lib/building/buildingtype';

function init() {
    Util.createTechMap(DUnitType);
    Util.createTechMap(OUnitType);
    Util.createTechMap(BuildingType);
    Util.loadGameData(true);
}


init();
