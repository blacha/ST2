import { BaseNPacker } from '../base.n.packer';
import { Base62 } from '../../base.62';
import * as o from 'ospec';

o.spec('BinaryPacker', () => {
    o('should pack numbers', () => {
        const numberPacker = new BaseNPacker(Base62, { worldId: 2, cityId: -1 });

        const tests = [
            { worldId: 0, cityId: 0 },
            { worldId: 8, cityId: 0 },
            { worldId: 255, cityId: 0 },
            { worldId: 255, cityId: 0 },
            { worldId: 255, cityId: 255 },
            { worldId: 999, cityId: 255 },
        ];
        for (const test of tests) {
            const packed = numberPacker.pack(test);
            const unpacked = numberPacker.unpack(packed);
            o(test).deepEquals(unpacked);
        }
    });

    o('should error if number is too large', () => {
        const numberPacker = new BaseNPacker(Base62, { id: 1 });
        o(() => numberPacker.pack({ id: 255 })).throws('field: id value is too large value: 255, maxValue: 62');
    });

    o('should not error for var length numbers', () => {
        const numberPacker = new BaseNPacker(Base62, { id: -1 });
        numberPacker.pack({ id: 2550 });
    });
});
