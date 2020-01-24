import { PlayerNameId, WorldId } from '@cncta/clientlib';
import { ModelClaimRequest, ModelUtil, Stores } from '@st/model';
import { ApiClaimPlayerAcceptRequest, ApiClaimStartRequest } from '@st/shared';
import { ApiCall, ApiRequest } from '../api.call';
import { GameSession } from '../game.session';
import { HttpError } from '../http.error';

export class ApiClaimPlayerStart extends ApiCall<ApiClaimStartRequest> {
    path = '/api/v1/world/:worldId/player/:player/claim' as const;
    method = 'post' as const;

    async sendMail(req: ApiRequest<ApiClaimStartRequest>, player: PlayerNameId, claim: ModelClaimRequest) {
        const gameSession = await GameSession.getClient(req, claim.worldId);
        const playerExists = await gameSession.playerExists(player);
        if (playerExists == false) {
            req.log.warn({ world: claim.worldId, player }, 'Player does not exist');
            throw new Error('Player does not exist');
        }

        gameSession.sendMail(
            player,
            'shockr.dev: Player claim request',
            `Hi

A user has requested to claim this player account on shockr.dev to complete the claiming process please click the link below

[url]https://shockr.dev/claim/${claim.claimId}[/url]
`,
        );
    }

    async handle(req: ApiRequest<ApiClaimStartRequest>): Promise<{}> {
        const user = await this.validateUser(req);
        console.log(user);

        const player = req.params.player.toLowerCase() as PlayerNameId;
        const worldId = Number(req.params.worldId) as WorldId;

        const currentClaim = await Stores.ClaimRequest.transaction(player, claim => {
            if (!claim.isAbleToClaim) {
                req.log.warn({ claimAt: claim.messageSentAt, worldId, player }, 'InvalidClaimStart');
                throw new HttpError(422, 'Unable to claim playerId');
            }
            claim.claim(worldId, user.uid);
        });

        await this.sendMail(req, player, currentClaim);

        await Stores.ClaimRequest.transaction(player, claim => {
            if (claim.userId == user.uid) {
                claim.messageSentAt = ModelUtil.TimeStamp();
            }
        });

        return { status: 'ok' };
    }
}

export class ApiClaimPlayerAccept extends ApiCall<ApiClaimPlayerAcceptRequest> {
    path = '/api/v1/claim/:claimId' as const;
    method = 'get' as const;

    async handle(req: ApiRequest<ApiClaimPlayerAcceptRequest>): Promise<ApiClaimPlayerAcceptRequest['response']> {
        const user = await this.validateUser(req);

        const userId = user.uid;
        const claimId = req.params.claimId;

        const claim = await Stores.ClaimRequest.getBy({ claimId });
        if (claim == null) {
            req.log.warn({ reason: 'missing', claimId }, 'MissingClaim');
            throw new HttpError(422, 'Missing claim');
        }
        const player = claim.id;
        const worldId = claim.worldId;
        if (!claim.isActive) {
            req.log.warn({ reason: 'isValid', player, worldId }, 'InvalidClaim');
            throw new HttpError(422, 'Invalid claim');
        }

        if (claim.worldId != worldId) {
            req.log.warn({ reason: 'worldId', player, claimWorldId: claim.worldId, worldId }, 'InvalidClaim');
            throw new HttpError(422, 'Invalid claim');
        }

        if (claim.claimId != claimId) {
            req.log.warn({ reason: 'claimId', player, claimId, worldId }, 'InvalidClaim');
            throw new HttpError(422, 'Invalid claim');
        }

        req.log.info({ userId, player, worldId, claimId }, 'Claim');

        await Stores.ClaimRequest.delete(player);
        const userObj = await Stores.User.getOrCreate(user.uid);
        // Already claimed
        if (userObj.claims.find(f => f.player == player)) {
            return { player, worldId };
        }
        userObj.claims.push({ claimId, player });
        await Stores.User.save(userObj);

        return { player, worldId };
    }
}
