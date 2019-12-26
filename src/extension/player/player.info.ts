import { StModule } from '../module';
import { ClientLibStatic } from '../@types/client.lib';
import { ClientLibPatcher, PatchedWorldObjectCity } from '../patch/patch';
import { CityData } from '../city/city.scan';
import { ShockrTools } from '..';
import { ScannerState } from '../city/layout.scan';
import { ClientLibIter } from '../util/iter';

declare const ClientLib: ClientLibStatic;
export class PlayerInfo implements StModule {
    name = 'PlayerInfo';
    st: ShockrTools | null = null;

    state: ScannerState = ScannerState.Init;
    async start(st: ShockrTools): Promise<void> {
        this.st = st;
        this.state = ScannerState.Ready;
    }
    async stop(): Promise<void> {
        this.state = ScannerState.Abort;
    }

    async scan() {
        if (this.state != ScannerState.Ready) {
            return;
        }
        this.state = ScannerState.Scanning;
        try {
            return this.scanAlliance();
        } finally {
            this.state = ScannerState.Ready;
        }
    }

    getAlliedCities(): PatchedWorldObjectCity[] {
        const md = ClientLib.Data.MainData.GetInstance();
        const allianceId = md.get_Alliance().get_Id();

        const cities: PatchedWorldObjectCity[] = [];
        for (const city of ClientLibIter.values(md.get_World().GetCities())) {
            if (!ClientLibPatcher.hasPatchedAllianceId(city)) {
                continue;
            }
            if (city.$AllianceId == allianceId) {
                cities.push(city);
            }
        }
        cities.sort((a, b) => a.$PlayerId - b.$PlayerId);
        return cities;
    }

    async scanAlliance() {
        const allPlayers = [];
        const md = ClientLib.Data.MainData.GetInstance();
        const cities = md.get_Cities();
        const allCities = this.getAlliedCities();

        let count = 0;
        for (const city of allCities) {
            count++;
            if (this.state == ScannerState.Abort) {
                return allPlayers;
            }

            const cityId = city.$Id;
            cities.set_CurrentCityId(cityId);
            const cityObj = await CityData.waitForCityReady(cityId, true);
            if (cityObj == null) {
                continue;
            }
            console.log('Alliance', cityObj.name, cityObj.owner, count, '/', allCities.length);
            allPlayers.push(cityObj);
        }
        return allPlayers;
    }
}
