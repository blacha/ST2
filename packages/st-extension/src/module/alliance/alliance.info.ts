import { StCity, CityScannerUtil, CityUtil, ClientLibStatic } from '@cncta/clientlib';
import { St } from '../../st';
import { StModuleState } from '../module';
import { StModuleBase } from '../module.base';
import { CityCache } from '../city.cache';

declare const ClientLib: ClientLibStatic;

export class AllianceScanner extends StModuleBase {
    name: 'AllianceScanner';
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
        await this.st.run(this, () => this.scanAlliance());
    }

    async *scanAlliance(): AsyncGenerator<StCity> {
        const md = ClientLib.Data.MainData.GetInstance();
        const cities = md.get_Cities();
        const allCities = CityUtil.getAlliedCities();

        for (const city of allCities) {
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

            CityCache.set(cityId, output);
            return output;
        }
    }
}
