import { BaseY, BaseX } from '../base.const';

export interface Point {
    x: number;
    y: number;
}

export class LocationIter {
    static *xy(xMin: number, xMax: number, yMin: number, yMax: number): Generator<Point> {
        for (let y = yMin; y < yMax; y++) {
            for (let x = xMin; x < xMax; x++) {
                yield { x, y };
            }
        }
    }
    /**
     * Yield XY Points for every within distance of the point
     */
    static *xyDistance(x: number, y: number, maxDistance: number): Generator<Point & { distance: number }> {
        for (const point of LocationIter.xy(x - maxDistance, x + maxDistance, y - maxDistance, y + maxDistance)) {
            const distX = Math.abs(point.x - x);
            const distY = Math.abs(point.y - y);
            const distance = Math.sqrt(distX * distX + distY * distY);
            if (distance >= maxDistance) {
                continue;
            }
            yield { x: point.x, y: point.y, distance };
        }
    }

    /**
     * Yield XY Points for every point inside of a base
     */
    static xyBase(maxY: BaseY = BaseY.Max): Generator<Point> {
        return LocationIter.xy(0, BaseX.Max, 0, maxY);
    }
}
