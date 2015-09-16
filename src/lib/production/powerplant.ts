import {OutputCalculator, BaseOutput} from './calculator';
import {BuildingType} from '../building/buildingtype';
import {Base} from '../base';
import {Building} from '../building/building';

import {Tile} from '../base/tile';
import * as Util from '../util';

export var PowerPlantCalculator:OutputCalculator = {
    name: 'PowerPlant',
    buildings: [
        BuildingType.NOD.PowerPlant.getID(),
        BuildingType.GDI.PowerPlant.getID(),
    ],

    links: {
        buildings: {
            buildings: [
                BuildingType.GDI.Accumulator.getID(),
                BuildingType.NOD.Accumulator.getID()
            ],
            values: [0, 72, 90, 120, 160, 215, 275, 335, 400, 460, 530, 610, 700]
        },
        tiles: {
            tiles: [Tile.Crystal],
            values: [0, 60, 75, 100, 135, 180, 230, 280, 330, 380, 440, 500, 580]
        }

    },

    calculate(base:Base, x:number, y:number, building:Building):BaseOutput {
        var output = {
            power: {
                cont: 0,
                pkg: 0
            }
        };
        var BuildingLink = PowerPlantCalculator.links.buildings;
        var TileLink = PowerPlantCalculator.links.tiles;

        var gd = building.getGameData();
        var packTime = Util.getModifierValue(gd, 'PowerPackageTime', building.getLevel(), 1);
        var packAmount = Util.getModifierValue(gd, 'PowerPackage', building.getLevel());
        output.power.pkg = (packAmount / packTime) * 3600;

        var nearBy = base.getSurroundings(x, y, BuildingLink.buildings, TileLink.tiles);
        var accumBonus = Util.getGrowthValue(BuildingLink.values, building.getLevel());
        var crystalBonus = Util.getGrowthValue(TileLink.values, building.getLevel())

        var firstAccum = true;
        for (var i = 0; i < nearBy.length; i++) {
            var near = nearBy[i];

            if (near.tile === Tile.Crystal) {
                output.power.cont += crystalBonus;
                continue;
            }

            // only the first accumulator matters
            if (near.building && firstAccum) {
                firstAccum = false;
                output.power.cont += accumBonus;
            }
        }

        return output;
    }
};