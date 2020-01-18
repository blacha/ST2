import { Point, WorldObjectType } from '@cncta/clientlib';
import { Base91 } from '@cncta/util';
import { PollResultWorld } from '../requests/poll';
import { DecodeWorldCity } from './decode.world.city';
import { DecodeWorldNpcBase } from './decode.world.npc.base';
import { DecodeWorldPoi } from './decode.world.poi';

const SectorSize = 32;
export class WorldDecoder {
    static decode(result: PollResultWorld) {
        for (const sector of result.d.s) {
            const x = sector.i & 0xff;
            const y = sector.i >> 8;
            const sectorXy = { x: x * SectorSize, y: y * SectorSize };
            // this.decodeAlliances(sector.a);
            // this.decodePlayers(sector.p);
            if (sector.d) {
                this.decodeObjects(sector.d, sectorXy);
            }
            if (sector.d) {
                break;
            }
        }
    }

    static decodeByType(type: WorldObjectType, obj: string) {
        switch (type) {
            case WorldObjectType.NPCCamp:
                break;
            case WorldObjectType.NPCBase:
                return DecodeWorldNpcBase.decode(obj);
            case WorldObjectType.City:
                return DecodeWorldCity.decode(obj);
            case WorldObjectType.PointOfInterest:
                return DecodeWorldPoi.decode(obj);
        }
        return null;
    }

    static decodeObjects(o: string[], xy: Point) {
        let i = 0;
        for (const obj of o) {
            const headData = Base91.decode(obj, 0, 2);
            const type = headData.value >> 10;
            const output = this.decodeByType(type, obj);
            if (output == null || output.type == 'base') {
                continue;
            }

            if (output.x) {
                output.x = output.x + xy.x;
                output.y = output.y + xy.y;
            }

            console.log('Objects', obj, output.x, output.y, type, output);
            i++;
            if (i > 50) break;
        }
    }
}
