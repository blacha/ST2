import { StCity } from '@cncta/plugin';
import { Config } from '@st/shared';
import { StModuleBase } from '../module/module.base';
import { BatchBaseSender } from './batcher.base';

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

    async onStop() {
        await this.baseSender.flush();
    }

    flush() {
        this.baseSender.flush();
    }
}
