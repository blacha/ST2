import { Base } from './base';
import { Tile } from './base/tile';
import { Base64 } from './base64';

export class BasePacker {
    static packId(worldId: number, cityId: number) {
        const buf = Buffer.alloc(6);
        buf.writeUInt32BE(cityId, 0);
        buf.writeUInt16BE(worldId, 4);
        return Base64.encode(buf);
    }

    static unpackId(data: string): { worldId: number; cityId: number } {
        const buf = Base64.decode(data);
        const cityId = buf.readUInt32BE(0);
        const worldId = buf.readUInt16BE(4);
        return { worldId, cityId };
    }

    static packRow(tiles: Tile[], y: number): number {
        let outputValue = 0;
        for (let x = 0; x < Base.MaxX; x++) {
            const tile = tiles[y * Base.MaxX + x];

            if (tile == null) {
                continue;
            }
            const tileOffset = tile.id << (x * 3);
            outputValue += tileOffset;
        }
        return outputValue;
    }

    /**
     * Pack tile data into a number array
     * @param tiles tiles to pack
     */
    static packLayout(tiles: Tile[]): number[] {
        const output: number[] = [];
        for (let y = 0; y < Base.MaxDefY; y++) {
            const packed = BasePacker.packRow(tiles, y);
            output.push(packed);
        }
        return output;
    }

    static unpackRow(tile: number, y: number, base: Base) {
        if (tile == 0) {
            return;
        }
        for (let x = 0; x < Base.MaxX; x++) {
            const tileOffset = (tile >> (x * 3)) & 0b111;
            base.setTile(x, y, Tile.Id[tileOffset]);
        }
    }

    /**
     * Unpack a packed layout data
     * @param tiles
     * @param base
     */
    static unpackLayout(tiles: number[], base: Base): void {
        for (let y = 0; y < Base.MaxDefY; y++) {
            BasePacker.unpackRow(tiles[y], y, base);
        }
    }
}
