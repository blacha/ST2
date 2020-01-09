import { BaseX, ResourceType } from '@cncta/clientlib';

/**
 *  Pack up a layout into a number per row
 *
 * This packs a layout into 24 bits per row or 48 bytes / layout
 */
export class LayoutPacker {
    static packIndex(tile: ResourceType, x: number): number {
        return tile << (3 * x);
    }

    static pack(tiles: ResourceType[]): number {
        let output = 0;
        for (let x = 0; x < tiles.length; x++) {
            const element = tiles[x];
            output = output | (element << (3 * x));
        }
        return output;
    }
    /** Unpack a resource into a resource type array, will zero pad empty tiles */
    static unpack(num: number): ResourceType[] {
        const output: ResourceType[] = [];
        while (num > 0) {
            output.push(num & 0b111);
            num = num >> 3;
        }

        while (output.length < BaseX.Max) {
            output.push(0);
        }
        return output;
    }
}
