import { StCity } from '@cncta/util';
import { WorldId, PlayerNameDisplay } from '@cncta/clientlib';

export interface ApiScanResponse {
    id: string[];
    worldId: number;
}

export interface ApiScanRequest {
    path: '/api/v1/world/:worldId/player/:player/scan';
    method: 'post';
    params: { worldId: WorldId; player: PlayerNameDisplay };
    body: StCity[];
    response: ApiScanResponse;
}
