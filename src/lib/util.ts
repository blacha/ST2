import {Constants} from './constants';
import {GameDataRepair, GameDataJSON} from './data/gamedata';
import {GameDataObject} from './data/gamedataobject';
import {Faction} from './data/faction';
import {Base} from './base';
import {GAMEDATA} from '../data/gamedata';
import {BuildingType} from './building/buildingtype';
import {BaseNode} from './base/node';


export var ID_MAP = [];

export function pad(width, string) {
    return (width <= string.length) ? string : pad(width, string + ' ')
}

export function getGrowthValue(values:GameDataRepair[], level:number, growth:number) {
    if (level < Constants.GROWTH_LEVEL) {
        return values[level].tiberium;
    }
    var val = values[Constants.GROWTH_LEVEL].tiberium;
    return val * Math.pow(level - Constants.GROWTH_LEVEL, growth);
}

export function getSingleGrowthValue(value:number, level:number, growth:number) {
    return value * Math.pow(level, growth);
}

export function loadGameData(printMessages) {
    var factionMap = {
        'GDI': Faction.GDI,
        'NOD': Faction.NOD,
        'Forgotten': Faction.Forgotten
    };


    GAMEDATA.sort(function (a, b) {
        return a.id - b.id;
    });

    for (var i = 0; i < GAMEDATA.length; i++) {
        var d = GAMEDATA[i];
        var faction = factionMap[d.faction];
        if (faction == null) {
            continue;
        }
        var codeName = d.name.replace(/ /g, '_');

        var gameObject:GameDataObject = CODE_MAP[codeName];
        if (gameObject == undefined) {
            if (printMessages) {
                console.log('Missing', pad(10, d.faction), pad(4, d.id), pad(30, d.display), ' ', ' ', codeName);
            }
        } else {
            gameObject.setGameData(d);

            //console.log(gameObject.getCodeName(), gameObject.getHealth(23));
        }
    }
}


export function getImportantBuildings(base:Base):{[key:string] : BaseNode} {
    var IMPORTANT = [
        BuildingType.GDI.ConstructionYard.getName(),
        BuildingType.GDI.DefenseFacility.getName(),
        BuildingType.GDI.DefenseHQ.getName()
    ];

    var tiles = base.getTiles();
    var output:{[key:string] : BaseNode} = {};

    tiles.forEach(function (tile:BaseNode) {
        if (tile.obj == null) {
            return;
        }
        var name = tile.obj.getName();

        if (IMPORTANT.indexOf(name) == -1) {
            return;
        }

        output[name] = tile;
    });

    return output;
}

export var CODE_MAP = {};

export function createTechMap(obj) {
    var nodMap = obj.MAP[Faction.NOD.code] = {};
    var gdiMap = obj.MAP[Faction.GDI.code] = {};
    var forMap = obj.MAP[Faction.Forgotten.code] = {};


    Object.keys(obj.NOD).forEach(function (key) {
        var o = obj.NOD[key];
        nodMap[o.getCode()] = o;
        ID_MAP[o.getID()] = o;
        CODE_MAP[o.getCodeName()] = o;
    });

    Object.keys(obj.GDI).forEach(function (key) {
        var o = obj.GDI[key];
        gdiMap[o.getCode()] = o;
        ID_MAP[o.getID()] = o;
        CODE_MAP[o.getCodeName()] = o;
    });

    Object.keys(obj.Forgotten).forEach(function (key) {
        var o = obj.Forgotten[key];
        forMap[o.getCode()] = o;
        ID_MAP[o.getID()] = o;
        CODE_MAP[o.getCodeName()] = o;
    });
}