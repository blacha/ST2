import { LocationIter } from '@cncta/plugin';
import { Base } from './base';

export class BaseExporter {
    static toCncOpt(base: Base) {
        const tiles = [];
        for (const { x, y } of LocationIter.xyBase()) {
            const obj = base.getBase(x, y);
            if (obj != null) {
                if (obj.level == 1) {
                    tiles.push(obj.type.code);
                } else {
                    tiles.push(obj.level + obj.type.code);
                }
                continue;
            }
            const tile = base.getTile(x, y);
            if (tile != null) {
                tiles.push(tile.code);
                continue;
            }
            throw new Error('Everything should have a tile');
        }
        return [
            3,
            base.faction.code,
            base.offFaction.code,
            base.name,
            tiles.join(''),
            base.poi.tiberium,
            base.poi.crystal,
            base.poi.power,
            base.poi.infantry,
            base.poi.vehicle,
            base.poi.air,
            base.poi.defense,
            'newEconomy',
        ].join('|');
    }

    static toString(base: Base) {
        return `[Base ${base.name}:${base.faction}
    buildings: [${base.base
        .filter(x => x != null)
        .map(x => String(x))
        .join('\n\t')})}]
        ]`;
    }
}
