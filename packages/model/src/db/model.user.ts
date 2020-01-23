import { PlayerName } from '@cncta/clientlib';
import { Model, UId } from './model';

export class ModelUser extends Model<ModelUser> {
    /** User Uid */
    id: UId;

    claims: { player: PlayerName; claimId: string }[];
    constructor(data?: ModelUser) {
        super(data);
        this.claims = data?.claims ?? [];
    }
}
