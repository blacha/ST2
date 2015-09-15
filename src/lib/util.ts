import {Constants} from './constants';
import {GameDataRepair, GameDataJSON} from './data/gamedata';
import {GameDataObject} from './data/gamedataobject';
import {Faction} from './data/faction';
import {Base} from './base';
import {GAMEDATA} from '../data/gamedata';
import {BuildingType} from './building/buildingtype';
import {BaseNode} from './base/node';


export var ID_MAP = [];
export var TECH_MAP = [];

export function pad(width, string) {
    return (width <= string.length) ? string : pad(width, string + ' ')
}

export function getGrowthValue(values:number[], level:number, growth = Constants.RESOURCE_PRODUCTION_GROWTH):number {
    if (level <= Constants.GROWTH_LEVEL) {
        return values[level];
    }
    if (growth === 1) {
        return values[Constants.GROWTH_LEVEL];
    }

    return values[Constants.GROWTH_LEVEL] * Math.pow(Constants.RESOURCE_PRODUCTION_GROWTH, level - Constants.GROWTH_LEVEL);
}


export function getModifierValue(gdo:GameDataJSON, modifier:string, level:number, growth = Constants.RESOURCE_PRODUCTION_GROWTH) {
    var values = gdo.modifiers;
    if (level <= Constants.GROWTH_LEVEL) {
        return values[level][modifier];
    }

    var val = values[Constants.GROWTH_LEVEL][modifier];
    if (growth == 1) {
        return val;
    }

    return val * Math.pow(growth, level - Constants.GROWTH_LEVEL);
}

var Formats = ['', 'K', 'M', 'G', 'T'];

export function formatNumber(num:number):string {
    var current = 0;
    while (num > 1000 && current < Formats.length) {
        current++;
        num /= 1000;
    }

    return num.toFixed(2) + Formats[current];
}

export function loadGameData(printMessages) {
    var factionMap = {
        'GDI': Faction.GDI,
        'NOD': Faction.NOD,
        'FOR': Faction.Forgotten
    };


    if (printMessages) {
        GAMEDATA.sort(function (a, b) {
            return a.id - b.id;
        });
    }

    for (var i = 0; i < GAMEDATA.length; i++) {
        var d = GAMEDATA[i];
        var faction = factionMap[d.faction];
        if (faction == null) {
            continue;
        }
        var codeName = d.name.replace(/ /g, '_');

        var gameObject:GameDataObject = ID_MAP[d.id];
        if (gameObject == undefined) {
            if (printMessages) {
                console.log('Missing', pad(10, d.faction), pad(4, d.id), pad(30, d.display), ' ', ' ', codeName);
            }
        } else {
            gameObject.setGameData(d);
            TECH_MAP[d.tech] = gameObject;
        }
    }
}


//export function getImportantBuildings(base:Base):{[key:string] : BaseNode} {
//    var IMPORTANT = [
//        BuildingType.GDI.ConstructionYard.getName(),
//        BuildingType.GDI.DefenseFacility.getName(),
//        BuildingType.GDI.DefenseHQ.getName()
//    ];
//
//    var tiles = base.getTiles();
//    var output:{[key:string] : BaseNode} = {};
//
//    tiles.forEach(function (tile:BaseNode) {
//        if (tile.obj == null) {
//            return;
//        }
//        var name = tile.obj.getName();
//
//        if (IMPORTANT.indexOf(name) == -1) {
//            return;
//        }
//
//        output[name] = tile;
//    });
//
//    return output;
//}

function mapIDs(obj) {
    if (obj == null) {
        return;
    }

    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var o = obj[key];
        ID_MAP[o.getID()] = o;
        ;
    }
}

export function createTechMap(obj) {
    mapIDs(obj.NOD);
    mapIDs(obj.GDI);
    mapIDs(obj.Forgotten);
    mapIDs(obj.Fortress);
}