import { firestore } from 'firebase-admin';
import { CityLayout } from '../api/city.layout';
import { ApiScanRequest, ApiScanResponse } from '../api/request.scan';
import { BaseBuilder } from '../lib/base/base.builder';
import { BasePacker } from '../lib/base/base.packer';
import { ApiCall, ApiRequest } from './api.call';
import { FirestoreAdmin } from './db.admin';

interface BaseLayout {
    layout: string;
    updatedAt: number;
}

export class ApiScan extends ApiCall<ApiScanRequest> {
    path = '/api/v1/world/:worldId/scan/:scanId' as const;
    method = 'post' as const;

    async storeAlliance(worldId: number, allianceId: number, bases?: CityLayout[]) {
        if (bases == null) {
            return;
        }

        const AllianceCollection = FirestoreAdmin.collection('alliance');
        // TODO use a better random id or something
        const allianceDocId = BasePacker.id.pack(worldId, allianceId);
        const doc = AllianceCollection.doc(allianceDocId);

        await FirestoreAdmin.runTransaction(async transaction => {
            const existing = await transaction.get(doc);
            let cities: Record<string, CityLayout> = {};
            if (existing != null && existing.exists) {
                cities = existing.get('cities') ?? {};
            }
            for (const base of bases) {
                cities[BasePacker.number.pack(base.cityId)] = base;
            }
            // TODO trim old bases out if havent been seen in one week?
            await transaction.set(
                doc,
                {
                    cities: cities,
                },
                { merge: true },
            );
        });
    }

    async storeLayouts(worldId: number, scanId: string, layouts: BaseLayout[]) {
        if (layouts.length == 0) {
            return;
        }
        const LayoutCollection = FirestoreAdmin.collection('layout');
        // TODO use a better random id or something
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

    async handle(req: ApiRequest<ApiScanRequest>): Promise<ApiScanResponse> {
        const worldId = Number(req.params.worldId);
        const scanId = req.params.scanId;
        if (scanId == null) {
            throw new Error('Invalid scanId');
        }
        const bases = req.body;

        const output: string[] = [];
        const layouts: Map<string, BaseLayout> = new Map();
        const alliance: Map<number, CityLayout[]> = new Map();
        for (const baseJson of bases) {
            const base = BaseBuilder.load(baseJson);

            if (baseJson.ownerId < 0) {
                const xy = BasePacker.number.pack(BasePacker.xy.pack(base.x, base.y));
                layouts.set(xy, {
                    layout: BasePacker.layout.pack(base.tiles),
                    updatedAt: Date.now(),
                });
            }

            if (baseJson.allianceId != null && baseJson.allianceId > 0) {
                const existing = alliance.get(baseJson.allianceId) ?? [];
                existing.push(baseJson);
                alliance.set(baseJson.allianceId, existing);
            }

            const baseId = BasePacker.id.pack(worldId, baseJson.cityId);

            const BaseCollection = FirestoreAdmin.collection('base');
            await BaseCollection.doc(baseId).set(baseJson);
            output.push(baseId);
        }

        if (alliance.size > 0) {
            for (const key of alliance.keys()) {
                console.log('StoreAlliance', key, alliance.get(key)?.length);
                await this.storeAlliance(worldId, key, alliance.get(key));
            }
        }

        if (layouts.size > 0) {
            console.log('StoreLayouts', scanId, layouts.size);
            await this.storeLayouts(worldId, scanId, Array.from(layouts.values()));
        }

        return { id: output, worldId };
    }
}
