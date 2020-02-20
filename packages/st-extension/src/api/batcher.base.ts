import { ClientLibStatic } from '@cncta/clientlib';
import { StCity } from '@cncta/util/build/city';
import { V2Sdk } from '@st/api';
import { St } from '../st';
import { Batcher } from './batcher';
import { StApi } from './st.api';

declare const ClientLib: ClientLibStatic;

export class BatchBaseSender extends Batcher<'cityId', StCity, string> {
    api: StApi;
    constructor(api: StApi) {
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

        const res = await V2Sdk.call('city.scan', { cities: data, worldId, player });
        if (res.ok) {
            return res.response.cityIds;
        }
        throw new Error('Failed to scan');
    }
}
