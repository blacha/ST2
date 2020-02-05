import { ClientLibStatic } from '@cncta/clientlib';
import { StCity } from '@cncta/util/build/city';
import { ApiUtil, ApiInstallRequest, ApiHeaders } from '@st/shared/build/api';
import { Config } from '@st/shared/build/config';
import { BatchBaseSender } from './batcher.base';
import { StPlugin } from '../st.plugin';

declare const ClientLib: ClientLibStatic;

export class StApi extends StPlugin {
    name = 'Api';
    baseUrl = Config.api.url;
    priority = 100;

    baseSender = new BatchBaseSender(this);

    get jsonHeaders() {
        return {
            'content-type': 'application/json',
            Authorization: `Bearer  ${this.st.instanceId}:${this.st.challengeId}`,
            [ApiHeaders.ExtensionVersion]: Config.version,
            [ApiHeaders.ExtensionHash]: Config.hash,
            [ApiHeaders.ExtensionInstall]: this.st.instanceId,
        };
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
