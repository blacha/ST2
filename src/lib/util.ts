import {Constants} from './constants';
import {GameDataRepair, GameDataJSON} from './data/gamedata';
import {GameDataObject} from './data/gamedataobject';
import {Faction} from './data/faction';
import {Base} from './base';
import {GAMEDATA} from '../data/gamedata';
import {BuildingType} from './building/buildingtype';
import {BaseNode} from './base/node';
import {GameDataResource} from "./data/gamedata";
import {GameResources} from "./game.resources";


export function random(prefix?:string):string {

    return null;
}

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

export function getTotalUpgradeCost(gdo:GameDataJSON, level:number):GameDataResource {
    var objCache = LEVEL_CACHE.total[gdo.id];
    if (objCache == null) {
        objCache = LEVEL_CACHE.total[gdo.id] = [];
    }

    var cache = objCache[level];
    if (cache != null) {
        return cache;
    }

    var totalCost = new GameResources();

    // TODO optimize?
    for (var i = 1; i <= level; i++) {
        var currentCost = <any>getLevelValues('cost', gdo.id, gdo.resources, i, Constants.RESOURCE_COST_GROWTH);
        totalCost.add(currentCost);
        objCache[i] = totalCost.clone();
    }
    objCache[level] = totalCost;

    return totalCost;
}

export function getUpgradeCost(gdo:GameDataJSON, level:number):GameDataResource {
    return getLevelValues('cost', gdo.id, gdo.resources, level, Constants.RESOURCE_COST_GROWTH)
}

export function getRepairValue(gdo:GameDataJSON, level:number):GameDataRepair {
    return getLevelValues('repair', gdo.id, gdo.repair, level, Constants.RESOURCE_PLUNDER_GROWTH)
}

var LEVEL_CACHE = {
    repair: {},
    cost: {},
    total: {}
};
if (typeof window !== 'undefined') {
    (<any>window).LEVEL_CACHE = LEVEL_CACHE;
}

function getLevelValues(type:string, id:number, values:any, level, growth) {
    var objCache = LEVEL_CACHE[type][id];
    if (objCache == null) {
        objCache = LEVEL_CACHE[type][id] = [];
    }

    var cache = objCache[level];
    if (cache != null) {
        return cache;
    }

    var maxLevel = values[Constants.GROWTH_LEVEL];
    var keys = Object.keys(maxLevel);
    var output = {};
    for (var i = 0; i < keys.length; i++) {

        var key = keys[i];
        if (level <= Constants.GROWTH_LEVEL) {
            output[key] = values[level][key];
            continue;
        }

        var val = values[Constants.GROWTH_LEVEL][key];
        output[key] = val * Math.pow(growth, level - Constants.GROWTH_LEVEL);
    }

    objCache[level] = output;
    return output;
}

function mapIDs(obj, baseObj) {
    if (obj == null) {
        return;
    }

    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var o = obj[key];
        ID_MAP[o.getID()] = o;
        baseObj.ID_MAP[o.getID()] = o;
    }
}

export function createTechMap(obj) {
    mapIDs(obj.NOD, obj);
    mapIDs(obj.GDI, obj);
    mapIDs(obj.Forgotten, obj);
    mapIDs(obj.Fortress, obj);
}