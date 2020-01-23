import { Model } from './model';

export class ModelUser extends Model<ModelUser> {
    /** User Uid */
    id: string;

    claims: { player: string; claimId: string }[];
    constructor(data?: ModelUser) {
        super(data);
        this.claims = data?.claims ?? [];
    }
}
