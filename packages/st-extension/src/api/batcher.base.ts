import { Batcher } from './batcher';
import { ClientApi } from './client.api';
import { StCity } from '@cncta/clientlib';
import { ApiScanResponse } from '@st/shared';
import { St } from '../st';

export class BatchBaseSender extends Batcher<'cityId', StCity, string> {
    api: ClientApi;
    constructor(api: ClientApi) {
        super('cityId', 30 * 1000, 25);
        this.api = api;
    }

    get scanId() {
        return St.getInstance().instanceId;
    }

    async run(data: StCity[]): Promise<string[]> {
        St.getInstance().log.info({ bases: data.length, scanId: this.scanId }, 'SendingData');
        console.log('Sending', data.length);
        const firstBase = data[0];
        const url = [this.api.baseUrl, 'api', 'v1', 'world', firstBase.worldId, 'scan', this.scanId].join('/');
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json', authorization: 'Bearer' },
        });
        if (!res.ok) {
            console.error(await res.text());
            throw new Error('Failed to scan');
        }
        const body = (await res.json()) as ApiScanResponse;
        return body.id;
    }
}
