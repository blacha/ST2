import { BuildingType } from '../building/building.type';
import { GameResource } from '../game.resources';
import { Base } from './base';
import { BaseBuilder } from './base.builder';
import { BaseIter } from './base.iter';
import { Tile } from './tile';

export class BaseOptimizer {
    static buildAccumulators(base: Base) {
        for (const accum of base.info.accumulators) {
            BaseOptimizer.BuildAccumulator(base, accum.x, accum.y);
        }
        // Remove power plants
        // for (const [key, value] of base.base.entries()) {
        //     if (value.type.code == 'p') {
        //         base.base.delete(key);
        //     }
        // }
    }

    static buildSilos(base: Base, minTouch = 4, maxTouch = 6) {
        const silos = base.info.silos;
        for (const resource of ['tiberium', 'crystal', 'mixed', 'power']) {
            const siloData = silos[resource as GameResource];
            if (siloData == null) {
                continue;
            }
            for (let i = minTouch; i <= maxTouch; i++) {
                const toBuild = siloData[i];
                if (toBuild == null) {
                    continue;
                }
                for (const building of toBuild) {
                    BaseBuilder.buildByCode(base, building.x, building.y, 20, BuildingType.GDI.Silo.code);
                }
            }
        }
    }

    static BuildAccumulator(base: Base, x: number, y: number, build = true): number {
        let count = 0;
        if (build) {
            BaseBuilder.buildByCode(base, x, y, 40, BuildingType.GDI.Accumulator.code);
        }

        for (const xy of BaseIter.BaseXyIter(x, y)) {
            const tile = base.getTile(xy.x, xy.y);
            if (tile != Tile.Empty) {
                continue;
            }

            const building = base.getBase(xy.x, xy.y);
            if (building != null) {
                continue;
            }
            count++;
            if (build) {
                BaseBuilder.buildByCode(base, xy.x, xy.y, 12, BuildingType.GDI.PowerPlant.code);
            }
        }
        return count;
    }
}
