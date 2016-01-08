import {OutputCalculator, BaseOutput} from './calculator';
import {BuildingType} from '../building/buildingtype';
import {Base} from '../base';
import {Building} from '../building/building';

import {Tile} from '../base/tile';
import * as Util from '../util';
import {GameResources} from "../game.resources";

export var HarvesterCalculator:OutputCalculator = {
    name: 'Harvester',
    buildings: [
        BuildingType.NOD.TiberiumHarvester.getID(),
        BuildingType.NOD.CrystalHarvester.getID(),
        BuildingType.GDI.TiberiumHarvester.getID(),
        BuildingType.GDI.CrystalHarvester.getID(),
    ],

    links: {
        Silo: {
            buildings: [
                BuildingType.GDI.Silo.getID(),
                BuildingType.NOD.Silo.getID()
            ],
            values: [0, 72, 90, 125, 170, 220, 275, 335, 400, 460, 530, 610, 710]
        }
    },

    calculate: (base:Base, x:number, y:number, building:Building):BaseOutput => {
        var gd = building.getGameData();
        var outputCont = new GameResources();
        var outputPackage = new GameResources();

        var resourceType = GameResources.TIBERIUM;
        var tile = base.getTile(x, y);
        if (tile === Tile.Crystal) {
            resourceType = GameResources.CRYSTAL;
        }

        // Package amount is per minute
        var packTime = Util.getModifierValue(gd, 'TiberiumPackageTime', building.getLevel(), 1);
        var packAmount = Util.getModifierValue(gd, 'TiberiumPackage', building.getLevel());
        outputPackage.addResource(resourceType, (packAmount / packTime) * 3600);

        var SlioLink = HarvesterCalculator.links.Silo;

        var nearBy = base.getSurroundings(x, y, SlioLink.buildings);
        if (nearBy.length > 0) {
            outputCont.addResource(resourceType, Util.getGrowthValue(SlioLink.values, building.getLevel()));
        }

        return {
            cont: outputCont,
            pkg: outputPackage
        };
    }
};