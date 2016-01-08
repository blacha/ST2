import {OutputCalculator, BaseOutput} from './calculator';
import {BuildingType} from '../building/buildingtype';
import {Base} from '../base';
import {Building} from '../building/building';

import {Tile} from '../base/tile';
import * as Util from '../util';
import {GameResources} from "../game.resources";

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

    calculate(base:Base, x:number, y:number, building:Building): BaseOutput {
        var outputCont = new GameResources();
        var outputPackage = new GameResources();

        var HarvesterLink = SiloCalculator.links.Harvester;
        var nearBy = base.getSurroundings(x, y, HarvesterLink.buildings);
        var perHarvester = Util.getGrowthValue(HarvesterLink.values, building.getLevel());
        for (var i = 0; i < nearBy.length; i++) {
            var nearBuilding = nearBy[i];
            var tile = base.getTile(nearBuilding.x, nearBuilding.y);
            if (tile === Tile.Tiberium) {
                outputCont.addResource(GameResources.TIBERIUM, perHarvester);
            } else if (tile === Tile.Crystal) {
                outputCont.addResource(GameResources.CRYSTAL, perHarvester);
            }
        }

        return {
            cont: outputCont,
            pkg: outputPackage
        };
    }
}