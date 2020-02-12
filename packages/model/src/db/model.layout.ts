import { AllianceId, WorldId, CompositeId } from '@cncta/clientlib';
import { Model } from './model';

export class ModelLayout extends Model<ModelLayout> {
    id: CompositeId<[WorldId, AllianceId]>;
    layouts: Record<string, { layout: string; updatedAt: number; createdAt?: number }>;

    constructor(data?: Partial<ModelLayout>) {
        super(data);
        this.layouts = data?.layouts ?? {};
    }
}
