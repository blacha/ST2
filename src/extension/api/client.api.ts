import { CacheObject, CityLayout } from '../../api/city.layout';
import { ApiScanResponse } from '../../api/request.scan';
import { StModule } from '../module';
import { BatchBaseSender } from './batcher.base';

export class ClientApi implements StModule {
    name = 'api';
    baseUrl = 'https://shockrtools.web.app/api/v1';

    lastSent: Record<string, CacheObject<Promise<ApiScanResponse>>> = {};
    baseSender = new BatchBaseSender(this);

    async base(base: CityLayout): Promise<string> {
        return this.baseSender.queue(base);
    }

    flush() {
        this.baseSender.flush();
    }
}
