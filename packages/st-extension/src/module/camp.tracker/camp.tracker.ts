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

    update() {
        const nearByCamps = CityUtil.getNearByObjects();
        const newestCamps = nearByCamps.sort((a, b) => b.id - a.id).slice(0, 10);

        return newestCamps;
    }
}
