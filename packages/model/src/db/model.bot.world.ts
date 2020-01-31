import { Model } from './model';
import { WorldId, TimeStamp } from '@cncta/clientlib';

export class ModelBotWorld extends Model<ModelBotWorld> {
    id = 'worlds' as const;
    worlds: { worldId: WorldId; name: string; updatedAt: TimeStamp }[];
    constructor(data?: Partial<ModelBotWorld>) {
        super(data);
        this.worlds = data?.worlds ?? [];
    }
}
