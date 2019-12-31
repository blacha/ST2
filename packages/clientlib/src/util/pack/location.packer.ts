import { Point } from '../location';
import { BinaryPacker } from './binary.packer';
import { BaseX } from '../../base.const';

export const BaseLocationPacker = new BinaryPacker({ x: 16, y: 16 });

export class UnitLocationPacker {
    static pack(x: number, y: number) {
        return y * BaseX.Max + x;
    }

    static unpack(xy: number): Point {
        return {
            x: xy % BaseX.Max,
            y: Math.floor(xy / BaseX.Max),
        };
    }
}
