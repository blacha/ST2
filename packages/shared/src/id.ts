import { Base62, BaseNPacker } from '@cncta/util';
import * as ulid from 'ulid';

export const WorldPlayerId = new BaseNPacker(Base62, { worldId: 2, playerId: -1 });
export const WorldAllianceId = new BaseNPacker(Base62, { worldId: 2, allianceId: -1 });
export const WorldCityId = new BaseNPacker(Base62, { worldId: 2, timestamp: 5, cityId: -1 });

export const Id = {
    generate(): string {
        return ulid.ulid().toLowerCase();
    },
};
