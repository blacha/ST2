import { Batcher } from './batcher';
import { ClientApi } from './client.api';
import { StCity } from '@cncta/util';
import { St } from '../st';
import { ApiScanResponse, ApiUtil, ApiScanRequest } from '@st/shared';
import { ClientLibStatic } from '@cncta/clientlib';

declare const ClientLib: ClientLibStatic;

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
        const md = ClientLib.Data.MainData.GetInstance();
        const worldId = md.get_Server().get_WorldId();
        const player = md.get_Player().name;
        const req = ApiUtil.request<ApiScanRequest>(
            'post',
            '/api/v1/world/:worldId/player/:player/scan',
            { worldId, player },
            data,
        );

        const res = await fetch(req.url, {
            method: req.method,
            body: req.body,
            headers: this.api.jsonHeaders,
        });
        if (!res.ok) {
            console.error(await res.text());
            throw new Error('Failed to scan');
        }
        const body = (await res.json()) as ApiScanResponse;
        return body.id;
    }
}
