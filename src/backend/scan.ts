import { firestore } from 'firebase-admin';
import { CityLayout } from '../api/city.layout';
import { ApiScanRequest, ApiScanResponse } from '../api/request.scan';
import { BaseBuilder } from '../lib/base/base.builder';
import { BasePacker } from '../lib/base/base.packer';
import { ApiCall, ApiRequest } from './api.call';
import { FirestoreAdmin } from './db.admin';
import { Id } from '../lib/id';
import { DbPlayer, BaseLayout } from './db/db.player';
import { DbLayout } from './db/db.base';

export class ApiScan extends ApiCall<ApiScanRequest> {
    path = '/api/v1/world/:worldId/scan/:scanId' as const;
    method = 'post' as const;

    async storePlayer(worldId: number, playerId: number, baseList?: CityLayout[]) {
        if (baseList == null) {
            return;
        }

        const [firstBase] = baseList;
        const { ownerId, allianceId } = firstBase;
        const PlayerCollection = FirestoreAdmin.collection('player');
        // TODO use a better random id or something
        const playerDocId = BasePacker.id.pack(worldId, playerId);
        const doc = PlayerCollection.doc(playerDocId);

        await FirestoreAdmin.runTransaction(async transaction => {
            const existing = await transaction.get(doc);
            let bases: Record<string, CityLayout> = {};
            let allianceKey = BasePacker.multi.pack(worldId, allianceId ?? Id.generate());
            let createdAt = Date.now();

            if (existing != null && existing.exists) {
                bases = existing.get('bases') ?? {};
                allianceKey = existing.get('allianceKey');
                createdAt = existing.get('createdAt') ?? Date.now();
            }
            for (const base of baseList) {
                bases[BasePacker.number.pack(base.cityId)] = base;
            }
            const updatedObject: Partial<DbPlayer> = {
                allianceId,
                allianceKey,
                ownerId,
                worldId,
                bases,
                createdAt,
                updatedAt: Date.now(),
            };
            console.log('SetPlayer', { allianceKey, playerDocId, bases: bases.length });
            await transaction.set(doc, updatedObject, { merge: true });
        });
    }

    async storeLayouts(worldId: number, scanId: string, layoutsList: BaseLayout[]) {
        if (layoutsList.length == 0) {
            return;
        }
        const LayoutCollection = FirestoreAdmin.collection('layout');
        // TODO use a better random id or something
        const scanDoc = BasePacker.scan.pack(worldId, scanId);
        const doc = LayoutCollection.doc(scanDoc);
        await FirestoreAdmin.runTransaction(async transaction => {
            const existing = await transaction.get(doc);
            let layouts: Record<string, BaseLayout> = {};
            let createdAt = Date.now();
            if (existing != null && existing.exists) {
                layouts = existing.get('layouts') ?? {};
                createdAt = existing.get('createdAt') ?? Date.now();
            }
            for (const [xy, layout] of layoutsList.entries()) {
                layouts[xy] = layout;
            }
            const dbObject: DbLayout = { layouts, createdAt, updatedAt: Date.now() };
            await transaction.set(doc, dbObject, { merge: true });
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
        const players: Map<number, CityLayout[]> = new Map();
        for (const baseJson of bases) {
            const base = BaseBuilder.load(baseJson);

            if (baseJson.ownerId < 0) {
                const xy = BasePacker.xy.packS(base.x, base.y);
                layouts.set(xy, {
                    layout: BasePacker.layout.pack(base.tiles),
                    updatedAt: Date.now(),
                });
            } else {
                const existing = players.get(baseJson.ownerId) ?? [];
                existing.push(baseJson);
                players.set(baseJson.ownerId, existing);
            }

            const baseId = BasePacker.id.pack(worldId, baseJson.cityId);

            const BaseCollection = FirestoreAdmin.collection('base');
            await BaseCollection.doc(baseId).set(baseJson);
            output.push(baseId);
        }

        if (players.size > 0) {
            for (const playerId of players.keys()) {
                console.log('StorePlayer', { playerId }, players.get(playerId)?.length);
                await this.storePlayer(worldId, playerId, players.get(playerId));
            }
        }

        if (layouts.size > 0) {
            console.log('StoreLayouts', scanId, layouts.size);
            await this.storeLayouts(worldId, scanId, Array.from(layouts.values()));
        }

        return { id: output, worldId };
    }
}
