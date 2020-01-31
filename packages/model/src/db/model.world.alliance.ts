import { AllianceId, WorldId, CompositeId, TimeStamp, PlayerNameId } from '@cncta/clientlib';
import { Model, InvalidWorldId, ModelUtil } from './model';
import { BaseNPacker, Base62 } from '@cncta/util';

const WorldIdTimestamp = new BaseNPacker(Base62, { worldId: 2, time: -1 });

export class ModelWorldAlliance extends Model<ModelWorldAlliance> {
    id: CompositeId<[WorldId, TimeStamp]>;
    worldId: WorldId;
    alliances: Record<AllianceId, PlayerNameId[]>;

    static id(worldId: WorldId, time: TimeStamp = ModelUtil.TimeStamp()) {
        return WorldIdTimestamp.pack({ worldId, time }) as CompositeId<[WorldId, TimeStamp]>;
    }

    constructor(data?: Partial<ModelWorldAlliance>) {
        super(data);
        this.worldId = data?.worldId ?? InvalidWorldId;
        this.alliances = data?.alliances ?? {};
    }
}
