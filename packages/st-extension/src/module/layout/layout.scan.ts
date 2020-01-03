import { CityScannerUtil, CityUtil, NpcCampType, StCity, WorldObjectType, Patches } from '@cncta/clientlib';
import { CityCache } from '../city.cache';
import { StModuleBase } from '../module.base';

export class LayoutScanner extends StModuleBase {
    name = 'LayoutScanner';

    async scan(): Promise<void> {
        if (!this.st.isIdle) {
            return;
        }

        // Acquire the module lock and run the scan
        await this.st.run(this, () => this.scanLayout());
    }

    async *scanLayout(): AsyncGenerator<StCity> {
        let current = 0;
        const nearByObjects = CityUtil.getNearByObjects();
        for (const { object } of nearByObjects) {
            current++;
            if (object.Type !== WorldObjectType.NPCBase && object.Type !== WorldObjectType.NPCCamp) {
                continue;
            }

            if (Patches.WorldObjectNPCCamp.isPatched(object) && object.$CampType === NpcCampType.Destroyed) {
                continue;
            }

            const existing = CityCache.get(object.$Id);
            if (existing) {
                CityCache.set(object.$Id, existing);
                yield existing;
            }

            const cityObj = await CityUtil.waitForCity(object.$Id);
            if (cityObj == null) {
                continue;
            }

            const output = CityScannerUtil.get(cityObj);
            if (output == null) {
                continue;
            }
            this.st.log.debug({ current, count: nearByObjects.length }, 'ScanLayout');
            CityCache.set(object.$Id, output);
            yield output;
        }
    }
}
