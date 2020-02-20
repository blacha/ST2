import { AllianceId, WorldId, CompositeId } from '@cncta/clientlib';
import { Model } from './model';

export interface ModelLayoutCity {
    /** Packed layout @see BaseLayoutPacker */
    layout: string;
    /** Last time seen */
    updatedAt: number;
    /** First time seen */
    createdAt: number;
}

export class ModelLayout extends Model<ModelLayout> {
    id: CompositeId<[WorldId, AllianceId]>;
    layouts: Record<string, ModelLayoutCity>;
    v?: number;

    constructor(data?: Partial<ModelLayout>) {
        super(data);
        this.layouts = data?.layouts ?? {};
        this.v = data?.v;
        if (this.v == null) {
            this.migrateV1();
        }
    }

    // Force a createdAt timestamp
    migrateV1() {
        for (const obj of Object.values(this.layouts)) {
            obj.createdAt = obj.createdAt ?? obj.updatedAt;
        }
        this.v = 1;
    }
}
