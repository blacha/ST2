import { BaseNPacker } from '../base.n.packer';
import { Base62 } from '../../base.62';
import * as o from 'ospec';

o.spec('BinaryPacker', () => {
    o('should pack numbers', () => {
        const numberPacker = new BaseNPacker(Base62, { worldId: 2, cityId: BaseNPacker.VarLength });

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

    for (const timeType of [BaseNPacker.TimeStamp, BaseNPacker.TimeStampSeconds]) {
        o(`should pack ${timeType} timestamps in sortable order`, () => {
            const dates = [
                new Date('1970-01-01T00:00:59.000Z').getTime(),
                new Date('2000-01-01T00:00:00.000Z').getTime(),
                new Date('2010-10-10T00:00:00.000Z').getTime(),
                new Date('2010-10-10T00:00:01.000Z').getTime(),
                new Date('2010-10-09T23:59:59.000Z').getTime(),
            ].sort((a, b) => a - b); // sort dates oldest first
            const datePacker = new BaseNPacker(Base62, { time: timeType });
            const packedDates = dates.map(time => datePacker.pack({ time }));

            const currentDate = datePacker.pack({ time: Date.now() });
            for (let i = 0; i < dates.length; i++) {
                const date = packedDates[i];
                o(currentDate > date).equals(true);
                for (let x = i + 1; x < dates.length; x++) {
                    const testDate = packedDates[x];
                    o(date < testDate).equals(true);
                }
            }
        });
    }

    o('should error if number is too large', () => {
        const numberPacker = new BaseNPacker(Base62, { id: 1 });
        o(() => numberPacker.pack({ id: 255 })).throws('field: id value is too large value: 255, maxValue: 62');
    });

    o('should not error for var length numbers', () => {
        const numberPacker = new BaseNPacker(Base62, { id: BaseNPacker.VarLength });
        numberPacker.pack({ id: 2550 });
    });
});
