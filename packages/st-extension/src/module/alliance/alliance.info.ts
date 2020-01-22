import { ClientLibStatic } from '@cncta/clientlib';
import { CityScannerUtil, CityUtil, Duration } from '@cncta/util';
import { StModuleBase } from '../module.base';

declare const ClientLib: ClientLibStatic;

export class AllianceScanner extends StModuleBase {
    name = 'AllianceScanner';

    async onStart(): Promise<void> {
        this.interval(() => this.scanAll(), Duration.OneHour);
        this.interval(() => this.playerScan(), Duration.minutes(20));
    }

    /** Scan only the current player's bases */
    playerScan(): void {
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

    scanAll(): void {
        this.clearActions();
        const allCities = CityUtil.getAlliedCities();
        for (const city of allCities) {
            this.queue((index: number, total: number): Promise<void> => this.scanCity(city.$Id, index, total));
        }
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
        this.st.api.base(output);
    }
}
