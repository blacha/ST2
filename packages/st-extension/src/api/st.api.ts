import { ClientLibStatic } from '@cncta/clientlib';
import { StCity } from '@cncta/util/build/city';
import { InstallId, V2Sdk } from '@st/api';
import { ApiHeaders } from '@st/shared/build/api';
import { Config } from '@st/shared/build/config';
import { StPlugin } from '../st.plugin';
import { BatchBaseSender } from './batcher.base';

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
        V2Sdk.config({
            fetch: fetch.bind(window),
            baseUrl: Config.api.url,
            headers: () => this.jsonHeaders,
        });

        const installId = this.st.instanceId as InstallId;
        const md = ClientLib.Data.MainData.GetInstance();
        const worldId = md.get_Server().get_WorldId();
        const player = md.get_Player().name;

        V2Sdk.call('install.track', { installId, worldId, player, version: Config.version, hash: Config.hash });
    }

    async onStop() {
        await this.baseSender.flush();
    }

    flush() {
        this.baseSender.flush();
    }
}
