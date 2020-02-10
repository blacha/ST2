import { ClientLibStatic, NpcCampType, WorldObjectType } from '@cncta/clientlib';
import { BaseLocationPacker, CityScannerUtil, CityUtil, Duration, PatchWorldObjectNPCCamp } from '@cncta/util';
import { StPlugin } from '../../st.plugin';
import { CityCache } from '../../city.cache';
import { StCliCommandSub, StCliCommand } from '../../st.cli';
import { St } from '../../st';

declare const ClientLib: ClientLibStatic;

const StCliScanLayout: StCliCommand = {
    cmd: 'layout scan',
    handle(st: St): void {
        st.actions.clear();
        // Abort a in progress scan
        if (!st.actions.isIdle) {
            st.cli.sendCommandMessage('Abort Scan');
            return;
        }

        const scanCount = st.plugin<LayoutScanner>('layout')?.scanAll();
        st.cli.sendCommandMessage('Starting Scan (' + scanCount + ' layouts)');
        st.actions.run(true).then(() => st.cli.sendCommandMessage('Scan done!'));
    },
};

const StCliLayout: StCliCommandSub = {
    cmd: 'layout',
    commands: {
        scan: StCliScanLayout,
    },
};

export class LayoutScanner extends StPlugin {
    name = 'layout';
    priority = 100;

    async onStart(): Promise<void> {
        this.interval(() => this.scanAll(), Duration.OneHour);
        this.cli(StCliLayout);
    }

    scanAll(): number {
        this.clearActions();
        let count = 0;
        const nearByObjects = CityUtil.getNearByObjects();
        for (const { object, location, ownCityId } of nearByObjects) {
            if (object.Type !== WorldObjectType.NPCBase && object.Type !== WorldObjectType.NPCCamp) {
                continue;
            }
            const existing = CityCache.get(object.$Id);
            if (existing) {
                continue;
            }
            count++;
            this.queueAction(
                (index: number, total: number): Promise<void> =>
                    this.scanLayout(object.$Id, ownCityId, location, index, total),
            );
        }
        return count;
    }

    async scanLayout(
        cityId: number,
        ownCityId: number,
        location: number,
        current: number,
        count: number,
    ): Promise<void> {
        const md = ClientLib.Data.MainData.GetInstance();
        const cities = md.get_Cities();
        const world = md.get_World();
        const maxAttack = md.get_Server().get_MaxAttackDistance() - 0.5;

        const { x, y } = BaseLocationPacker.unpack(location);
        const worldObject = world.GetObjectFromPosition(x, y);
        if (worldObject == null) {
            return;
        }
        if (PatchWorldObjectNPCCamp.isPatched(worldObject) && worldObject.$CampType === NpcCampType.Destroyed) {
            return;
        }

        cities.set_CurrentCityId(cityId);

        // Modify our current own city if we are out of range
        if (ownCityId != ownCityId) {
            const currentCity = cities.get_CurrentOwnCity();

            const sourceXy = { x: currentCity.get_PosX(), y: currentCity.get_PosY() };
            if (CityUtil.distance(sourceXy, { x, y }) > maxAttack) {
                cities.set_CurrentOwnCityId(ownCityId);
            }
        }

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
