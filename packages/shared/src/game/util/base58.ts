const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

const ALPHABET_MAP: Record<string, number> = {};

for (let i = 0; i < ALPHABET.length; i++) {
    const char = ALPHABET[i];
    ALPHABET_MAP[char] = i;
}

export class Base58 {
    static encode(buffer: Uint8Array) {
        let carry, j;
        if (buffer.length === 0) {
            return '';
        }

        const digits = [0];
        let i = 0;
        while (i < buffer.length) {
            j = 0;
            while (j < digits.length) {
                digits[j] <<= 8;
                j++;
            }
            digits[0] += buffer[i];
            carry = 0;
            j = 0;
            while (j < digits.length) {
                digits[j] += carry;
                carry = (digits[j] / 58) | 0;
                digits[j] %= 58;
                ++j;
            }
            while (carry) {
                digits.push(carry % 58);
                carry = (carry / 58) | 0;
            }
            i++;
        }
        i = 0;
        while (buffer[i] === 0 && i < buffer.length - 1) {
            digits.push(0);
            i++;
        }
        return digits
            .reverse()
            .map(function(digit) {
                return ALPHABET[digit];
            })
            .join('');
    }

    static decode(string: string): Uint8Array {
        let c, carry, j;
        if (string.length === 0) {
            return new Uint8Array(0);
        }
        const bytes = [0];
        let i = 0;
        while (i < string.length) {
            c = string[i];
            if (!(c in ALPHABET_MAP)) {
                throw "Base58.decode received unacceptable input. Character '" + c + "' is not in the Base58 alphabet.";
            }
            j = 0;
            while (j < bytes.length) {
                bytes[j] *= 58;
                j++;
            }
            bytes[0] += ALPHABET_MAP[c];
            carry = 0;
            j = 0;
            while (j < bytes.length) {
                bytes[j] += carry;
                carry = bytes[j] >> 8;
                bytes[j] &= 0xff;
                ++j;
            }
            while (carry) {
                bytes.push(carry & 0xff);
                carry >>= 8;
            }
            i++;
        }
        i = 0;
        while (string[i] === '1' && i < string.length - 1) {
            bytes.push(0);
            i++;
        }
        return new Uint8Array(bytes.reverse());
    }
}
