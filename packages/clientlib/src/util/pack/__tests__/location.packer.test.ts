import * as o from 'ospec';
import { LocationIter } from '../../location';
import { BaseLocationPacker, UnitLocationPacker } from '../location.packer';

o.spec('LayoutPacker', () => {
    o('should pack a base location', () => {
        const startPoint = { x: 724, y: 368 };
        const xy = BaseLocationPacker.pack(startPoint);
        o(xy).equals(24117972);
        const point = BaseLocationPacker.unpack(xy);
        o(point).deepEquals(startPoint);
    });

    o('should pack a unit location', () => {
        const xy = UnitLocationPacker.pack(5, 5);
        o(xy).equals(50);
        const point = UnitLocationPacker.unpack(xy);
        o(point).deepEquals({ x: 5, y: 5 });
    });

    o('should pack the entire base', () => {
        for (const { x, y } of LocationIter.xyBase()) {
            const xy = UnitLocationPacker.pack(x, y);
            const point = UnitLocationPacker.unpack(xy);
            o(point).deepEquals({ x, y });
        }
    });
});
