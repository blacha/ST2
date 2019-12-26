import * as Base62 from 'base62';
import { Tile } from './tile';

export interface Point {
    x: number;
    y: number;
}
export class BasePacker {
    static number = {
        pack(x: number): string {
            return Base62.encode(x);
        },
        unpack(s: string): number {
            return Base62.decode(s);
        },
    };

    static multi = {
        pack(...data: Array<number | string>) {
            return data
                .map(c => {
                    if (typeof c === 'number') {
                        return BasePacker.number.pack(c);
                    }
                    return c;
                })
                .join('.');
        },
    };

    static xy = {
        pack(x: number, y: number): number {
            return (y << 0x10) | x;
        },
        /** Pack a XY as a string */
        packS(x: number, y: number): string {
            return BasePacker.number.pack(this.pack(x, y));
        },

        unpack(num: number): Point {
            return { y: num >> 0x10, x: num & 0xffff };
        },
        /** Unpack a XY string */
        unpackS(num: string): Point {
            return this.unpack(BasePacker.number.unpack(num));
        },
    };

    static scan = {
        pack(worldId: number, scanId: string) {
            return scanId + '.' + Base62.encode(worldId);
        },
    };

    static id = {
        pack(worldId: number, cityId: number) {
            return Base62.encode(cityId) + '.' + Base62.encode(worldId);
        },

        unpack(data: string): { worldId: number; cityId: number } {
            const [cityId, worldId] = data.split('.').map(c => Base62.decode(c));
            return { worldId, cityId };
        },
    };

    static layout = {
        pack(tiles: Tile[]) {
            let tile = Tile.Empty;
            let count = 0;
            const output = [];

            for (const tIn of tiles) {
                const t = tIn || Tile.Empty;
                if (t.code === tile.code) {
                    count++;
                    continue;
                }
                if (count == 1) {
                    output.push(tile.code);
                } else if (count > 0) {
                    output.push(`${count}${tile.code}`);
                }
                tile = t;
                count = 1;
            }

            if (tile != Tile.Empty) {
                if (count == 1) {
                    output.push(tile.code);
                } else if (count > 0) {
                    output.push(`${count}${tile.code}`);
                }
            }
            return output.join('');
        },
        unpack(str: string): Tile[] {
            const output: Tile[] = [];
            let currentCount = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charAt(i);
                const intNum = parseInt(char);
                if (!isNaN(intNum)) {
                    currentCount = currentCount * 10 + intNum;
                    continue;
                }

                const toSet = currentCount || 1;
                const tile = Tile.Map[char];
                for (let x = 0; x < toSet; x++) {
                    output.push(tile);
                }
                currentCount = 0;
            }

            return output;
        },
    };
}
