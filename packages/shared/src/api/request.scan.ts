import { StCity } from '@cncta/util';

export interface ApiScanResponse {
    id: string[];
    worldId: number;
}

export interface ApiScanRequest {
    path: '/api/v1/world/:worldId/player/:player/scan';
    method: 'post';
    params: { worldId: number; player: string };
    body: StCity[];
    response: ApiScanResponse;
}
