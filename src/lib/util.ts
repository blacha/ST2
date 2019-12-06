export function pad(width: number, string: string): string {
    return width <= string.length ? string : pad(width, string + ' ');
}

const Formats = ['', 'K', 'M', 'G', 'T'];
export function formatNumber(num: number): string {
    let current = 0;
    while (num > 1000 && current < Formats.length) {
        current++;
        num /= 1000;
    }

    return num.toFixed(4) + Formats[current];
}
