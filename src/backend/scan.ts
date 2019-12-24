import { CityLayout } from '../api/city.layout';
import { ApiCall, ApiRequest } from './api.call';
import { Coord, Point } from './coord';

export interface ApiScanResponse {
    worldId: number;
    location: Point;
    base: CityLayout;
}

export interface ApiScanRequest {
    params: { worldId: string; coordId: string };
    body: CityLayout;
    response: ApiScanResponse;
}

export class ApiScan extends ApiCall<ApiScanRequest> {
    path = '/api/v1/world/:worldId/base/:coordId';
    method = 'post' as const;

    async handle(req: ApiRequest<ApiScanRequest>): Promise<ApiScanResponse> {
        const worldId = Number(req.params.worldId);
        const coordId = Number(req.params.coordId);
        if (isNaN(worldId) || worldId < 0 || worldId > 1000) {
            throw new Error('Invalid worldId');
        }
        const location = Coord.fromId(coordId);

        const body = req.body;

        return { worldId, location, base: body };
    }
}
