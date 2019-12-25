import { CityLayout } from '../../api/city.layout';
import { ApiScanResponse } from '../../api/request.scan';
import { StModule } from '../module';

interface CacheObject<T> {
    timestamp: number;
    obj: Promise<T>;
}
const CacheTime = 5 * 60 * 1000;

export class ClientApi implements StModule {
    name = 'api';
    baseUrl = 'https://shockrtools.web.app/api/v1';

    lastSent: Record<string, CacheObject<ApiScanResponse>> = {};

    async base(base: CityLayout): Promise<ApiScanResponse> {
        const existing = this.lastSent[base.cityId];
        if (existing == null || Date.now() - existing.timestamp > CacheTime) {
            this.lastSent[base.cityId] = {
                timestamp: Date.now(),
                obj: this.doSend(base),
            };
        }
        return this.lastSent[base.cityId].obj;
    }

    private async doSend(base: CityLayout): Promise<ApiScanResponse> {
        const url = [this.baseUrl, 'world', base.worldId, 'base'].join('/');
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(base),
            headers: { 'content-type': 'application/json', authorization: 'Bearer' },
        });
        if (!res.ok) {
            console.error(await res.text());
            throw new Error('Failed to scan');
        }
        const body = (await res.json()) as ApiScanResponse;
        return body;
    }
}
