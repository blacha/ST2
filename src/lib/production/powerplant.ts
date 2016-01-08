import {OutputCalculator, BaseOutput} from './calculator';
import {BuildingType} from '../building/buildingtype';
import {Base} from '../base';
import {Building} from '../building/building';

import {Tile} from '../base/tile';
import * as Util from '../util';
import {GameResources} from "../game.resources";

export var PowerPlantCalculator:OutputCalculator = {
    name: 'PowerPlant',
    buildings: [
        BuildingType.NOD.PowerPlant.getID(),
        BuildingType.GDI.PowerPlant.getID(),
    ],

    links: {
        Accumulator: {
            buildings: [
                BuildingType.GDI.Accumulator.getID(),
                BuildingType.NOD.Accumulator.getID()
            ],
            values: [0, 72, 90, 120, 160, 215, 275, 335, 400, 460, 530, 610, 700]
        },
        Refinery: {
            buildings: [
                BuildingType.GDI.Refinery.getID(),
                BuildingType.NOD.Refinery.getID()
            ],
            values: [0, 48, 60, 75, 100, 125, 160, 195, 230, 270, 315, 370, 430]
        },
        Crystal: {
            tiles: [Tile.Crystal],
            values: [0, 60, 75, 100, 135, 180, 230, 280, 330, 380, 440, 500, 580]
        }
    },

    calculate(base:Base, x:number, y:number, building:Building): BaseOutput {
        var outputCont = new GameResources();
        var outputPackage = new GameResources();

        var BuildingLink = PowerPlantCalculator.links.Accumulator;
        var TileLink = PowerPlantCalculator.links.Crystal;
        var RefineryLink = PowerPlantCalculator.links.Refinery;

        var gd = building.getGameData();
        var packTime = Util.getModifierValue(gd, 'PowerPackageTime', building.getLevel(), 1);
        var packAmount = Util.getModifierValue(gd, 'PowerPackage', building.getLevel());
        outputPackage.addResource(GameResources.POWER, (packAmount / packTime) * 3600)

        var nearBy = base.getSurroundings(x, y, BuildingLink.buildings.concat(RefineryLink.buildings), TileLink.tiles);
        var accumBonus = Util.getGrowthValue(BuildingLink.values, building.getLevel());
        var crystalBonus = Util.getGrowthValue(TileLink.values, building.getLevel());
        var creditBonus = Util.getGrowthValue(RefineryLink.values, building.getLevel());

        var firstAccum = true;
        for (var i = 0; i < nearBy.length; i++) {
            var near = nearBy[i];

            if (near.tile === Tile.Crystal) {
                outputCont.addResource(GameResources.POWER, crystalBonus)
                continue;
            }

            if (near.building == null) {
                continue;
            }

            if (RefineryLink.buildings.indexOf(near.building.getID()) > -1) {
                outputCont.addResource(GameResources.CREDIT, creditBonus)
                continue;
            }

            // only the first accumulator matters
            if (firstAccum) {
                firstAccum = false;
                outputCont.addResource(GameResources.POWER, accumBonus)
            }
        }

        return  {
            cont: outputCont,
            pkg: outputPackage
        };
    }
};