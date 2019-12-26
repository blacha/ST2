export function pad(width: number, string: string): string {
    return width <= string.length ? string : pad(width, string + ' ');
}

const Formats = ['', 'K', 'M', 'G', 'T'];
export function formatNumber(num?: number): string {
    if (num == 0 || num == null) {
        return '';
    }
    let current = 0;
    while (num > 1000 && current < Formats.length) {
        current++;
        num /= 1000;
    }

    return num.toFixed(2) + Formats[current];
}

export enum ConsoleColor {
    Green = `\x1b[32m`,
    Blue = `\x1b[34m`,
    Reset = `\x1b[0m`,
}

export function color(char: string, color: ConsoleColor) {
    return `${color}${char}${ConsoleColor.Reset}`;
}
