#!/usr/bin/env node
/**
 * Extract a easier to use GAMEDATA object
 *
 * In a chrome/firefox console
 * ```
 * copy(JSON.stringify(GAMEDATA))
 * ```
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const GD: GameDataStatic = require('../../gamedata.2019-12.w410.json');

import { Faction } from '../../lib/data/faction';
import { GameDataJson } from '../../lib/data/game.data';
import {
    ModifierType,
    PartialModifierMap,
    PartialResourceMap,
    ResourceType,
} from '../../extension/@types/client.lib.const';
import { GameDataModifiers, GameDataResourceCost, GameDataStatic } from '../../extension/@types/game.data';
import { writeFileSync } from 'fs';

function getModifiers(rc: GameDataModifiers) {
    const output: PartialModifierMap = {};
    if (rc === null) {
        return output;
    }

    for (const values of rc.lm) {
        const key = ModifierType[values.t] as keyof typeof ModifierType;
        if (key == null) {
            console.log('Unknown Modifier: ', values.t, values);
            continue;
        }
        if (output[key] != null) {
            throw new Error('ModifierDoubleUp :' + key);
        }
        output[key] = values.v;
    }

    return output;
}

function getResourceCost(resources: GameDataResourceCost[]) {
    const output: PartialResourceMap = {};
    if (resources === null) {
        return output;
    }
    for (const resource of resources) {
        const key = ResourceType[resource.t] as keyof typeof ResourceType;

        if (output[key] != null) {
            throw new Error('ResourceDoubleUp :' + key);
        }
        output[key] = resource.c;
    }
    return output;
}

function factionFromGameData(id: number): Faction {
    if (GD.gdiUnitIds.includes(id)) {
        return Faction.Gdi;
    }
    if (GD.nodUnitIds.includes(id)) {
        return Faction.Nod;
    }
    if (GD.npcUnitIds.includes(id)) {
        return Faction.Forgotten;
    }
    throw new Error('Unknown?:' + id);
}

function isEmpty(obj?: any[]) {
    if (obj == null) {
        return false;
    }
    return obj.filter(f => Object.keys(f).length > 0).length == 0;
}

const OUTPUT: GameDataJson[] = [];
const units = Object.values(GD.units);
for (const unit of units) {
    const obj: GameDataJson = {
        id: unit.i,
        speed: unit.s,
        display: unit.dn,
        tech: unit.tl,
        name: unit.n,
        faction: factionFromGameData(unit.i).name,
        health: unit.lp,
        movement: unit.mt,
        resources: unit.r.map(r => (r == null ? {} : getResourceCost(r.rr))),
        repair: unit.r.map(r => (r == null ? {} : getResourceCost(r.rer))),
        modifiers: [],
    };

    OUTPUT.push(obj);
    if (isEmpty(obj.resources)) {
        delete obj.resources;
    }
    if (isEmpty(obj.repair)) {
        delete obj.repair;
    }

    const tech = GD.Tech[obj.tech];
    if (tech != null) {
        const techMods = tech.r.map(r => getModifiers(r));
        if (!isEmpty(techMods)) {
            obj.modifiers = techMods;
        }
    }
}
console.log('Writing data');
writeFileSync('./gamedata.json', JSON.stringify({ world: 410, timestamp: Date.now(), units: OUTPUT }));
