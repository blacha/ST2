import { ClientLibStatic } from '@cncta/clientlib';
import { CityScannerUtil, CityUtil, Duration } from '@cncta/util';
import { St } from '../../st';
import { StPlugin } from '../../st.plugin';
import { StCliCommand } from '../../st.cli';

declare const ClientLib: ClientLibStatic;

export const StCliScanAlliance: StCliCommand = {
    cmd: 'scan-alliance',
    handle(st: St): void {
        st.actions.clear();
        // Abort a in progress scan
        if (!st.actions.isIdle) {
            st.cli.sendMessage('white', 'Abort Scan');
            return;
        }
        st.cli.sendMessage('white', 'Starting Scan');
        st.plugin<AllianceScanner>('AllianceScanner')?.scanAll();
        st.actions.run(true).then(() => st.cli.sendMessage('white', 'Scan done!'));
    },
};

export class AllianceScanner extends StPlugin {
    name = 'AllianceScanner';
    priority = 100;

    async onStart(): Promise<void> {
        this.interval(() => this.scanAll(), Duration.OneHour);
        this.interval(() => this.playerScan(), Duration.minutes(20));
        this.cli(StCliScanAlliance);
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
            this.queueAction((index: number, total: number): Promise<void> => this.scanCity(city.$Id, index, total));
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
