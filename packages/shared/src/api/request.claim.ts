import { PlayerNameId, WorldId } from '@cncta/clientlib';
import { ApiFunc } from './api.func';

export interface ApiClaimStartRequest extends ApiFunc {
    path: '/api/v1/world/:worldId/player/:player/claim';
    method: 'post';
    params: { worldId: WorldId; player: PlayerNameId };
    body: undefined;
    response: {};
}

export interface ApiClaimPlayerAcceptRequest extends ApiFunc {
    path: '/api/v1/claim/:claimId';
    method: 'get';
    params: { claimId: string };
    body: undefined;
    response: { worldId: WorldId; player: PlayerNameId };
}
