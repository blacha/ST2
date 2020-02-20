import { PlayerNameDisplay } from '@cncta/clientlib';

export interface ApiLayoutClaimRequest {
    path: '/api/v1/world/:worldId/alliance/:allianceId/layout';
    method: 'post';
    params: { worldId: string; allianceId: string };
    body: { layout: string; player: PlayerNameDisplay };
    response: {};
}
