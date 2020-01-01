import { CityUtil } from '@cncta/clientlib';
import { St } from '../../st';
import { StModuleState } from '../module';
import { StModuleBase } from '../module.base';

export class CampTracker extends StModuleBase {
    name: 'CampTracker';

    async start(st: St): Promise<void> {
        this.st = st;
        this.state = StModuleState.Started;
    }

    async stop(): Promise<void> {
        this.state = StModuleState.Stopped;
    }

    scan() {
        const nearByCamps = CityUtil.getNearByObjects();
        nearByCamps.sort((a, b) => a.id - b.id);

        return nearByCamps;
    }
}
