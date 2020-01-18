import { Point, PoiType } from '@cncta/clientlib';
import { Base91 } from '@cncta/util';
import { WorldSectorDecoder } from './decode.world.sector';
import { DecodeWorldXy } from './decode.world.xy';
export interface WorldSectorObjectPoi extends Point {
    type: 'poi';
    id: number;
    level: number;
    poi: PoiType;
    allianceId: number;
}
export class DecodeWorldPoi {
    static decode(sector: WorldSectorDecoder, data: string): WorldSectorObjectPoi {
        const ctx = { data, offset: 2 };
        const header = Base91.dec(ctx, 4);
        return {
            type: 'poi',
            ...DecodeWorldXy.decode(sector, data),
            level: header & 0xff,
            poi: (header >> 8) & PoiType.Defense,
            allianceId: sector.alliances[(header >> 11) & 0x3ff]?.id ?? 0,
            id: Base91.dec(ctx),
        };
    }
}
