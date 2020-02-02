import { BaseX, BaseY } from '@cncta/clientlib';
import { StCity, UnitLocationPacker, UnitPacker } from '@cncta/util';
import { Faction } from '../data/faction';
import { GameDataObject } from '../data/game.data.object';
import { Base } from './base';
import { NumberPacker, BaseLayoutPacker } from './base.packer';
import { Tile } from './tile';

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
            const { x, y } = UnitLocationPacker.unpack(offset);
            offset++;

            if (charCode == codeDot) {
                continue;
            }

            BaseBuilder.buildByCode(base, x, y, currentLevel || 1, baseString[i]);
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

    static buildByCode(base: Base, x: number, y: number, level: number, code: string): void {
        const objectType = Base.getObjectType(y);
        const faction = y > BaseY.MaxDef ? base.offFaction : base.faction;
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
     * @param city base to load
     */
    static load(city: StCity): Base {
        const output = new Base(city.name, Faction.fromId(city.faction));
        output.owner = { id: city.ownerId, name: city.owner };
        output.x = city.x;
        output.y = city.y;
        output.cityId = city.cityId;
        if (city.alliance && city.allianceId) {
            output.alliance = { id: city.allianceId, name: city.alliance };
        }
        output.worldId = city.worldId;
        output.updatedAt = city.timestamp;
        output.setBaseLevels(city.level.base, city.level.off, city.level.def);

        for (const building of NumberPacker.unpack(city.base)) {
            const unit = UnitPacker.unpack(building);
            const point = UnitLocationPacker.unpack(unit.xy);
            output.build(point.x, point.y, unit.level, GameDataObject.getById(unit.id));
        }

        for (const def of NumberPacker.unpack(city.def)) {
            const unit = UnitPacker.unpack(def);
            const point = UnitLocationPacker.unpack(unit.xy + BaseX.Max * BaseY.MaxBuilding);
            output.build(point.x, point.y, unit.level, GameDataObject.getById(unit.id));
        }

        for (const off of NumberPacker.unpack(city.off)) {
            const unit = UnitPacker.unpack(off);
            const point = UnitLocationPacker.unpack(unit.xy + BaseX.Max * BaseY.MaxDef);
            output.build(point.x, point.y, unit.level, GameDataObject.getById(unit.id));
        }
        output.tiles = BaseLayoutPacker.unpack(city.tiles);

        output.upgrades = city.upgrades;
        return output;
    }
}
