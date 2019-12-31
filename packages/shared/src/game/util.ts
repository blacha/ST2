export function pad(width: number, string: string): string {
    return width <= string.length ? string : pad(width, string + ' ');
}
