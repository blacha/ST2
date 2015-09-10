import {Constants} from './constants';
import {Faction} from './data/faction';
import {Tile} from './base/tile';
import {BuildingType} from './building/buildingtype';
import {Buildable} from './base/buildable';
import {Building} from './building/building';

import {DUnitType} from './unit/dunittype';
import {OUnitType} from './unit/ounittype';
import {Unit} from './unit/unit';


import {GameDataObject} from './data/gamedata'
import {CNCBase, CNCUnit, CNCTile} from '../client/client.base';

import {ID_MAP, TECH_MAP} from './util';

export class Base {
    private tiles:Tile[];
    private base:Buildable[];
    private upgrades:number[];

    constructor(private name?:string, private faction?:Faction) {
        this.name = this.name || 'Base';

        if (faction == null) {
            this.faction = Faction.GDI;
        }

        this.tiles = [];
        this.upgrades = [];
        this.base = [];
    }

    getName():string {
        return this.name;
    }

    getFaction():Faction {
        return this.faction;
    }

    static $index(x:number, y:number) {
        return x + y * Constants.MAX_BASE_X;
    }

    baseForEach(callback:(x:number, y:number, building:Buildable, tile:Tile) => void) {
        for (var x = 0; x < Constants.MAX_BASE_X; x++) {
            for (var y = 0; y < Constants.MAX_Y; y++) {
                var index = Base.$index(x, y);
                callback(x, y, this.base[index], this.tiles[index]);
            }
        }
    }

    getTile(x:number, y:number) {
        return this.tiles[Base.$index(x, y)] || Tile.Empty;
    }

    setTile(x:number, y:number, tile:Tile) {
        this.tiles[Base.$index(x, y)] = tile;
    }

    getBase(x:number, y:number):Buildable {
        return this.base[Base.$index(x, y)];
    }

    setBase(x:number, y:number, buildable:Buildable) {
        this.base[Base.$index(x,y)] = buildable;
    }

    setUpgrades(upgrades:number[]) {
        this.upgrades = upgrades;
    }

    hasUpgrade(unitID:number) {
        return this.upgrades.indexOf(unitID) !== -1;
    }

    static load(cncbase:CNCBase):Base {
        var output = new Base(cncbase.name, Faction.fromID(cncbase.faction));

        var baseKeys = Object.keys(cncbase.tiles);
        baseKeys.forEach(function (key) {
            var keyParts = key.split('-');
            var x = parseInt(keyParts[0], 10);
            var y = parseInt(keyParts[1], 10);


            var unit = cncbase.tiles[key];
            var tile:Tile;
            // Give just a number so just a tile
            if (typeof unit === 'number') {
                tile = Tile.ID[<number>unit];
                output.setTile(x, y, tile);
                return;
            }

            var actualUnit:CNCTile = <CNCTile>unit;
            var unitType:GameDataObject = ID_MAP[actualUnit.i];
            if (unitType == null) {
                console.error('Unkown unit', actualUnit.i);
                return;
            }

            if (actualUnit.t) {
                tile = Tile.ID[actualUnit.t];
                output.setTile(x, y, tile);
            }

            if (unitType.getType() === Constants.BASE) {
                output.setBase(x, y, new Building(unitType, actualUnit.l));
            } else {
                output.setBase(x, y, new Unit(unitType, actualUnit.l));
            }
            output.setBase(x, y, unitType);
        });


        output.setUpgrades(cncbase.upgrades);

        return output;
    }

    toString() {
        function toStr(u) {
            return u.toString();
        }

        function removeEmpty(o) {
            return o != null;
        }

        return `[Base ${this.name}:${this.faction}
    buildings: [${ this.base.filter(removeEmpty).map(toStr).join('\n\t') })}]
    off: [${ this.off.filter(removeEmpty).map(toStr).join('\n\t') })}]
    def: [${ this.def.filter(removeEmpty).map(toStr).join('\n\t') })}]
        ]`;
    }
}
