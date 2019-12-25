import { Point } from '../backend/coord';
import { CityLayout } from './city.layout';

export interface ApiScanResponse {
    id: string;
    worldId: number;
    location: Point;
}

export interface ApiScanRequest {
    path: '/api/v1/world/:worldId/base/:coordId';
    params: { worldId: string; coordId: string };
    body: CityLayout;
    response: ApiScanResponse;
}
