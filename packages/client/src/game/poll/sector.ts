import { Base91 } from '@cncta/util';

export function getSectorCode(x: number, y: number): string {
    return Base91.encode((y << 8) | x).padEnd(4, 'A') + '-';
}
