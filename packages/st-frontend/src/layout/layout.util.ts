import { BaseLocationPacker } from '@cncta/util';
import { ModelLayout } from '@st/model';
import { Base, BaseLayoutPacker, NumberPacker } from '@st/shared';

export function unpackLayouts(layoutModel?: ModelLayout): Base[] {
    if (layoutModel == null) {
        return [];
    }
    const layouts: Base[] = [];
    for (const [key, data] of Object.entries(layoutModel.layouts)) {
        const xy = BaseLocationPacker.unpack(NumberPacker.unpack(key)[0]);
        const base = new Base();
        base.cityId = key as any;
        base.x = xy.x;
        base.y = xy.y;
        const { layout, updatedAt } = data;
        base.tiles = BaseLayoutPacker.unpack(layout);
        base.updatedAt = updatedAt;
        layouts.push(base);
    }

    return layouts.sort((a: Base, b: Base) => {
        const statsA = a.info.silos;
        const statsB = b.info.silos;
        if (
            statsA.tiberium.score == statsB.tiberium.score ||
            (statsA.tiberium.score < 10 && statsB.tiberium.score < 10)
        ) {
            return b.info.score - a.info.score;
        }
        return statsB.tiberium.score - statsA.tiberium.score;
    });
}
