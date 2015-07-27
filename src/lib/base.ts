import {Constants} from './constants';
import {Faction} from './data/faction';
import {Tile} from './base/tile';
import {BaseNode} from './base/node';
import {BuildingType} from './building/buildingtype';

import {DUnitType} from './unit/dunittype';
import {OUnitType} from './unit/ounittype';

export class Base {

    constructor(private name?:string, private faction?:Faction, private tiles?:BaseNode[]) {
        this.name = this.name || 'Base';

        if (faction == null) {
            this.faction = Faction.GDI;
        }

        if (this.tiles == null) {
            this.tiles = [];
        }

        // not enough tiles add extra ones!
        for (var i = this.tiles.length; i < Constants.TILE_COUNT; i++) {
            var x = i % Constants.MAX_BASE_X;
            var y = Math.floor(i / Constants.MAX_BASE_X);
            this.tiles.push({
                x: x,
                y: y,
                tile: Tile.Empty
            });
        }

    }

    getBuilding(name:string) {
        return this.tiles.filter(function (tile) {
            return (tile.obj != null && tile.obj.getName() == name);
        });
    }

    getName():string {
        return this.name;
    }

    getFaction():Faction {
        return this.faction;
    }


    getTile(x:number, y?:number):BaseNode {
        if (y == undefined) {
            return this.tiles[x];
        }

        if (x > Constants.MAX_BASE_X) {
            return null;
        }
        if (y > Constants.MAX_OFF_Y) {
            return null;
        }

        return this.tiles[(x + y * Constants.MAX_BASE_X)];
    }

    getTiles():BaseNode[] {
        return this.tiles;
    }

    /**
     * parse the base layout string into a base
     *
     *
     * @param faction string representation of base faction.
     * @param layout string representation of the base.
     * @param tech string representation of the base tech.
     * @param name string name of the base.
     */
    static parse(factionChar:string, layout:string, tech:string, name?:string):{status:boolean; base?:Base; message?:string} {
        var faction = Faction.make(factionChar);

        if (faction == null) {
            return {
                status: false,
                message: 'Invalid faction "' + faction + '"'
            };
        }

        var level = 0;
        var tiles = [];

        var X = 0;
        var Y = 0;

        for (var i = 0; i < layout.length; i++) {
            if (X == Constants.MAX_BASE_X) {
                X = 0;
                Y++;
            }
            if (Y > Constants.MAX_OFF_Y) {
                break;
            }
            var char = layout[i];
            if ('0123456789'.indexOf(char) > -1) {
                level = level * 10 + parseInt(char, 10);
                continue;
            }

            X++;
            // reset the level counter
            var currentLevel = level;
            level = 0;
            var tile = Tile.Empty;
            if (currentLevel === 0) {
                var tile = Tile.make(char);
                if (tile !== null) {
                    tiles.push({obj: null, tile: tile, x: X - 1, y: Y});
                    continue;
                }
            }

            if (Y < Constants.MAX_BASE_Y) {
                var obj = BuildingType.make(faction, char);

                if (char == BuildingType[faction.name].CrystalHarvester.getCode()) {
                    tile = Tile.Crystal;
                }

                if (obj == BuildingType[faction.name].TiberiumHarvester.getCode()) {
                    tile = Tile.Tiberium;
                }

                tiles.push({obj: obj, tile: tile, level: currentLevel, x: X - 1, y: Y});

            } else if (Y < Constants.MAX_DEF_Y) {
                var unit = DUnitType.make(faction, char);
                tiles.push({obj: unit, tile: tile, level: currentLevel, x: X - 1, y: Y});

            } else if (Y < Constants.MAX_OFF_Y) {
                var unit = OUnitType.make(faction, char);
                tiles.push({obj: unit, tile: tile, level: currentLevel, x: X - 1, y: Y});
            }

        }

        var base = new Base(name, faction, tiles);

        return {
            status: true,
            base: base
        };

    }
}
