import { StModule } from '../module';
import { ClientLibStatic } from '../@types/client.lib';
import { ClientLibPatcher } from '../patch/patch';
import { CityData } from '../city/city.scan';
import { ShockrTools } from '..';

declare const ClientLib: ClientLibStatic;
export class PlayerInfo implements StModule {
    name = 'PlayerInfo';
    st: ShockrTools | null = null;

    async start(st: ShockrTools): Promise<void> {
        this.st = st;
    }
    async stop(): Promise<void> {
        //
    }

    async scanAlliance() {
        const allPlayers = [];
        const md = ClientLib.Data.MainData.GetInstance();
        const cities = md.get_Cities();
        const allCities = md.get_World().GetCities().d;
        const allianceId = md.get_Alliance().get_Id();
        for (const city of Object.values(allCities)) {
            if (!ClientLibPatcher.hasPatchedAllianceId(city)) {
                continue;
            }
            if (allianceId != city.$get_AllianceId()) {
                continue;
            }

            const cityId = city.$get_Id();
            cities.set_CurrentCityId(cityId);
            const cityObj = await CityData.waitForCityReady(cityId, true);

            if (cityObj == null) {
                continue;
            }

            allPlayers.push(cityObj);
        }
        return allPlayers;
    }
}
