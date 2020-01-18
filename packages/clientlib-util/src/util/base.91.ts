/** Base91 is how the server communicates to the client */
export class Base91 {
    static Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,. :;<=>?@[]^_`{|}~'";
    static EncodingTable = Base91.Chars.split('');
    static DecodingTable: Record<number, number> = {};
    static Separator = '-';
    static SeparatorCode = Base91.Separator.charCodeAt(0);

    data: string;
    offset: number;

    constructor(data: string, offset: number) {
        if (offset === void 0) {
            offset = 0;
        }
        this.data = data;
        this.offset = offset;
    }

    static dec(ctx: { data: string; offset: number }, maxBytes = 5) {
        const { value, bytes } = this.decode(ctx.data, ctx.offset, maxBytes);
        ctx.offset = ctx.offset + bytes;
        return value;
    }

    static decode(str: string, offset = 0, maxBytes = 5) {
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
            if (val == Base91.SeparatorCode) {
                break;
            }
            const charValue = Base91.DecodingTable[val];
            value = value + multiplier * charValue;
            multiplier = multiplier * 91;
        }
        return { value, bytes };
    }

    static encode(num: number): string {
        let current = num;
        const output: string[] = [];
        for (let i = 0; i < 5; i++) {
            if (i == 0 && current == 0) {
                output.push('AA');
                break;
            } else if (i == 1 && current == 0) {
                output.push('A');
                break;
            } else if (current == 0) {
                break;
            }

            output.push(Base91.EncodingTable[current % 91]);
            current = Math.floor(current / 91);
        }
        return output.join('');
    }
}
Base91.EncodingTable.forEach((c, index) => (Base91.DecodingTable[c.charCodeAt(0)] = index));
