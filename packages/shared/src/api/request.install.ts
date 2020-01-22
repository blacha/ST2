export interface ApiInstallRequest {
    path: '/api/v1/world/:worldId/install/:installId';
    params: { worldId: number; installId: string };
    body: { player: string };
    response: {};
}
