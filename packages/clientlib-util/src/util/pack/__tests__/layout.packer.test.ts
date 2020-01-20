import { ResourceType } from '@cncta/clientlib';
import * as o from 'ospec';
import { Base58 } from '../../base.58';
import { LayoutPacker } from '../layout.packer';

o.spec('LayoutPacker', () => {
    o('should unpack a single row', () => {
        const inputData = [
            ResourceType.Tiberium,
            ResourceType.Tiberium,
            ResourceType.Tiberium,
            0,
            0,
            0,
            0,
            0,
            ResourceType.Crystal,
        ];
        const packed = LayoutPacker.pack(inputData);
        o(packed).equals(33554505);
        const layout = LayoutPacker.unpack(packed);
        o(layout).deepEquals(inputData);
    });

    o('should handle a real base', () => {
        const rows = [
            // Base Layout
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 2, 2, 2, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            // Def Layout
            [4, 0, 0, 0, 0, 0, 0, 0, 6],
            [4, 0, 4, 0, 7, 7, 7, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 4, 0, 0, 5, 0],
            [6, 0, 7, 0, 0, 0, 6, 0, 0],
            [0, 0, 0, 0, 7, 7, 0, 0, 0],
            [4, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 5, 0, 4, 0, 0, 0, 5],
        ];

        for (const row of rows) {
            const packed = LayoutPacker.pack(row);
            const unpacked = LayoutPacker.unpack(packed);
            o(row).deepEquals(unpacked);
        }

        const packed = Base58.pack(rows.map(row => LayoutPacker.pack(row)));
        const unpacked = Base58.unpack(packed).map(c => LayoutPacker.unpack(c));

        o(unpacked).deepEquals(rows);
    });
});
