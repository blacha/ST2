import { Constants } from './constants';
import { GameDataJson, GameDataRepair, GameDataResource } from './data/game.data';
import { GameResources } from './game.resources';

export var ID_MAP = [];
export var TECH_MAP: any[] = [];

export function pad(width: number, string: string): string {
    return width <= string.length ? string : pad(width, string + ' ');
}

export function getGrowthValue(values: number[], level: number, growth = Constants.RESOURCE_PRODUCTION_GROWTH): number {
    if (level <= Constants.GROWTH_LEVEL) {
        return values[level];
    }
    if (growth === 1) {
        return values[Constants.GROWTH_LEVEL];
    }

    return (
        values[Constants.GROWTH_LEVEL] * Math.pow(Constants.RESOURCE_PRODUCTION_GROWTH, level - Constants.GROWTH_LEVEL)
    );
}

export function getModifierValue(
    gdo: GameDataJson,
    modifier: string,
    level: number,
    growth = Constants.RESOURCE_PRODUCTION_GROWTH,
): number {
    const values = gdo.modifiers!;
    if (level <= Constants.GROWTH_LEVEL) {
        return values[level][modifier];
    }
    const growthVal = values[Constants.GROWTH_LEVEL]!;

    const val = growthVal[modifier];
    if (growth == 1) {
        return val;
    }

    return val * Math.pow(growth, level - Constants.GROWTH_LEVEL);
}

const Formats = ['', 'K', 'M', 'G', 'T'];
export function formatNumber(num: number): string {
    let current = 0;
    while (num > 1000 && current < Formats.length) {
        current++;
        num /= 1000;
    }

    return num.toFixed(4) + Formats[current];
}

export function getTotalUpgradeCost(gdo: GameDataJson, level: number): GameDataResource {
    let objCache: any = TotalCache[gdo.id];
    if (objCache == null) {
        objCache = TotalCache[gdo.id] = [] as any;
    }

    const cache = objCache[level];
    if (cache != null) {
        return cache;
    }

    const totalCost = new GameResources();

    // TODO optimize?
    for (let i = 1; i <= level; i++) {
        const currentCost = <any>getLevelValues('cost', gdo.id, gdo.resources, i, Constants.RESOURCE_COST_GROWTH);
        totalCost.add(currentCost);
        objCache[i] = totalCost.clone();
    }
    objCache[level] = totalCost;

    return totalCost;
}

export function getUpgradeCost(gdo: GameDataJson, level: number): GameDataResource {
    return getLevelValues('cost', gdo.id, gdo.resources, level, Constants.RESOURCE_COST_GROWTH);
}

export function getRepairValue(gdo: GameDataJson, level: number): GameDataRepair {
    return getLevelValues('repair', gdo.id, gdo.repair, level, Constants.RESOURCE_PLUNDER_GROWTH);
}

export type NumberCache = Record<string, number[]>;
const RepairCache: NumberCache = {};
const CostCache: NumberCache = {};
const TotalCache: Record<string, GameDataResource> = {};

const LEVEL_CACHE: Record<string, any> = {
    repair: RepairCache,
    cost: CostCache,
    total: TotalCache,
};

function getLevelValues(type: string, id: number, values: any, level: number, growth: number) {
    let objCache: any = LEVEL_CACHE[type][id];
    if (objCache == null) {
        objCache = LEVEL_CACHE[type][id] = [] as any;
    }

    const cache = objCache[level];
    if (cache != null) {
        return cache;
    }

    const maxLevel = values[Constants.GROWTH_LEVEL];
    const keys = Object.keys(maxLevel);
    const output: any = {};
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (level <= Constants.GROWTH_LEVEL) {
            output[key] = values[level][key];
            continue;
        }

        const val = values[Constants.GROWTH_LEVEL][key];
        output[key] = (val * Math.pow(growth, level - Constants.GROWTH_LEVEL)) as any;
    }

    objCache[level] = output;
    return output;
}

// function mapIDs(obj: any, baseObj: any) {
//     if (obj == null) {
//         return;
//     }

//     var keys = Object.keys(obj);
//     for (var i = 0; i < keys.length; i++) {
//         var key = keys[i];
//         var o = obj[key];
//         ID_MAP[o.id] = o;
//         baseObj.ID_MAP[o.id] = o;
//     }
// }

// export function createTechMap(obj: any) {
//     mapIDs(obj.NOD, obj);
//     mapIDs(obj.GDI, obj);
//     mapIDs(obj.Forgotten, obj);
//     mapIDs(obj.Fortress, obj);
// }
