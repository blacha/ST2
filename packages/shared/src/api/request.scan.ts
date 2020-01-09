import { StCity } from '@cncta/plugin';

export interface ApiScanResponse {
    id: string[];
    worldId: number;
}

export interface ApiScanRequest {
    path: '/api/v1/world/:worldId/scan/:scanId';
    params: { worldId: number; scanId: string };
    body: StCity[];
    response: ApiScanResponse;
}
