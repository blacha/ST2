import { Model } from './model';
import { WorldId } from '@cncta/clientlib/src';

export class ModelBotWorld extends Model<ModelBotWorld> {
    id = 'worlds' as const;
    worlds: { worldId: WorldId; name: string }[];
    constructor(data?: Partial<ModelBotWorld>) {
        super(data);
        this.worlds = data?.worlds ?? [];
    }
}
