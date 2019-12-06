import { CityLayout } from '../../api/city.layout';
import { Faction } from '../../lib/data/faction';
import { StModule } from '../module';
import { ClientLibPatcher } from '../patch/patch';
import { ClientLibIter } from '../util/iter';
import { CityData } from './city.scan';
import { BaseBuilder } from '../../lib/base.builder';
import { WorldObjectType, NpcCampType } from '../@types/client.lib.const';
import { ClientLibCity, ClientLibStatic } from '../@types/client.lib';
declare const ClientLib: ClientLibStatic;
interface LayoutToScan {
    x: number;
    y: number;
    city: number;
    distance: number;
}

export class LayoutScanner implements StModule {
    abort = false;
    lastCityId: number | null = null;
    maxFailCount = 10;
    lastScan: CityLayout[] = [];

    async start(): Promise<void> {
        // Nothing to do
    }

    async stop(): Promise<void> {
        this.abort = true;
    }

    toScan: Record<string, LayoutToScan> = {};

    public async scan() {
        this.toScan = {};
        const cities = this.getAllCities();
        for (const city of cities) {
            this.getNearByObjects(city);
        }
        this.lastCityId = null;
        const scanList = Object.values(this.toScan).sort((a, b) => a.distance - b.distance);
        this.toScan = {};
        const output: CityLayout[] = [];
        for (const toScan of scanList) {
            const layout = await this.scanLayout(toScan.x, toScan.y, toScan.city);
            if (layout == null) {
                continue;
            }
            output.push(layout);
            console.log('Scanned', layout, output.length, '/', scanList.length);
        }
        this.lastScan = output;
    }

    bestBases() {
        return this.lastScan
            .map(f => BaseBuilder.load(f))
            .sort((a, b) => b.stats.tiberium.score - a.stats.tiberium.score);
    }

    async scanLayout(x: number, y: number, cityId: number): Promise<CityLayout | null> {
        if (this.abort) {
            return null;
        }
        // console.log(x, y, 'Scan', cityId);
        if (cityId != null) {
            this.setCurrentCity(cityId);
        }

        const world = ClientLib.Data.MainData.GetInstance().get_World();
        const obj = world.GetObjectFromPosition(x, y);
        if (obj == null) {
            return null;
        }

        if (!ClientLibPatcher.hasPatchedId(obj)) {
            console.error('WorldObject missing $get_Id');
            return null;
        }

        for (let i = 0; i < this.maxFailCount; i++) {
            if (this.abort) {
                return null;
            }
            // console.log(x, y, 'ScanCount', i);
            await new Promise(resolve => setTimeout(resolve, 100 * i));

            ClientLib.Data.MainData.GetInstance()
                .get_Cities()
                .set_CurrentCityId(obj.$get_Id());
            const city = ClientLib.Data.MainData.GetInstance()
                .get_Cities()
                .GetCity(obj.$get_Id());
            if (city == null) {
                continue;
            }

            const cached = this.getCache(x, y);
            if (cached != null && cached.cityId == city.get_Id() && cached.version > -1) {
                return cached;
            }
            // Dead ignore
            if (city.get_IsGhostMode()) {
                return null;
            }

            const faction = Faction.fromID(city.get_CityFaction());
            if (faction == Faction.Gdi || faction == Faction.Nod) {
                return null;
            }

            // Base has not loaded yet
            if (city.GetBuildingsConditionInPercent() === 0) {
                continue;
            }

            const layout = CityData.getCityData(city);
            if (layout != null) {
                this.setCache(x, y, layout);
            }

            return layout;
        }
        console.error(x, y, 'ScanFailed');
        return null;
    }

    private cacheKey(x: number, y: number) {
        const worldId = ClientLib.Data.MainData.GetInstance()
            .get_Server()
            .get_WorldId();
        return `st-layout-${worldId}-${x}-${y}`;
    }

    getCache(x: number, y: number): CityLayout | null {
        const cached = localStorage.getItem(this.cacheKey(x, y));
        if (cached == null) {
            return null;
        }
        return JSON.parse(cached) as CityLayout;
    }
    setCache(x: number, y: number, layout: CityLayout): void {
        localStorage.setItem(this.cacheKey(x, y), JSON.stringify(layout));
    }

    setCurrentCity(cityId: number) {
        if (this.lastCityId == cityId) {
            return;
        }

        const allCities = ClientLib.Data.MainData.GetInstance()
            .get_Cities()
            .get_AllCities();
        const selectedBase = allCities.d[cityId];

        ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(selectedBase.get_PosX(), selectedBase.get_PosY());
        ClientLib.Vis.VisMain.GetInstance().Update();
        ClientLib.Vis.VisMain.GetInstance().ViewUpdate();
        this.lastCityId = cityId;
    }

    getNearByObjects(city: ClientLibCity) {
        const x = city.get_PosX();
        const y = city.get_PosY();

        const maxAttack =
            ClientLib.Data.MainData.GetInstance()
                .get_Server()
                .get_MaxAttackDistance() - 0.5;
        const world = ClientLib.Data.MainData.GetInstance().get_World();

        for (let scanY = y - 11; scanY <= y + 11; scanY++) {
            for (let scanX = x - 11; scanX <= x + 11; scanX++) {
                const distX = Math.abs(x - scanX);
                const distY = Math.abs(y - scanY);
                const distance = Math.sqrt(distX * distX + distY * distY);
                if (distance >= maxAttack) {
                    continue;
                }

                const coord = ClientLib.Base.MathUtil.EncodeCoordId(scanX, scanY);
                if (this.toScan[coord]) {
                    continue;
                }

                const object = world.GetObjectFromPosition(scanX, scanY);
                if (object == null) {
                    continue;
                }

                if (object.Type !== WorldObjectType.NPCBase && object.Type !== WorldObjectType.NPCCamp) {
                    continue;
                }

                if (ClientLibPatcher.hasPatchedCampType(object) && object.$get_CampType() === NpcCampType.Destroyed) {
                    continue;
                }

                this.toScan[coord] = {
                    x: scanX,
                    y: scanY,
                    distance,
                    city: city.get_Id(),
                };
            }
        }
    }

    protected getAllCities(): ClientLibCity[] {
        const allCities = ClientLib.Data.MainData.GetInstance()
            .get_Cities()
            .get_AllCities();
        return ClientLibIter.values(allCities);
    }
}
