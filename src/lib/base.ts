import {Constants} from './constants';
import {Faction} from './data/faction';
import {Tile} from './base/tile';
import {BaseNode} from './base/node';
import {BuildingType} from './building/buildingtype';
import {Building} from './building/building';

import {DUnitType} from './unit/dunittype';
import {OUnitType} from './unit/ounittype';
import {Unit} from './unit/unit';

import {CNCBase, CNCUnit} from '../client/client.base';

import {ID_MAP, TECH_MAP} from './util';

export class Base {
    private tiles:Tile[];
    private base:Building[];
    private off:Unit[];
    private def:Unit[];
    private upgrades:number[];

    constructor(private name?:string, private faction?:Faction) {
        this.name = this.name || 'Base';

        if (faction == null) {
            this.faction = Faction.GDI;
        }

        this.base = [];
        this.off = [];
        this.def = [];
        this.tiles = [];
        this.upgrades = [];
    }


    getName():string {
        return this.name;
    }

    getFaction():Faction {
        return this.faction;
    }

    getBaseTiles():Building[] {
        return this.base;
    }

    getTile(x:number, y:number) {
        return this.tiles[x * Constants.MAX_BASE_X + y] || Tile.Empty;

    }

    getBaseTile(x:number, y:number) {
        return this.base[x * Constants.MAX_BASE_X + y];
    }

    getOffTile(x:number, y:number) {
        return this.off[x * Constants.MAX_BASE_X + y];
    }

    getDefTile(x:number, y:number) {
        return this.def[x * Constants.MAX_BASE_X + y];
    }

    setTile(x:number, y:number, tile:Tile) {
        this.tiles[x * Constants.MAX_BASE_X + y] = tile;
    }

    setBuilding(x:number, y:number, building:Building) {
        if (x > Constants.MAX_BASE_X) {
            return null;
        }

        if (y > Constants.MAX_BASE_Y) {
            console.error('Invalid Y on unit', y, building);

            return null;
        }

        this.base[x * Constants.MAX_BASE_X + y] = building;
    }

    setOUnit(x:number, y:number, unit:Unit) {

        if (x > Constants.MAX_BASE_X) {
            return null;
        }

        if (y > Constants.MAX_OFF_Y) {
            console.error('Invalid Y on unit', y, unit);

            return null;
        }
        this.off[x * Constants.MAX_BASE_X + y] = unit;
    }

    setDUnit(x:number, y:number, unit:Unit) {

        if (x > Constants.MAX_BASE_X) {
            return null;
        }

        if (y > Constants.MAX_DEF_Y) {
            console.error('Invalid Y on unit', y, unit);
            return null;
        }

        this.def[x * Constants.MAX_BASE_X + y] = unit;
    }

    setUpgrades(upgrades:number[]) {
        this.upgrades = upgrades;
    }

    hasUpgrade(unitID:number) {
        return this.upgrades.indexOf(unitID) !== -1;
    }

    static load(cncbase:CNCBase):Base {
        var output = new Base(cncbase.name, Faction.fromID(cncbase.faction));

        cncbase.buildings.forEach(function (building:CNCUnit) {
            var buildingType = TECH_MAP[building.id];
            if (buildingType == null) {
                console.error('Unkown building', building.id);
                return;
            }

            output.setBuilding(building.x, building.y, new Building(buildingType, building.level));
        });

        function getUnit(setFunc:Function, unit:CNCUnit) {
            var unitType = ID_MAP[unit.id];
            if (unitType == null) {
                console.error('Unkown unit', unitType.id);

                return;
            }

            setFunc.call(output, unit.x, unit.y, new Unit(unitType, unit.level));
        }

        cncbase.units.d.forEach(getUnit.bind(null, output.setDUnit));
        cncbase.units.o.forEach(getUnit.bind(null, output.setOUnit));

        cncbase.resources.forEach(function (resource) {
            var tile = Tile.ID[resource.type];
            output.setTile(resource.y, resource.x, tile);
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
