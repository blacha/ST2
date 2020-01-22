export interface ApiClaimStartRequest {
    path: '/api/v1/world/:worldId/player/:player/claim';
    params: { worldId: number; player: string };
    body: undefined;
    response: {};
}

export interface ApiClaimPlayerRequest {
    path: '/api/v1/world/:worldId/player/:player/claim/:claimId';
    params: { worldId: number; claimId: string; player: string };
    body: undefined;
    response: {};
}
