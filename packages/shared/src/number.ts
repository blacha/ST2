const Formats = ['', 'K', 'M', 'G', 'T'];
export function formatNumber(num?: number): string {
    if (num == null) {
        return '';
    }
    let current = 0;
    while (num > 1000 && current < Formats.length) {
        current++;
        num /= 1000;
    }

    return num.toFixed(2) + Formats[current];
}
