import { PlayerNameId } from '@cncta/clientlib';

export interface ApiClaimStartRequest {
    path: '/api/v1/world/:worldId/player/:player/claim';
    method: 'post';
    params: { worldId: number; player: string };
    body: undefined;
    response: {};
}

export interface ApiClaimPlayerAcceptRequest {
    path: '/api/v1/claim/:claimId';
    method: 'get';
    params: { claimId: string };
    body: undefined;
    response: { player: PlayerNameId; worldId: number };
}
