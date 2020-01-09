import * as Base62 from 'base62';
import { Tile } from './tile';
import { Base } from './base';
import { BaseY, ResourceType, BaseX } from '@cncta/clientlib';
import { LayoutPacker } from '@cncta/util';

export interface Point {
    x: number;
    y: number;
}
export class NumberPacker {
    // pack([23,24])
    static pack(data: number): string;
    static pack(data: Array<number>, join?: string): string;
    static pack(data: Array<number> | number, join = '.'): string {
        if (typeof data === 'number') {
            return Base62.encode(data);
        }
        return data.map(c => NumberPacker.number.pack(c)).join(join);
    }

    static unpack(str: string): number[] {
        return str.split('.').map(c => NumberPacker.number.unpack(c));
    }

    static number = {
        pack(x: number): string {
            return Base62.encode(x);
        },
        unpack(s: string): number {
            return Base62.decode(s);
        },
    };
}

export class BaseIdPacker {
    static pack(base: Base) {
        return NumberPacker.pack([base.worldId, base.cityId, Math.floor(base.updatedAt / 1000)], '');
    }
}

/**
 * Pack a base's layout into a string
 */
export class BaseLayoutPacker {
    static pack(base: Base): string {
        return NumberPacker.pack(BaseLayoutPacker.packLayout(base));
    }
    static unpack(tiles: string): Tile[] {
        return BaseLayoutPacker.unpackLayout(NumberPacker.unpack(tiles));
    }
    static packLayout(base: Base): number[] {
        const output: number[] = [];
        for (let y = 0; y < BaseY.MaxDef; y++) {
            const row: ResourceType[] = [];
            for (let x = 0; x < BaseX.Max; x++) {
                const type = base.getTile(x, y);
                row.push(type.id);
            }
            output.push(LayoutPacker.pack(row));
        }
        return output;
    }
    static unpackLayout(tiles: number[]): Tile[] {
        const output: Tile[] = [];
        for (const row of tiles) {
            for (const tile of LayoutPacker.unpack(row)) {
                output.push(Tile.Id[tile]);
            }
        }
        return output;
    }
}
