import {
    ApiScanRequest,
    ApiScanResponse,
    BaseBuilder,
    BaseLayout,
    DbLayout,
    DbPlayer,
    BaseLayoutPacker,
    NumberPacker,
} from '@st/shared';
import { StCity, BaseLocationPacker } from '@cncta/clientlib';
import { ApiCall, ApiRequest } from './api.call';
import { FirestoreAdmin } from './db.admin';

const OneMinuteMs = 60 * 1000;
const OneHourMs = 60 * OneMinuteMs;
const OneDayMs = 25 * OneHourMs;
/* Expire after 3 days */
const LayoutExpireMs = 3 * OneDayMs;

export class ApiScan extends ApiCall<ApiScanRequest> {
    path = '/api/v1/world/:worldId/scan/:scanId' as const;
    method = 'post' as const;

    async storePlayer(req: ApiRequest<ApiScanRequest>, worldId: number, playerId: number, baseList?: StCity[]) {
        if (baseList == null) {
            return;
        }
        const [firstBase] = baseList;
        const { owner, alliance } = firstBase;
        const PlayerCollection = FirestoreAdmin.collection('player');

        // TODO use a better random id or something
        const playerDocId = NumberPacker.pack([worldId, playerId]);
        const doc = PlayerCollection.doc(playerDocId);
        await FirestoreAdmin.runTransaction(async transaction => {
            const existing = await transaction.get(doc);
            let bases: Record<string, StCity> = {};
            let allianceKey = NumberPacker.pack([worldId, alliance.id]);
            let createdAt = Date.now();
            if (existing != null && existing.exists) {
                const existingData = existing.data() as DbPlayer;
                bases = existingData.bases ?? {};
                allianceKey = existingData.allianceKey;
                createdAt = existingData.createdAt ?? Date.now();
            }
            for (const base of baseList) {
                bases[NumberPacker.pack(base.cityId)] = base;
            }
            const updatedObject: Partial<DbPlayer> = {
                alliance: alliance,
                allianceKey,
                owner,
                worldId,
                bases,
                createdAt,
                updatedAt: Date.now(),
            };
            req.log.info({ allianceKey, playerDocId, bases: bases.length }, 'SetPlayer');
            await transaction.set(doc, updatedObject, { merge: true });
        });
    }

    async storeLayouts(
        req: ApiRequest<ApiScanRequest>,
        worldId: number,
        scanId: string,
        layoutsList: Map<string, BaseLayout>,
    ) {
        if (layoutsList.size == 0) {
            return;
        }
        const LayoutCollection = FirestoreAdmin.collection('layout');
        // TODO use a better random id or something
        const scanDoc = NumberPacker.pack(worldId) + '.' + scanId;
        const doc = LayoutCollection.doc(scanDoc);
        await FirestoreAdmin.runTransaction(async transaction => {
            const existing = await transaction.get(doc);
            let layouts: Record<string, BaseLayout> = {};
            let createdAt = Date.now();
            if (existing != null && existing.exists) {
                const existingData = existing.data() as DbLayout;
                layouts = existingData.layouts ?? {};
                createdAt = existingData.createdAt ?? Date.now();
            }
            for (const [xy, layout] of Object.entries(layouts)) {
                if (Date.now() - layout.updatedAt > LayoutExpireMs) {
                    delete layouts[xy];
                }
            }
            for (const [key, layout] of layoutsList.entries()) {
                layouts[key] = layout;
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
        const players: Map<number, StCity[]> = new Map();
        for (const baseJson of bases) {
            const base = BaseBuilder.load(baseJson);

            if (baseJson.owner.id < 0) {
                const xy = String(0); // BasePacker.xy.packS(base.x, base.y);
                layouts.set(xy, {
                    layout: BaseLayoutPacker.pack(base),
                    updatedAt: Date.now(),
                });
            } else {
                const existing = players.get(baseJson.owner.id) ?? [];
                existing.push(baseJson);
                players.set(baseJson.owner.id, existing);
            }

            const baseId = NumberPacker.pack([worldId, baseJson.cityId]);
            const BaseCollection = FirestoreAdmin.collection('base');
            await BaseCollection.doc(baseId).set(baseJson);
            output.push(baseId);
        }

        if (players.size > 0) {
            for (const playerId of players.keys()) {
                req.log.info({ playerId, count: players.get(playerId)?.length }, 'StorePlayer');
                await this.storePlayer(req, worldId, playerId, players.get(playerId));
            }
        }

        if (layouts.size > 0) {
            req.log.info({ scanId, layouts: layouts.size }, 'StoreLayouts');
            await this.storeLayouts(req, worldId, scanId, layouts);
        }

        return { id: output, worldId };
    }
}
