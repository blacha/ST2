import { Point } from '../backend/coord';
import { CityLayout } from './city.layout';

export interface ApiScanResponse {
    id: string;
    worldId: number;
    location: Point;
}

export interface ApiScanRequest {
    path: '/api/v1/world/:worldId/base';
    params: { worldId: number };
    body: CityLayout;
    response: ApiScanResponse;
}
