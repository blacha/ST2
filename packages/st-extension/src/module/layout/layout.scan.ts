import { ClientLibStatic, NpcCampType, WorldObjectType } from '@cncta/clientlib';
import { BaseLocationPacker, CityScannerUtil, CityUtil, Duration, PatchWorldObjectNPCCamp } from '@cncta/util';
import { CityCache } from '../city.cache';
import { StModuleBase } from '../module.base';

declare const ClientLib: ClientLibStatic;

export class LayoutScanner extends StModuleBase {
    name = 'LayoutScanner';

    async onStart(): Promise<void> {
        this.interval(() => this.scanAll(), Duration.OneHour);
    }

    scanAll(): void {
        this.clearActions();
        const nearByObjects = CityUtil.getNearByObjects();
        for (const { object, location } of nearByObjects) {
            if (object.Type !== WorldObjectType.NPCBase && object.Type !== WorldObjectType.NPCCamp) {
                continue;
            }
            const existing = CityCache.get(object.$Id);
            if (existing) {
                continue;
            }
            this.queue(
                (index: number, total: number): Promise<void> => this.scanLayout(object.$Id, location, index, total),
            );
        }
    }

    async scanLayout(cityId: number, location: number, current: number, count: number): Promise<void> {
        const md = ClientLib.Data.MainData.GetInstance();
        const cities = md.get_Cities();
        const world = md.get_World();

        const { x, y } = BaseLocationPacker.unpack(location);
        const worldObject = world.GetObjectFromPosition(x, y);
        if (worldObject == null) {
            return;
        }
        if (PatchWorldObjectNPCCamp.isPatched(worldObject) && worldObject.$CampType === NpcCampType.Destroyed) {
            return;
        }

        cities.set_CurrentCityId(cityId);
        const cityObj = await CityUtil.waitForCity(cityId);
        if (cityObj == null) {
            return;
        }

        const output = CityScannerUtil.get(cityObj);
        if (output == null) {
            return;
        }

        this.st.log.debug({ cityId, index: current, count }, 'ScanLayout');
        this.st.api.base(output).then(baseId => CityCache.setStId(cityId, baseId, output.tiles));
    }
}
