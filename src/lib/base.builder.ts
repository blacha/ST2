import { CityLayout, CityLayoutTileObject } from '../api/city.layout';
import { CityInfoData } from '../api/player.info';
import { Base } from './base';
import { Tile } from './base/tile';
import { Faction } from './data/faction';
import { GameDataObject } from './data/game.data.object';
import { JsonPlayerObject } from './objects/player';

const codeZero = '0'.charCodeAt(0);
const codeNine = '9'.charCodeAt(0);
const codeDot = '.'.charCodeAt(0);

export class BaseBuilder {
    static fromCnCOpt(str: string): Base {
        const parts = str.split('|');
        const baseFaction = Faction.fromString(parts[1]) || Faction.Nod;
        const targetFaction = Faction.fromString(parts[2]) || Faction.Nod;
        const baseName = parts[3];
        const baseString = parts[4];

        const base = new Base(baseName, baseFaction);
        base.offFaction = targetFaction;

        let currentLevel = 0;
        let offset = 0;
        for (let i = 0; i < baseString.length; i++) {
            const charCode = baseString.charCodeAt(i);
            if (charCode >= codeZero && charCode <= codeNine) {
                currentLevel = currentLevel * 10 + (charCode - codeZero);
                continue;
            }
            const x = offset % Base.MaxX;
            const y = Math.floor(offset / Base.MaxX);
            offset++;

            if (charCode == codeDot) {
                continue;
            }

            const faction = y > Base.MaxDefY ? targetFaction : baseFaction;
            BaseBuilder.buildByCode(base, x, y, currentLevel || 1, faction, baseString[i]);
            currentLevel = 0;
        }
        base.poi.tiberium = parseInt(parts[5], 10);
        base.poi.crystal = parseInt(parts[6], 10);
        base.poi.power = parseInt(parts[7], 10);
        base.poi.infantry = parseFloat(parts[8]);
        base.poi.vehicle = parseFloat(parts[9]);
        base.poi.air = parseFloat(parts[10]);
        base.poi.defense = parseFloat(parts[11]);
        return base;
    }

    static fromCity(player: JsonPlayerObject, city: CityInfoData): Base {
        const upgrades = Object.keys(player.research)
            .filter(key => player.research[key] > 1)
            .map(val => parseInt(val), 10);

        const cncBase: CityLayout = {
            x: city.x,
            y: city.y,
            level: city.level,
            name: city.name,
            faction: player.faction,
            version: 0,
            world: player.world,
            owner: player.name,
            tiles: city.tiles,
            upgrades,
        };

        return BaseBuilder.load(cncBase);
    }

    static buildByCode(base: Base, x: number, y: number, level: number, faction: Faction, code: string): void {
        const objectType = Base.getObjectType(y);

        const unitType = GameDataObject.getByCode(objectType, faction, code);
        if (unitType == null) {
            const tile = Tile.make(code);
            if (tile == null) {
                console.error('Unknown UnitCode', Base.getObjectType(y), code);
            } else {
                base.setTile(x, y, tile);
            }
            return;
        }
        return base.build(x, y, level, unitType);
    }

    /**
     * Load a base from a layout scan
     * @param cncBase base to load
     */
    static load(cncBase: CityLayout): Base {
        const output = new Base(cncBase.name, Faction.fromId(cncBase.faction));
        output.owner = cncBase.owner;
        output.x = cncBase.x;
        output.y = cncBase.y;
        output.setBaseLevels(cncBase.level, cncBase.levelOff, cncBase.levelDef);

        for (let y = 0; y < Base.MaxY; y++) {
            for (let x = 0; x < Base.MaxX; x++) {
                const index = Base.index(x, y);
                const unit = cncBase.tiles[index];
                let tile: Tile;

                if (unit == null) {
                    continue;
                }

                // Give just a number so just a tile
                if (typeof unit === 'number') {
                    tile = Tile.Id[unit];
                    if (tile == null) {
                        continue;
                    }
                    output.setTile(x, y, tile);
                    continue;
                }

                const actualUnit: CityLayoutTileObject = unit as CityLayoutTileObject;
                const unitType: GameDataObject = GameDataObject.getById(actualUnit.id);
                if (unitType == null) {
                    console.error('Unknown unit', actualUnit.id, '@', x, y);
                    continue;
                }

                if (actualUnit.t) {
                    tile = Tile.Id[actualUnit.t];
                    output.setTile(x, y, tile);
                }

                output.build(x, y, actualUnit.l, unitType);
            }
        }

        output.setUpgrades(cncBase.upgrades);
        return output;
    }
}
