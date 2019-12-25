import { StModule } from '../module';
import { CityLayout } from '../../api/city.layout';
import { Coord } from '../../backend/coord';
import { ApiScanResponse } from '../../api/request.scan';

export class ClientApi implements StModule {
    name = 'api';
    baseUrl = 'https://shockrtools.web.app/api/v1';

    lastSent: Record<string, Promise<ApiScanResponse>> = {};

    async base(base: CityLayout): Promise<ApiScanResponse> {
        if (this.lastSent[base.cityId] == null) {
            this.lastSent[base.cityId] = this.doSend(base);
        }

        return this.lastSent[base.cityId];
    }

    private async doSend(base: CityLayout): Promise<ApiScanResponse> {
        const url = [this.baseUrl, 'world', base.world, 'base', Coord.toId(base.x, base.y)].join('/');
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
        delete this.lastSent[base.cityId];
        return body;
    }
}
