import { CityInfoData } from '../api/player.info';
// import { TaBase, TaTile } from "../client.base";
import { Base } from './base';
import { Tile } from './base/tile';
import { Building } from './building/building';
import { BuildingType } from './building/building.type';
import { Constants } from './constants';
import { Faction } from './data/faction';
import { GameDataObject, GameDataObjectType } from './data/game.data.object';
import { JsonPlayerObject } from './objects/player';
import { DefUnitType } from './unit/def.unit.type';
import { OffUnitType } from './unit/off.unit.type';
import { Unit } from './unit/unit';
import { CityLayout, CityLayoutTileObject } from '../api/city.layout';
import { Uuid } from './uuid';
const codeZero = '0'.charCodeAt(0);
const codeNine = '9'.charCodeAt(0);
const codeDot = '.'.charCodeAt(0);

export class BaseBuilder {
    static fromCnCOpt(str: string): Base {
        const parts = str.split('|');
        const baseFaction = Faction.make(parts[1]) || Faction.Nod;
        const targetFaction = Faction.make(parts[2]) || Faction.Nod;
        const baseName = parts[3];
        const baseString = parts[4];
        console.log(baseName, baseFaction, baseString);

        const base = new Base(baseName, baseFaction);

        let currentLevel = 0;
        let offset = 0;
        for (let i = 0; i < baseString.length; i++) {
            const charCode = baseString.charCodeAt(i);
            if (charCode >= codeZero && charCode <= codeNine) {
                currentLevel = currentLevel * 10 + (charCode - codeZero);
                continue;
            }
            const x = offset % Constants.MAX_BASE_X;
            const y = Math.floor(offset / Constants.MAX_BASE_X);
            offset++;

            if (charCode == codeDot) {
                continue;
            }

            BaseBuilder.buildByCode(base, x, y, currentLevel || 1, base.faction, baseString[i]);
            currentLevel = 0;
        }
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
            player: player.name,
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
        const output = new Base(cncBase.name, Faction.fromID(cncBase.faction));
        output.x = cncBase.x;
        output.y = cncBase.y;

        for (let y = 0; y < Constants.MAX_Y; y++) {
            for (let x = 0; x < Constants.MAX_BASE_X; x++) {
                const index = Base.$index(x, y);
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
