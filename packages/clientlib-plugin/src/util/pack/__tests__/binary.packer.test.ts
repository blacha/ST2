import * as o from 'ospec';
import { BinaryPacker } from '../binary.packer';

o.spec('BinaryPacker', () => {
    o('should pack numbers', () => {
        const numberPacker = new BinaryPacker({ x: 8, y: 8, z: 8 });
        o(numberPacker.pack({ x: 0, y: 0, z: 0 })).equals(0);
        o(numberPacker.pack({ x: 8, y: 0, z: 0 })).equals(8);
        o(numberPacker.pack({ x: 255, y: 0, z: 0 })).equals(255);
        o(numberPacker.pack({ x: 255, y: 255, z: 0 })).equals(255 + (255 << 8));
        o(numberPacker.pack({ x: 255, y: 255, z: 255 })).equals(255 + (255 << 8) + (255 << 16));
    });

    o('should unpack numbers', () => {
        const numberPacker = new BinaryPacker({ x: 8, y: 16 });
        for (let i = 0; i < 100; i += 3) {
            const data = { x: i, y: i * 2 };
            const packed = numberPacker.pack(data);
            const unpacked = numberPacker.unpack(packed);
            o(unpacked).deepEquals(data);
        }
    });

    o('should error if more than 32 bits are packed', () => {
        try {
            new BinaryPacker({ x: 16, y: 16, level: 16 });
            o(false).equals(true);
        } catch (e) {
            o(e.message).equals('Unable to pack more than 32 bits');
        }
    });
    o('should error if number is too large', () => {
        const small = new BinaryPacker({ x: 1 });
        try {
            small.pack({ x: 100 });
            o(false).equals(true);
        } catch (e) {
            o(e.message).equals('Field:x is outside mask range mask:0-1 value: 100');
        }
    });
});
