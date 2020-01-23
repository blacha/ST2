import { TaClient } from '@cncta/client';
import { PlayerName, TimeStamp, WorldId } from '@cncta/clientlib';
import { Duration } from '@cncta/util/src';
import { AccountSessionId, ModelBotConfig, ModelClaimRequest, ModelUtil, Stores } from '@st/model';
import { ApiClaimPlayerAcceptRequest, ApiClaimStartRequest } from '@st/shared';
import { ApiCall, ApiRequest } from '../api.call';
import { BackEndStore } from '../backend.store';

export class ApiClaimPlayerStart extends ApiCall<ApiClaimStartRequest> {
    path = '/api/v1/world/:worldId/player/:player/claim' as const;
    method = 'post' as const;

    async getClient(req: ApiRequest<ApiClaimStartRequest>, botConfig: ModelBotConfig) {
        if (botConfig.isSessionValid()) {
            req.log.info({ expiresAt: botConfig.session.expiresAt }, 'ActiveSession');
            return TaClient.fromSessionId(botConfig.session.id);
        }

        req.log.info({ email: botConfig.email }, 'NewSession');
        const client = new TaClient(botConfig.email, botConfig.password);
        await client.login();

        botConfig.session = {
            id: client.sessionId as AccountSessionId,
            expiresAt: (Date.now() + Duration.minutes(59)) as TimeStamp,
        };
        await BackEndStore.BotConfig.set('bot', botConfig);
        return client;
    }
    async sendMail(req: ApiRequest<ApiClaimStartRequest>, player: PlayerName, claim: ModelClaimRequest) {
        const botConfig = await BackEndStore.BotConfig.get('bot');
        if (botConfig == null) {
            throw new Error('Unable to find bot session');
        }
        const session = await this.getClient(req, botConfig);
        const gameSession = await session.open(claim.worldId);

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

        const player = req.params.player.toLowerCase() as PlayerName;
        const worldId = Number(req.params.worldId) as WorldId;

        const currentClaim = await Stores.ClaimRequest.transaction(player, claim => {
            if (!claim.isAbleToClaim) {
                req.log.warn({ claimAt: claim.messageSentAt, worldId, player }, 'InvalidClaimStart');

                throw new Error('Unable to claim playerId');
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
            throw new Error('Invalid claim');
        }
        const player = claim.id;
        const worldId = claim.worldId;
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

        await Stores.ClaimRequest.delete(player);
        const userObj = await Stores.User.getOrCreate(user.uid);
        userObj.claims.push({ claimId, player });
        await Stores.User.save(userObj);

        return { player, worldId };
    }
}
