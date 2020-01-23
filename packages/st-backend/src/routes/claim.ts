import { PlayerName, WorldId } from '@cncta/clientlib';
import { Stores } from '@st/model';
import { ApiClaimPlayerRequest, ApiClaimStartRequest } from '@st/shared';
import { ApiCall, ApiRequest } from '../api.call';

export class ApiClaimStart extends ApiCall<ApiClaimStartRequest> {
    path = '/api/v1/world/:worldId/player/:player/claim' as const;
    method = 'post' as const;

    async handle(req: ApiRequest<ApiClaimStartRequest>): Promise<{}> {
        const user = await this.validateUser(req);
        console.log(user);

        const player = req.params.player as PlayerName;
        const worldId = Number(req.params.worldId) as WorldId;

        await Stores.ClaimRequest.transaction(player, claim => {
            if (!claim.isAbleToClaim) {
                req.log.warn({ claimAt: claim.messageSentAt, worldId, player }, 'InvalidClaimStart');

                throw new Error('Unable to claim playerId');
            }
            claim.claim(worldId, user.uid);
        });
        // TODO send mail message to confirm
        return {};
    }
}

export class ApiClaimPlayer extends ApiCall<ApiClaimPlayerRequest> {
    path = '/api/v1/world/:worldId/player/:player/claim/:claimId' as const;
    method = 'get' as const;

    async handle(req: ApiRequest<ApiClaimPlayerRequest>): Promise<{}> {
        const user = await this.validateUser(req);

        const userId = user.uid;
        const player = req.params.player as PlayerName;
        const claimId = req.params.claimId;
        const worldId = Number(req.params.worldId) as WorldId;

        const claim = await Stores.ClaimRequest.getOrCreate(player);
        if (!claim.isActive) {
            req.log.warn({ reason: 'isValid', player, worldId }, 'InvalidClaim');
            throw new Error('Invalid claim');
        }

        if (claim.worldId != worldId) {
            req.log.warn({ reason: 'worldId', player, claimWorldId: claim.worldId, worldId }, 'InvalidClaim');
            throw new Error('Invalid claim');
        }
        if (claim.claimId != claimId) {
            req.log.warn({ reason: 'claimId', player, claimId, worldId }, 'InvalidClaim');
            throw new Error('Invalid claim');
        }

        req.log.info({ userId, player, worldId, claimId }, 'Claim');

        const userObj = await Stores.User.getOrCreate(user.uid);
        userObj.claims.push({ claimId, player });
        await Stores.User.save(userObj);

        return {};
    }
}
