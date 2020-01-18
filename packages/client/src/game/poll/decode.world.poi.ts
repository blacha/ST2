import { PoiType } from '@cncta/clientlib';
import { Base91 } from '@cncta/util';
import { DecodeWorldXy } from './decode.world.xy';

export class DecodeWorldPoi {
    static decode(data: string) {
        const ctx = { data, offset: 2 };
        const header = Base91.dec(ctx, 4);
        const poi = {
            type: 'poi',
            ...DecodeWorldXy.decode(data),
            level: header & 0xff,
            poiType: (header >> 8) & PoiType.Defense,
            allianceId: (header >> 11) & 0x3ff,
        };
        Base91.dec(ctx); // Unknown
        return poi;
    }
}
