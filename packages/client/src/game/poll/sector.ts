import { Base91 } from '@cncta/util';

export function getSector(x: number, y: number): string {
    return Base91.encode((y << 8) | x).padEnd(4, 'A') + Base91.Separator;
}
// Split the sectors up into a number of sub queries, not to overload the server in a single query
export function getSectors(x: number, yMax: number) {
    const output = [];
    for (let y = 0; y < yMax; y++) {
        output.push(getSector(x, y));
    }
    return output.join('');
}
