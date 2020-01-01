import { StCity } from '@cncta/clientlib';
import { Config } from '@st/shared';
import { StModuleBase } from '../module/module.base';
import { BatchBaseSender } from './batcher.base';
import { StModuleState } from '../module/module';

export class ClientApi extends StModuleBase {
    name = 'api';
    baseUrl = Config.api.url;

    baseSender = new BatchBaseSender(this);

    async base(base: StCity): Promise<string> {
        return this.baseSender.queue(base);
    }

    async start() {
        this.state = StModuleState.Started;
    }

    async stop() {
        this.state = StModuleState.Stopping;
        await this.baseSender.flush();
        this.state = StModuleState.Stopped;
    }

    flush() {
        this.baseSender.flush();
    }
}
