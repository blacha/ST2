/** Base91 is how the server communicates to the client */
export class BaseN {
    base: number;
    private chars: string;
    private EncodingTable: string[];
    private DecodingTable: Record<number, number> = {};
    separator: string;
    private separatorCode = -1;
    /** Max length needed to store 2 ** 32 */
    private maxIntLength = -1;

    constructor(chars: string, separator: string) {
        this.base = chars.length;
        this.chars = chars;
        this.EncodingTable = chars.split('');
        this.EncodingTable.forEach((c, index) => (this.DecodingTable[c.charCodeAt(0)] = index));
        this.separator = separator;
        this.separatorCode = separator.charCodeAt(0);
        if (chars.includes(separator)) {
            throw new Error('Separator cannot be included in the encoding chars');
        }
        this.maxIntLength = this.encode(Math.pow(2, 32)).length;
    }

    dec(ctx: { data: string; offset: number }, maxBytes = this.maxIntLength) {
        const { value, bytes } = this.decode(ctx.data, ctx.offset, maxBytes);
        ctx.offset = ctx.offset + bytes;
        return value;
    }

    decode(str: string, offset = 0, maxBytes = this.maxIntLength) {
        let multiplier = 1;
        let value = 0;
        let bytes = 0;
        for (let i = 0; i < maxBytes; i++) {
            bytes++;
            const current = offset + i;

            if (current >= str.length) {
                break;
            }

            const val = str.charCodeAt(current);
            if (val == this.separatorCode) {
                break;
            }

            const charValue = this.DecodingTable[val];
            value = value + multiplier * charValue;
            multiplier = multiplier * this.base;
        }
        return { value, bytes };
    }

    encode(num: number, padLength = 0): string {
        let current = num;
        const output: string[] = [];
        while (current > 0) {
            output.push(this.EncodingTable[current % this.base]);
            current = Math.floor(current / this.base);
        }
        while (output.length < padLength) {
            output.push(this.chars[0]);
        }
        return output.join('');
    }

    pack(data: number[]): string {
        const output = [];
        for (const num of data) {
            output.push(this.encode(num));
        }
        return output.join(this.separator);
    }

    unpack(data: string): number[] {
        const output: number[] = [];
        const ctx = { data, offset: 0 };
        while (ctx.offset < data.length) {
            const decoded = this.dec(ctx);
            output.push(decoded);
        }
        return output;
    }
}
