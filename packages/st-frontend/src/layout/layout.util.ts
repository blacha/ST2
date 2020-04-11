import { Base, BaseLayoutPacker } from '@st/shared';
import { WorldId } from '@cncta/clientlib';

const InvalidWorldId = -1 as WorldId;
export interface LayoutData {
    layout: string;
    updatedAt: number;
    x: number;
    y: number;
}

export function unpackLayouts(layoutModel?: LayoutData[], worldId?: WorldId): Base[] {
    if (layoutModel == null) {
        return [];
    }
    const layouts: Base[] = [];
    for (const layoutObj of layoutModel) {
        const base = new Base();
        const { layout, updatedAt, x, y } = layoutObj;
        base.cityId = x * 1000 + y;
        base.x = x;
        base.y = y;
        base.tiles = BaseLayoutPacker.unpack(layout);
        base.updatedAt = updatedAt;
        base.worldId = worldId ?? InvalidWorldId;
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
