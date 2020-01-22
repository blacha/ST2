import { ClientLibStatic } from '@cncta/clientlib';
import { StCity } from '@cncta/util';
import { Config } from '@st/shared';
import { StModuleBase } from '../module/module.base';
import { BatchBaseSender } from './batcher.base';

declare const ClientLib: ClientLibStatic;

export class ClientApi extends StModuleBase {
    name = 'api';
    baseUrl = Config.api.url;

    baseSender = new BatchBaseSender(this);

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

        const playerName = md.get_Player().name;
        const url = [this.baseUrl, 'api', 'v1', 'world', worldId, 'player', playerName, 'install', installId].join('/');
        await fetch(url, { headers: { authorization: `Bearer  ${this.st.instanceId}` } });
    }

    async onStop() {
        await this.baseSender.flush();
    }

    flush() {
        this.baseSender.flush();
    }
}
