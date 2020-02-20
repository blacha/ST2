import { PlayerNameId, WorldId, PlayerNameDisplay } from '@cncta/clientlib';
import { V2PlayerClaim, V2PlayerClaimAccept } from '@st/api/build/v2/v2.player.claim';
import { ModelPlayerClaimRequest, ModelUtil, Stores } from '@st/model';
import { TypeOf } from 'io-ts';
import { GameSession } from '../../game.session';
import { HttpError } from '../../http.error';
import { V2ApiHandler, V2Request } from '../v2.request';

export class V2PlayerClaimService extends V2ApiHandler<typeof V2PlayerClaim> {
    def = V2PlayerClaim;

    async sendMail(req: V2Request, player: PlayerNameId, claim: ModelPlayerClaimRequest) {
        const gameSession = await GameSession.getClient(req, claim.worldId);
        const playerExists = await gameSession.playerExists(player);
        if (playerExists == false) {
            req.log.warn({ world: claim.worldId, player }, 'Player does not exist');
            throw new Error('Player does not exist');
        }

        req.log.info({ player }, 'SendMail');

        gameSession.sendMail(
            player,
            'shockr.dev: Player claim request',
            `Hi

A user has requested to claim this player account on shockr.dev to complete the claiming process please click the link below

[url]https://shockr.dev/claim/${claim.claimId}[/url]
`,
        );
    }

    async handle(req: V2Request, params: TypeOf<typeof V2PlayerClaim['request']>): Promise<{}> {
        const userId = await req.userId();
        const { player, worldId } = params;

        req.logContext['player'] = player;
        req.logContext['worldId'] = worldId;

        const currentClaim = await Stores.ClaimRequest.transaction(player, claim => {
            if (!claim.isAbleToClaim) {
                req.log.warn({ claimAt: claim.messageSentAt, worldId, player: player }, 'InvalidClaimStart');
                throw new HttpError(422, 'Unable to claim playerId');
            }
            claim.claim(worldId, userId);
        });

        await this.sendMail(req, player, currentClaim);

        await Stores.ClaimRequest.transaction(player, claim => {
            if (claim.userId == userId) {
                claim.messageSentAt = ModelUtil.TimeStamp();
            }
        });

        return { status: 'ok' };
    }
}

export class V2PlayerClaimAcceptService extends V2ApiHandler<typeof V2PlayerClaimAccept> {
    def = V2PlayerClaimAccept;
    async handle(req: V2Request, params: { claimId: string }): Promise<{ worldId: WorldId; player: PlayerNameId }> {
        const userId = await req.userId();
        const claimId = params.claimId;
        req.logContext['userId'] = userId;
        req.logContext['claimId'] = claimId;

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
        Stores.User.transaction(userId, userObj => {
            // Already claimed
            if (userObj.claims.find(f => f.player == player)) {
                return;
            }
            userObj.claims.push({ claimId, player, alliances: {}, name: '' as PlayerNameDisplay });
        });
        return { player, worldId };
    }
}
