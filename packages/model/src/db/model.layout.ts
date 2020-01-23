import { AllianceId, WorldId } from '@cncta/clientlib';
import { Model } from './model';
import { CompositeId } from '@st/shared';

export class ModelLayout extends Model<ModelLayout> {
    id: CompositeId<[WorldId, AllianceId]>;
    layouts: Record<string, { layout: string; updatedAt: number }>;

    constructor(data?: Partial<ModelLayout>) {
        super(data);
        this.layouts = data?.layouts ?? {};
    }
}
