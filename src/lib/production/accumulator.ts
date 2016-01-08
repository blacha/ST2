import {OutputCalculator, BaseOutput} from './calculator';
import {BuildingType} from '../building/buildingtype';
import {Base} from '../base';
import {Building} from '../building/building';

import {Tile} from '../base/tile';
import * as Util from '../util';
import {GameResources} from "../game.resources";

export var AccumulatorCalculator:OutputCalculator = {
    name: 'Accumulator',
    buildings: [
        BuildingType.NOD.Accumulator.getID(),
        BuildingType.GDI.Accumulator.getID(),
    ],

    links: {
        PowerPlant: {
            buildings: [
                BuildingType.GDI.PowerPlant.getID(),
                BuildingType.NOD.PowerPlant.getID()
            ],
            values: [0, 48, 60, 80, 110, 145, 185, 225, 265, 310, 355, 405, 465]
        }
    },

    calculate: (base:Base, x:number, y:number, building:Building):BaseOutput => {
        var outputCont = new GameResources();
        var outputPackage = new GameResources();

        var PowerPlantLink = AccumulatorCalculator.links.PowerPlant;
        var nearBy = base.getSurroundings(x, y, PowerPlantLink.buildings);

        outputCont.addResource(GameResources.POWER, nearBy.length * Util.getGrowthValue(PowerPlantLink.values, building.getLevel()));

        return {
            cont: outputCont,
            pkg: outputPackage
        }
    }
};