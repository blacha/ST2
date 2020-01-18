import { Base91 } from '@cncta/util';
import { WorldSectorDecoder } from './decode.world.sector';

export class DecodeWorldXy {
    static decode(sector: WorldSectorDecoder, data: string) {
        const headData = Base91.decode(data, 0, 2);
        const x = headData.value & 0x1f;
        const y = (headData.value >> 5) & 0x1f;
        return { x: x + sector.offset.x, y: y + sector.offset.y };
    }
}
