import { ClientLibStatic } from '@cncta/clientlib';
import { CityScannerUtil, CityUtil, Duration } from '@cncta/util';
import { CityCache } from '../../city.cache';
import { StPlugin } from '../../st.plugin';

declare const ClientLib: ClientLibStatic;

export class AllianceScanner extends StPlugin {
    name = 'alliance';
    priority = 100;

    /** Scan only the current player's bases */
    playerScan(): void {
        if (!this.st.isOnline) {
            return;
        }
        const cities = ClientLib.Data.MainData.GetInstance().get_Cities();

        for (const city of Object.values(cities.get_AllCities().d)) {
            if (!city.IsOwnBase()) {
                continue;
            }

            const output = CityScannerUtil.get(city);
            if (output == null) {
                continue;
            }

            this.st.api.base(output);
        }
    }

    scanAll(): number {
        this.clearActions();
        const allCities = CityUtil.getAlliedCities();
        let count = 0;
        for (const city of allCities) {
            // Limit scanning to once every 15 minutes
            const cityData = CityCache.get(city.$Id, Duration.minutes(15));
            if (cityData != null) {
                continue;
            }
            this.queueAction((index: number, total: number): Promise<void> => this.scanCity(city.$Id, index, total));
            count++;
        }
        return count;
    }

    async scanCity(cityId: number, current: number, total: number): Promise<void> {
        const cities = ClientLib.Data.MainData.GetInstance().get_Cities();
        cities.set_CurrentCityId(cityId);

        const cityObj = await CityUtil.waitForCity(cityId);
        if (cityObj == null) {
            return;
        }

        const output = CityScannerUtil.get(cityObj);
        if (output == null) {
            return;
        }

        this.st.log.debug({ cityId, owner: output.owner, current, total }, 'ScanAlliance');
        this.st.api.base(output).then(c => CityCache.setStId(cityId, c, ''));
    }
}
