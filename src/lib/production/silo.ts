import {OutputCalculator, BaseOutput} from './calculator';
import {BuildingType} from '../building/buildingtype';
import {Base} from '../base';
import {Building} from '../building/building';

import {Tile} from '../base/tile';
import * as Util from '../util';

export var SiloCalculator:OutputCalculator = {
    name: 'Silo',
    buildings: [
        BuildingType.NOD.Silo.getID(),
        BuildingType.GDI.Silo.getID(),
    ],

    links: {
        Harvester: {
            buildings: [
                BuildingType.GDI.TiberiumHarvester.getID(),
                BuildingType.NOD.TiberiumHarvester.getID()
            ],
            values: [0, 72, 90, 125, 170, 220, 275, 335, 400, 460, 530, 610, 710]
        }
    },

    calculate(base:Base, x:number, y:number, building:Building):BaseOutput {
        var output = {
            crystal: {
                cont: 0,
                pkg: 0
            },
            tiberium: {
                cont: 0,
                pkg: 0
            }
        };

        var HarvesterLink = SiloCalculator.links.Harvester;
        var nearBy = base.getSurroundings(x, y, HarvesterLink.buildings);
        var perHarvester = Util.getGrowthValue(HarvesterLink.values, building.getLevel());
        for (var i = 0; i < nearBy.length; i++) {
            var nearBuilding = nearBy[i];
            var tile = base.getTile(nearBuilding.x, nearBuilding.y);
            if (tile === Tile.Tiberium) {
                output.tiberium.cont += perHarvester;
            } else if (tile === Tile.Crystal) {
                output.crystal.cont += perHarvester
            }
        }

        return output;
    }
}