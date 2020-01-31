import { BaseN } from '../base.n';

const BaseNVarLength: 'VarLength' = 'VarLength' as const;
const BaseNTimeStamp: 'TimeStamp' = 'TimeStamp' as const;
const BaseNTimeStampSeconds: 'TimeStampSeconds' = 'TimeStampSeconds' as const;

// export type BaseNVarLength = -1;
export type BaseNFormat = Record<
    string,
    number | typeof BaseNVarLength | typeof BaseNTimeStamp | typeof BaseNTimeStampSeconds
>;
/** Ulids use 48 bits for timestamps lets just copy that */
const MaxTimeMs = 2 ** 48 - 1;
/** Seconds expire sometime in 3000 */
const MaxTimeSeconds = 2 ** 35 - 1;

/**
 * Pack a collection of numbers into fix width baseN characters
 */
export class BaseNPacker<T extends BaseNFormat> {
    static VarLength: typeof BaseNVarLength = BaseNVarLength;
    static TimeStamp: typeof BaseNTimeStamp = BaseNTimeStamp;
    static TimeStampSeconds: typeof BaseNTimeStampSeconds = BaseNTimeStampSeconds;

    private timeStampSize = 9;
    private timeStampSecondsSize = 5;

    private base: BaseN;

    private fields: { name: keyof T; offset: number; length: number; max: number }[];
    private timestamp?: { name: keyof T; type: typeof BaseNTimeStamp | typeof BaseNTimeStampSeconds };
    private varLength?: { name: keyof T };

    constructor(base: BaseN, format: T) {
        this.base = base;
        this.fields = [];
        let offset = 0;

        this.timeStampSize = this.base.encode(MaxTimeMs).length;
        this.timeStampSecondsSize = this.base.encode(MaxTimeSeconds).length;

        for (const [name, length] of Object.entries(format)) {
            // Timestamp is always first
            if (length == BaseNTimeStamp || length == BaseNTimeStampSeconds) {
                if (this.timestamp != null) {
                    throw new Error(`Duplicate timestamp fields ${this.timestamp.name} vs ${name}`);
                }
                this.timestamp = { name, type: length };
                continue;
            }
            // VarLength is always last
            if (length == BaseNVarLength) {
                if (this.varLength != null) {
                    throw new Error(`Duplicate var length fields ${this.varLength.name} vs ${name}`);
                }
                this.varLength = { name };
                continue;
            }
            const max = Math.pow(this.base.base, length);
            this.fields.push({ name, length, offset, max });
            offset += length;
        }
    }

    pack(obj: Record<keyof T, number>): string {
        const output = [];
        if (this.timestamp) {
            let tsVal = obj[this.timestamp.name] ?? 0;
            let size = this.timeStampSize;
            if (this.timestamp.type == BaseNTimeStampSeconds) {
                tsVal = Math.floor(tsVal / 1000);
                size = this.timeStampSecondsSize;
            }
            const tsEncoded = this.base
                .encodeAry(tsVal, size)
                .reverse() // To have timestamps sortable need to reverse them
                .join('');
            output.push(tsEncoded);
        }
        for (const field of this.fields) {
            const value = obj[field.name] || 0;
            if (value < 0 || value > field.max) {
                throw new Error(`field: ${field.name} value is too large value: ${value}, maxValue: ${field.max}`);
            }
            output.push(this.base.encode(value, field.length));
        }
        if (this.varLength) {
            output.push(this.base.encode(obj[this.varLength.name]));
        }

        return output.join('') as string;
    }

    unpack(val: string): Record<keyof T, number> {
        const output: Partial<Record<keyof T, number>> = {};
        const inputAry = val.split('');
        let offset = 0;
        if (this.timestamp) {
            const size = this.timestamp.type == BaseNTimeStampSeconds ? this.timeStampSecondsSize : this.timeStampSize;
            const tsVal = inputAry.slice(0, size).reverse();
            const bytes = this.base.decode(tsVal, 0, size);
            output[this.timestamp.name] =
                this.timestamp.type == BaseNTimeStampSeconds ? bytes.value * 1000 : bytes.value;
            offset += size;
        }

        for (const field of this.fields) {
            output[field.name] = this.base.decode(inputAry, offset, field.length).value;
            offset += field.length;
        }

        if (this.varLength) {
            output[this.varLength.name] = this.base.decode(inputAry, offset).value;
        }
        return output as Record<keyof T, number>;
    }
}
