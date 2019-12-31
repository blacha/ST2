import {
    CityScannerUtil,
    CityUtil,
    ClientLibCity,
    ClientLibPatcher,
    NpcCampType,
    WorldObjectType,
} from '@cncta/clientlib';
import { St } from '../../st';
import { CityCache } from '../city.cache';
import { StModuleState } from '../module';
import { StModuleBase } from '../module.base';

export class LayoutScanner extends StModuleBase {
    name: 'LayoutScanner';
    st: St;

    async start(st: St): Promise<void> {
        this.st = st;
        this.state = StModuleState.Started;
    }

    async stop(): Promise<void> {
        this.state = StModuleState.Stopped;
    }

    async scan(): Promise<void> {
        if (!this.st.isIdle) {
            return;
        }

        // Acquire the module lock and run the scan
        await this.st.run(this, () => this.scanLayout());
    }

    async *scanLayout(): AsyncGenerator<ClientLibCity> {
        for (const { object } of CityUtil.getNearByObjects()) {
            if (object.Type !== WorldObjectType.NPCBase && object.Type !== WorldObjectType.NPCCamp) {
                continue;
            }

            if (ClientLibPatcher.hasPatchedCampType(object) && object.$CampType === NpcCampType.Destroyed) {
                continue;
            }

            const existing = CityCache.get(object.$Id);
            if (existing) {
                return existing;
            }

            const cityObj = await CityUtil.waitForCity(object.$Id);
            if (cityObj == null) {
                continue;
            }

            const output = CityScannerUtil.get(cityObj);
            if (output == null) {
                continue;
            }

            CityCache.set(object.$Id, output);
            return output;
        }
    }
}
