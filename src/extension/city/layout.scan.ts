import { CityLayout, LayoutScanApi } from '../../api/city.layout';
import { BaseBuilder } from '../../lib/base.builder';
import { Faction } from '../../lib/data/faction';
import { ClientLibCity, ClientLibStatic } from '../@types/client.lib';
import { NpcCampType, WorldObjectType } from '../@types/client.lib.const';
import { StModule } from '../module';
import { ClientLibPatcher } from '../patch/patch';
import { ClientLibIter } from '../util/iter';
import { CityData } from './city.scan';

declare const ClientLib: ClientLibStatic;
interface LayoutToScan {
    x: number;
    y: number;
    city: number;
    distance: number;
}

export enum LayoutScannerState {
    Init,
    Ready,
    Scanning,
    Abort,
}

export class LayoutScanner implements StModule {
    name = 'Layout';

    abort = false;
    lastCityId: number | null = null;
    maxFailCount = 10;
    lastScan: CityLayout[] = [];
    state: LayoutScannerState = LayoutScannerState.Init;

    async start(): Promise<void> {
        // Nothing to do
        this.state = LayoutScannerState.Ready;
    }

    async stop(): Promise<void> {
        this.state = LayoutScannerState.Abort;
    }

    toScan: Record<string, LayoutToScan> = {};

    public async scan(): Promise<LayoutScanApi | null> {
        if (this.state != LayoutScannerState.Ready) {
            return null;
        }
        this.state = LayoutScannerState.Scanning;
        this.toScan = {};
        const cities = this.getAllCities();
        for (const city of cities) {
            this.getNearByObjects(city);
        }
        this.lastCityId = null;

        // Scan the closest bases first
        const scanList = Object.values(this.toScan).sort((a, b) => {
            if (a.city == b.city) {
                return a.distance - b.distance;
            }
            return a.city - b.city;
        });

        this.toScan = {};
        const output: CityLayout[] = [];
        for (const toScan of scanList) {
            const layout = await this.scanLayout(toScan.x, toScan.y, toScan.city);
            if (layout == null) {
                continue;
            }
            output.push(layout);
            console.log(
                'Scanned',
                BaseBuilder.load(layout).stats.tiberium.score,
                layout,
                output.length,
                '/',
                scanList.length,
            );
        }
        this.lastScan = output;

        this.state = LayoutScannerState.Ready;
        const md = ClientLib.Data.MainData.GetInstance();
        return {
            v: 1,
            world: md.get_Server().get_WorldId(),
            player: {
                id: md.get_Player().id,
                accountId: md.get_Player().accountId,
                name: md.get_Player().name,
            },
            layouts: output,
        };
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

        ClientLib.Data.MainData.GetInstance()
            .get_Cities()
            .set_CurrentCityId(obj.$get_Id());

        const city = await CityData.waitForCityReady(obj.$get_Id());
        if (this.abort) {
            return null;
        }

        if (city == null) {
            console.error(x, y, 'ScanFailed');
            return null;
        }

        const cached = this.getCache(x, y);
        if (cached != null && cached.cityId == city.get_Id() && cached.version > -1) {
            return cached;
        }

        const faction = Faction.fromId(city.get_CityFaction());
        if (faction == Faction.Gdi || faction == Faction.Nod) {
            return null;
        }

        const layout = CityData.getCityData(city);
        if (layout != null) {
            this.setCache(x, y, layout);
        }

        return layout;
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
