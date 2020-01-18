import { Base91 } from '@cncta/util';

export class DecodeWorldXy {
    static decode(data: string) {
        const headData = Base91.decode(data, 0, 2);
        const x = headData.value & 0x1f;
        const y = (headData.value >> 5) & 0x1f;
        return { x, y };
    }
}
