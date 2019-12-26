import { StModule } from '../module';
import { ClientLibStatic } from '../@types/client.lib';
import { ClientLibPatcher, PatchedWorldObjectCity } from '../patch/patch';
import { CityData } from '../city/city.scan';
import { ShockrTools } from '..';
import { ScannerState } from '../city/layout.scan';

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

    async scanAlliance() {
        const allPlayers = [];
        const md = ClientLib.Data.MainData.GetInstance();
        const cities = md.get_Cities();
        const allianceId = md.get_Alliance().get_Id();

        const allCities = (Object.values(md.get_World().GetCities().d).filter(city => {
            if (!ClientLibPatcher.hasPatchedAllianceId(city)) {
                return false;
            }
            return allianceId == city.$get_AllianceId();
        }) as unknown) as PatchedWorldObjectCity[];

        let count = 0;
        for (const city of allCities) {
            count++;
            if (this.state == ScannerState.Abort) {
                return allPlayers;
            }

            const cityId = city.$get_Id();
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
