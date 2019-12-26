import { Base } from './base';
import { Tile } from './tile';
import { color, ConsoleColor } from '../util';

export class BaseExporter {
    static toCncOpt(base: Base) {
        const tiles = [];
        for (let y = 0; y < Base.MaxY; y++) {
            for (let x = 0; x < Base.MaxX; x++) {
                const obj = base.getBase(x, y);
                if (obj != null) {
                    if (obj.level == 1) {
                        tiles.push(obj.type.code);
                    } else {
                        tiles.push(obj.level + obj.type.code);
                    }
                    continue;
                }
                const tile = base.getTile(x, y);
                if (tile != null) {
                    tiles.push(tile.code);
                    continue;
                }
                throw new Error('Everything should have a tile');
            }
        }
        return [
            3,
            base.faction.code,
            base.offFaction.code,
            base.name,
            tiles.join(''),
            base.poi.tiberium,
            base.poi.crystal,
            base.poi.power,
            base.poi.infantry,
            base.poi.vehicle,
            base.poi.air,
            base.poi.defense,
            'newEconomy',
        ].join('|');
    }

    static toStringColor(base: Base): string {
        const output: string[] = [];
        for (let y = 0; y < Base.MaxBaseY; y++) {
            const row: string[] = [];
            for (let x = 0; x < Base.MaxX; x++) {
                const tile = base.getTile(x, y);

                if (tile.code === Tile.Tiberium.code) {
                    row.push(color(' # ', ConsoleColor.Green));
                } else if (tile.code === Tile.Crystal.code) {
                    row.push(color(' # ', ConsoleColor.Blue));
                } else {
                    row.push(' . ');
                }
            }
            output.push(row.join(''));
        }
        return output.join('\n');
    }

    static toString(base: Base) {
        return `[Base ${base.name}:${base.faction}
    buildings: [${base.base
        .filter(x => x != null)
        .map(x => String(x))
        .join('\n\t')})}]
        ]`;
    }
}
