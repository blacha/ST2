import {OutputCalculator, BaseOutput} from './calculator';
import {BuildingType} from '../building/buildingtype';
import {Base} from '../base';
import {Building} from '../building/building';

import {Tile} from '../base/tile';
import * as Util from '../util';
import {GameResources} from "../game.resources";

export var RefineryCalculator:OutputCalculator = {
    name: 'Refinery',
    buildings: [
        BuildingType.NOD.Refinery.getID(),
        BuildingType.GDI.Refinery.getID()
    ],

    links: {
        PowerPlant: {
            buildings: [
                BuildingType.GDI.PowerPlant.getID(),
                BuildingType.NOD.PowerPlant.getID()
            ],
            values: [0, 72, 90, 110, 145, 190, 240, 290, 345, 410, 475, 555, 650]
        },
        Tiberium: {
            tiles: [Tile.Tiberium],
            values: [0, 60, 75, 90, 120, 160, 200, 240, 290, 340, 400, 460, 540]
        }
    },

    calculate: (base:Base, x:number, y:number, building:Building):BaseOutput => {
        var gd = building.getGameData();
        var buildingLevel = building.getLevel();

        // Package amount is per minute
        var packTime = Util.getModifierValue(gd, 'CreditPackageTime', buildingLevel, 1);
        var packAmount = Util.getModifierValue(gd, 'CreditPackage', buildingLevel);
        var outputPackage = new GameResources();
        outputPackage.addResource(GameResources.CREDIT, (packAmount / packTime) * 3600);

        var PowerLink = RefineryCalculator.links.PowerPlant;
        var TiberiumLink = RefineryCalculator.links.Tiberium;

        var nearBy = base.getSurroundings(x, y, PowerLink.buildings, TiberiumLink.tiles);

        var powerCont = Util.getGrowthValue(PowerLink.values, buildingLevel);
        var tibCont = Util.getGrowthValue(TiberiumLink.values, buildingLevel);

        var outputCont = new GameResources();
        var firstPower = true;
        for (var i = 0; i < nearBy.length; i++) {
            if (nearBy[i].tile === Tile.Tiberium) {
                outputCont.addResource(GameResources.CREDIT, tibCont);
                continue;
            }

            if (firstPower) {
                firstPower = false;
                outputCont.addResource(GameResources.CREDIT, powerCont);
            }
        }


        return {
            cont: outputCont,
            pkg: outputPackage
        };
    }
};