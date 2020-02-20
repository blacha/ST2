import { AllianceId, PlayerNameDisplay, PlayerNameId } from '@cncta/clientlib';
import { Model, UId } from './model';
import { ModelWorldAlliance } from './model.world.alliance';

export interface ModelUserClaim {
    player: PlayerNameId;
    claimId: string;

    name: PlayerNameDisplay;
    alliances: Record<number, { validatedBy: ModelWorldAlliance['id']; allianceId: AllianceId }>;
}

export class ModelUser extends Model<ModelUser> {
    /** User Uid */
    id: UId;

    claimed: Record<string, ModelUserClaim> = {};

    v: undefined | 1;
    constructor(data?: ModelUser) {
        super(data);
        this.claimed = data?.claimed ?? {};
        this.v = data?.v;
        if (this.v == undefined) {
            this.migrateClaimsV1(data?.claims);
        }
    }

    private migrateClaimsV1(claims: ModelUserClaim[] | undefined) {
        if (claims == null || claims.length == 0) {
            return;
        }
        for (const claim of claims) {
            claim.alliances = claim.alliances ?? {};
            this.claimed[claim.player] = claim;
        }
        this.v = 1;
    }

    get claims() {
        return Object.values(this.claimed);
    }
}
