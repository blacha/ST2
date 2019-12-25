import { ApiScanRequest, ApiScanResponse } from '../api/request.scan';
import { ApiCall, ApiRequest } from './api.call';
import { Coord } from './coord';
import { FirestoreAdmin } from './db.admin';
import { BaseBuilder } from '../lib/base.builder';
import { BasePacker } from '../lib/base.packer';

export class ApiScan extends ApiCall<ApiScanRequest> {
    path = '/api/v1/world/:worldId/base' as const;
    method = 'post' as const;

    async handle(req: ApiRequest<ApiScanRequest>): Promise<ApiScanResponse> {
        const worldId = Number(req.params.worldId);
        const baseJson = req.body;
        const base = BaseBuilder.load(baseJson);
        const baseId = BasePacker.packId(worldId, baseJson.cityId);

        const BaseCollection = FirestoreAdmin.collection('base');
        await BaseCollection.doc(baseId).set({ ...baseJson, stats: base.stats });

        return { id: baseId, worldId, location: { x: baseJson.x, y: baseJson.y } };
    }
}
