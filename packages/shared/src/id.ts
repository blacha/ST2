import { Base62, BaseNPacker } from '@cncta/util';
import * as ulid from 'ulid';

export const WorldPlayerId = new BaseNPacker(Base62, { worldId: 2, playerId: BaseNPacker.VarLength });
export const WorldAllianceId = new BaseNPacker(Base62, { worldId: 2, allianceId: BaseNPacker.VarLength });
export const WorldCityId = new BaseNPacker(Base62, {
    worldId: 2,
    timestamp: BaseNPacker.TimeStampSeconds,
    cityId: BaseNPacker.VarLength,
});

export const Id = {
    generate(): string {
        return ulid.ulid().toLowerCase();
    },
};
