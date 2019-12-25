import { ApiScanRequest, ApiScanResponse } from '../api/request.scan';
import { ApiCall, ApiRequest } from './api.call';
import { Coord } from './coord';
import { FirestoreAdmin } from './db.admin';
import { Id } from '../lib/uuid';

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
        const BaseCollection = FirestoreAdmin.collection('base');

        const baseLocation = `w${worldId}c${coordId}`;
        const base = req.body;

        await BaseCollection.doc(baseLocation).set({ ...base, worldId, coordId });

        return { id: baseLocation, worldId, location };
    }
}
