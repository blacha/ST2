import { BaseX, BaseY, Point } from '@cncta/clientlib';
import { Base, CncBaseObject } from './base';
import { Tile } from './tile';
export class BaseIter {
    static getSurroundings(base: Base, x: number, y: number, buildings?: number[], tiles?: Tile[]): CncBaseObject[] {
        const output: CncBaseObject[] = [];
        for (let dx = -1; dx < 2; dx++) {
            for (let dy = -1; dy < 2; dy++) {
                const offX = x + dx;
                const offY = y + dy;
                if (offX < 0 || offX >= BaseX.Max) {
                    continue;
                }
                if (offY < 0 || offY >= BaseY.Max) {
                    continue;
                }
                if (offY === y && offX === x) {
                    continue;
                }

                const tile = base.getTile(offX, offY);
                const building = base.getBase(offX, offY);
                if (building == null) {
                    if (tiles && tiles.indexOf(tile) > -1) {
                        output.push({ x: offX, y: offY, tile: tile });
                    }
                    continue;
                }

                if (buildings == null && tiles == null) {
                    output.push({
                        x: offX,
                        y: offY,
                        building: building,
                        tile: tile,
                    });
                    continue;
                }

                if (buildings != null) {
                    if (buildings.indexOf(building.type.id) > -1) {
                        output.push({
                            x: offX,
                            y: offY,
                            building: building,
                            tile: tile,
                        });
                        continue;
                    }
                }

                if (tiles != null) {
                    if (tiles.indexOf(tile) > -1) {
                        output.push({
                            x: offX,
                            y: offY,
                            building: building,
                            tile: tile,
                        });
                        continue;
                    }
                }
            }
        }
        return output;
    }

    static BaseXyIter(x: number, y: number): Generator<Point> {
        return this.getSurroundingXy(x, y, 0, BaseY.MaxBuilding);
    }

    static *getSurroundingXy(x: number, y: number, minY = 0, maxY = BaseY.Max): Generator<Point> {
        for (let dx = -1; dx < 2; dx++) {
            for (let dy = -1; dy < 2; dy++) {
                const offX = x + dx;
                const offY = y + dy;
                if (offX < 0 || offX >= BaseX.Max) {
                    continue;
                }
                if (offY < minY || offY >= maxY) {
                    continue;
                }
                if (offY === y && offX === x) {
                    continue;
                }
                yield { x: offX, y: offY };
            }
        }
    }
}
