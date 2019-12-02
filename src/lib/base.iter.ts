import { Base, CncBaseObject, CncLocation } from "./base";
import { Tile } from "./base/tile";
import { Constants } from "./constants";


export class BaseIter {
    static getSurroundings(base: Base, x: number, y: number, buildings?: number[], tiles?: Tile[]): CncBaseObject[] {
        const output: CncBaseObject[] = [];
        for (let dx = -1; dx < 2; dx++) {
            for (let dy = -1; dy < 2; dy++) {
                const offX = x + dx;
                const offY = y + dy;
                if (offX < 0 || offX > Constants.MAX_BASE_X) {
                    continue;
                }
                if (offY < 0 || offY > Constants.MAX_BASE_Y) {
                    continue;
                }
                if (offY === y && offX === x) {
                    continue;
                }

                const building = base.getBase(offX, offY);
                const tile = base.getTile(offX, offY);
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
                    //console.log(building.getID(), building.getName(), buildings);
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
                    //console.log(tile.getCode(), tiles);
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

    static getSurroundingXy(x: number, y: number): CncLocation[] {
        const output = [];
        for (let dx = -1; dx < 2; dx++) {
            for (let dy = -1; dy < 2; dy++) {
                const offX = x + dx;
                const offY = y + dy;
                if (offX < 0 || offX > Constants.MAX_BASE_X) {
                    continue;
                }
                if (offY < 0 || offY > Constants.MAX_BASE_Y) {
                    continue;
                }
                if (offY === y && offX === x) {
                    continue;
                }
                output.push({ x: offX, y: offY });
            }
        }

        return output;
    }
}
