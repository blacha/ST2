export interface BinaryFormat {
    [fieldName: string]: number;
}

function isNumberArray(x: any): x is number[] {
    return Array.isArray(x) && typeof x[0] == 'number';
}

/**
 * Pack numbers into arbitrary bit length numbers
 *
 * @example
 * ```javascript
 *   const packer = new BinaryPacker({x:8, y:8})
 *   packer.packArgs(0, 255) // 65280
 *   packer.unpack(65280) // {x:0, y: 255}
 * ```
 */
export class BinaryPacker<T extends BinaryFormat> {
    format: T;

    fields: { name: keyof T; offset: number; length: number; mask: number }[] = [];
    constructor(format: T) {
        this.format = format;
        let offset = 0;
        for (const [name, length] of Object.entries(format)) {
            const mask = (1 << length) - 1;
            this.fields.push({ name, length, offset, mask });
            offset += length;
            if (offset > 32) {
                throw new Error('Unable to pack more than 32 bits');
            }
        }
    }

    /**
     * Pack arguments using args
     *
     * @example
     * ```
     * packer.unpack(packer.pack(5, 25)) // { x: 5, y :25 }
     *```
     * @param data
     */
    pack(...data: number[]): number;
    /**
     * Pack a object
     * @example
     * ```
     * packer.unpack(packer.pack({x: 5, y: 25})) // { x: 5, y :25 }
     *```
     * @param k
     */
    pack(obj: Record<keyof T, number>): number;
    pack(...obj: [Record<keyof T, number>] | number[]) {
        let output = 0;
        if (isNumberArray(obj)) {
            for (let i = 0; i < this.fields.length; i++) {
                const field = this.fields[i];
                const value = obj[i];

                if (value > field.mask || value < 0) {
                    throw new Error(`Field:${field.name} is outside mask range mask:0-${field.mask} value: ${value}`);
                }
                output = output | (value << field.offset);
            }
        } else {
            const [values] = obj;
            for (const field of this.fields) {
                const value = values[field.name] ?? 0;

                if (value > field.mask || value < 0) {
                    throw new Error(`Field:${field.name} is outside mask range mask:0-${field.mask} value: ${value}`);
                }
                output = output | (value << field.offset);
            }
        }
        return output;
    }

    /**
     * Unpack a number into the structure
     * @param num
     */
    unpack(num: number): Record<keyof T, number> {
        let current = num;
        const output: Partial<Record<keyof T, number>> = {};
        for (const field of this.fields) {
            output[field.name] = current & field.mask;
            current = current >> field.length;
        }
        return output as Record<keyof T, number>;
    }
}
