import { ApiScanRequest, ApiScanResponse } from '../api/request.scan';
import { BaseBuilder } from '../lib/base.builder';
import { BasePacker } from '../lib/base.packer';
import { ApiCall, ApiRequest } from './api.call';
import { FirestoreAdmin } from './db.admin';
import { firestore } from 'firebase-admin';

interface BaseLayout {
    layout: string;
    updatedAt: number;
}

export class ApiScan extends ApiCall<ApiScanRequest> {
    path = '/api/v1/world/:worldId/scan/:scanId' as const;
    method = 'post' as const;

    async handle(req: ApiRequest<ApiScanRequest>): Promise<ApiScanResponse> {
        const worldId = Number(req.params.worldId);
        const scanId = req.params.scanId;
        if (scanId == null) {
            throw new Error('Invalid scanId');
        }
        const bases = req.body;

        const output: string[] = [];
        const layouts: Map<string, BaseLayout> = new Map();
        for (const baseJson of bases) {
            const base = BaseBuilder.load(baseJson);

            if (baseJson.ownerId < 0) {
                const xy = BasePacker.number.pack(BasePacker.xy.pack(base.x, base.y));
                layouts.set(xy, {
                    layout: BasePacker.layout.pack(base.tiles),
                    updatedAt: Date.now(),
                });
            }

            const baseId = BasePacker.id.pack(worldId, baseJson.cityId);

            const BaseCollection = FirestoreAdmin.collection('base');
            await BaseCollection.doc(baseId).set({
                ...baseJson,
                stats: base.stats,
                updatedAt: firestore.FieldValue.serverTimestamp(),
            });
            output.push(baseId);
        }

        // TODO use a alliance id or something
        if (layouts.size > 0) {
            const LayoutCollection = FirestoreAdmin.collection('layout');
            const scanDoc = BasePacker.scan.pack(worldId, scanId);
            const doc = LayoutCollection.doc(scanDoc);
            await FirestoreAdmin.runTransaction(async transaction => {
                const existing = await transaction.get(doc);
                let existingLayouts: Record<string, BaseLayout> = {};
                if (existing != null && existing.exists) {
                    existingLayouts = existing.get('layouts') ?? {};
                }
                for (const [xy, layout] of layouts.entries()) {
                    existingLayouts[xy] = layout;
                }
                await transaction.set(
                    doc,
                    {
                        layouts: existingLayouts,
                    },
                    { merge: true },
                );
            });
        }
        return { id: output, worldId };
    }
}
