import { ClientLibStatic } from '@cncta/clientlib';
import { StCity } from '@cncta/util';
import { Config, ApiUtil, ApiInstallRequest } from '@st/shared';
import { StModuleBase } from '../module/module.base';
import { BatchBaseSender } from './batcher.base';

declare const ClientLib: ClientLibStatic;

export class ClientApi extends StModuleBase {
    name = 'api';
    baseUrl = Config.api.url;

    baseSender = new BatchBaseSender(this);

    get jsonHeaders() {
        return { 'content-type': 'application/json', Authorization: `Bearer  ${this.st.instanceId}` };
    }

    async base(base: StCity, flush = false): Promise<string> {
        const promise = this.baseSender.queue(base);
        if (flush) {
            await this.baseSender.flush();
        }
        return promise;
    }

    async onStart() {
        const installId = this.st.instanceId;
        const md = ClientLib.Data.MainData.GetInstance();
        const worldId = md.get_Server().get_WorldId();
        const player = md.get_Player().name;

        const req = ApiUtil.request<ApiInstallRequest>(
            'post',
            '/api/v1/install/:installId',
            { installId },
            { player, worldId, version: Config.version, hash: Config.hash },
        );
        await fetch(req.url, { method: req.method, body: req.body, headers: this.jsonHeaders });
    }

    async onStop() {
        await this.baseSender.flush();
    }

    flush() {
        this.baseSender.flush();
    }
}
