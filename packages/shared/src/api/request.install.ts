import { WorldId, PlayerNameDisplay } from '@cncta/clientlib';

export interface ApiInstallRequest {
    path: '/api/v1/install/:installId';
    method: 'post';
    params: { installId: string };
    body: { worldId: WorldId; player: PlayerNameDisplay };
    response: {};
}

export interface ApiInstallChallengeRequest {
    path: '/api/v1/install/:installId/challenge/:challengeId';
    method: 'post';
    params: { installId: string; challengeId: string };
    body: { worldId: WorldId; player: PlayerNameDisplay };
    response: {};
}
