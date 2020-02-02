import { BaseX, BaseY, ResourceType } from '@cncta/clientlib';
import { Base62, LayoutPacker, UnitLocationPacker } from '@cncta/util';
import { Base } from './base';
import { Tile } from './tile';

export interface Point {
    x: number;
    y: number;
}
export class NumberPacker {
    // pack([23,24])
    static pack(data: number): string;
    static pack(data: number[]): string;
    static pack(data: number[] | number): string {
        if (typeof data === 'number') {
            return Base62.encode(data);
        }
        return Base62.pack(data);
    }

    static unpack(str: string): number[] {
        return Base62.unpack(str);
    }

    static number = {
        pack(x: number): string {
            return Base62.encode(x);
        },
        unpack(s: string): number {
            return Base62.decode(s, 0).value;
        },
    };
}

/**
 * Pack a base's layout into a string
 */
export class BaseLayoutPacker {
    static pack(base: Base): string {
        const output: number[] = [];
        for (let y = 0; y < BaseY.MaxDef; y++) {
            const row: ResourceType[] = [];
            for (let x = 0; x < BaseX.Max; x++) {
                const type = base.getTile(x, y);
                row.push(type.id);
            }
            output.push(LayoutPacker.pack(row));
        }
        return Base62.pack(output);
    }

    static unpack(tiles: string): Map<number, Tile> {
        const data = Base62.unpack(tiles);
        const output: Map<number, Tile> = new Map();
        for (let y = 0; y < data.length; y++) {
            const row = LayoutPacker.unpack(data[y]);
            for (let x = 0; x < row.length; x++) {
                const tileId = row[x];
                const tile = Tile.Id[tileId];
                if (tile != Tile.Empty) {
                    output.set(UnitLocationPacker.pack(x, y), tile);
                }
            }
        }
        return output;
    }
}
