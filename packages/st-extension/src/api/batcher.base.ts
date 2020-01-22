import { Batcher } from './batcher';
import { ClientApi } from './client.api';
import { StCity } from '@cncta/util';
import { St } from '../st';
import { ApiScanResponse } from '@st/shared';

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
        St.getInstance().log.info({ bases: data.length }, 'SendingData');
        const firstBase = data[0];
        const url = [this.api.baseUrl, 'api', 'v1', 'world', firstBase.worldId, 'scan', this.scanId].join('/');
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json', authorization: `Bearer  ${this.api.st.instanceId}` },
        });
        if (!res.ok) {
            console.error(await res.text());
            throw new Error('Failed to scan');
        }
        const body = (await res.json()) as ApiScanResponse;
        return body.id;
    }
}
