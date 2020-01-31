import { BaseN } from '../base.n';

export type BaseNVarLength = -1;
export type BaseNFormat = Record<string, number | BaseNVarLength>;

/**
 * Pack a collection of numbers into fix width baseN characters
 */
export class BaseNPacker<T extends BaseNFormat> {
    static VarLength: BaseNVarLength = -1 as const;
    private base: BaseN;
    private fields: { name: keyof T; offset: number; length: number; max: number }[];

    constructor(base: BaseN, format: T) {
        this.base = base;
        this.fields = [];
        let offset = 0;

        for (const [name, length] of Object.entries(format)) {
            const max = Math.pow(this.base.base, length);
            this.fields.push({ name, length, offset, max });
            if (length == BaseNPacker.VarLength) {
                break;
            }
            offset += length;
        }
    }

    pack(obj: Record<keyof T, number>): string {
        const output = [];
        for (const field of this.fields) {
            const value = obj[field.name] || 0;
            if (value < 0 || (field.length > 0 && value > field.max)) {
                throw new Error(`field: ${field.name} value is too large value: ${value}, maxValue: ${field.max}`);
            }
            output.push(this.base.encode(value, field.length));
        }
        return output.join('') as string;
    }

    unpack(val: string): Record<keyof T, number> {
        const output: Partial<Record<keyof T, number>> = {};
        let offset = 0;
        for (const field of this.fields) {
            output[field.name] = this.base.decode(val, offset, field.length == -1 ? undefined : field.length).value;
            offset += field.length;
        }
        return output as Record<keyof T, number>;
    }
}
