import { ClientLibStatic } from '@cncta/clientlib';
import { CityScannerUtil, CityUtil, StCity } from '@cncta/plugin';
import { CityCache } from '../city.cache';
import { StModuleBase } from '../module.base';

declare const ClientLib: ClientLibStatic;

export class AllianceScanner extends StModuleBase {
    name = 'AllianceScanner';

    async scan(): Promise<void> {
        if (!this.st.isIdle) {
            return;
        }

        // Acquire the module lock and run the scan
        await this.st.run(this, () => this.scanAlliance());
    }

    async *scanAlliance(): AsyncGenerator<StCity> {
        const md = ClientLib.Data.MainData.GetInstance();
        const cities = md.get_Cities();
        const allCities = CityUtil.getAlliedCities();

        let current = 0;
        for (const city of allCities) {
            current++;
            const cityId = city.$Id;
            cities.set_CurrentCityId(cityId);

            const cityObj = await CityUtil.waitForCity(cityId);
            if (cityObj == null) {
                continue;
            }
            const output = CityScannerUtil.get(cityObj);
            if (output == null) {
                continue;
            }
            this.st.log.debug({ cityId, owner: output.owner.name, current, count: allCities.length }, 'ScanAlliance');
            CityCache.set(cityId, output);
            yield output;
        }
    }
}
