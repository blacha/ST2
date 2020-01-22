export interface ApiInstallRequest {
    path: '/api/v1/world/:worldId/player/:player/install/:installId';
    method: 'get';
    params: { worldId: number; installId: string; player: string };
    body: undefined;
    response: {};
}
