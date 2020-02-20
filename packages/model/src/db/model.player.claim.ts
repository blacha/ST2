import { PlayerNameId, WorldId } from '@cncta/clientlib';
import { Duration } from '@cncta/util';
import { Id } from '@st/shared';
import { InvalidWorldId, Model } from './model';

export class ModelPlayerClaimRequest extends Model<ModelPlayerClaimRequest> {
    id: PlayerNameId;

    worldId: WorldId;
    messageSentAt: number;
    claimId: string;
    userId: string;

    constructor(data?: ModelPlayerClaimRequest) {
        super(data);
        this.worldId = data?.worldId ?? InvalidWorldId;
        this.messageSentAt = data?.messageSentAt ?? -1;
        this.claimId = data?.claimId ?? '';
        this.userId = data?.userId ?? '';
    }

    get isActive() {
        return this.messageSentAt > -1 && this.worldId > -1 && this.claimId != '';
    }

    get isAbleToClaim() {
        return this.messageSentAt == -1 || Date.now() - this.messageSentAt > Duration.days(1);
    }

    claim(worldId: WorldId, userId: string): string {
        this.worldId = worldId;
        this.claimId = Id.generate();
        this.userId = userId;
        return this.claimId;
    }
}
