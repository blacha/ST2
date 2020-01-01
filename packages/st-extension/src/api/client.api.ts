import { StCity } from '@cncta/clientlib';
import { Config } from '@st/shared';
import { StModuleBase } from '../module/module.base';
import { BatchBaseSender } from './batcher.base';

export class ClientApi extends StModuleBase {
    name = 'api';
    baseUrl = Config.api.url;

    baseSender = new BatchBaseSender(this);

    async base(base: StCity): Promise<string> {
        return this.baseSender.queue(base);
    }

    async onStop() {
        await this.baseSender.flush();
    }

    flush() {
        this.baseSender.flush();
    }
}
