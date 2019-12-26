import { ShockrTools } from '..';
import { CityLayout, LayoutScanApi } from '../../api/city.layout';
import { BaseBuilder } from '../../lib/base/base.builder';
import { ClientLibCity, ClientLibStatic, PheStatic } from '../@types/client.lib';
import { NpcCampType, WorldObjectType } from '../@types/client.lib.const';
import { StModule } from '../module';
import { ClientLibPatcher } from '../patch/patch';
import { ClientLibIter } from '../util/iter';
import { CityData } from './city.scan';

declare const ClientLib: ClientLibStatic;
declare const phe: PheStatic;
interface LayoutToScan {
    x: number;
    y: number;
    city: number;
    distance: number;
}

export enum ScannerState {
    Init,
    Ready,
    Scanning,
    Abort,
}

export class LayoutScanner implements StModule {
    name = 'Layout';

    lastCityId: number | null = null;
    lastScan: CityLayout[] = [];
    state: ScannerState = ScannerState.Init;
    toScan: Record<string, LayoutToScan> = {};
    st: ShockrTools | null = null;

    async start(st: ShockrTools): Promise<void> {
        this.st = st;
        this.state = ScannerState.Ready;
        CityData.removeStaleCache();
    }

    async stop(): Promise<void> {
        this.state = ScannerState.Abort;
    }

    public async scan(): Promise<LayoutScanApi | null> {
        if (this.state != ScannerState.Ready) {
            return null;
        }
        try {
            return await this.doScan();
        } finally {
            this.state = ScannerState.Ready;
        }
    }

    private async doScan(): Promise<LayoutScanApi | null> {
        this.state = ScannerState.Scanning;
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
                BaseBuilder.load(layout).info.stats.tiberium.score,
                layout,
                output.length,
                '/',
                scanList.length,
            );
        }
        this.lastScan = output;

        this.state = ScannerState.Ready;
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
    /** Should the scan be aborted */
    get isAborting() {
        return this.state === ScannerState.Abort;
    }

    /** Lookup cityId given the worldX/Y */
    getCityId(x: number, y: number): number | null {
        const world = ClientLib.Data.MainData.GetInstance().get_World();
        const obj = world.GetObjectFromPosition(x, y);
        if (obj == null) {
            return null;
        }

        if (!ClientLibPatcher.hasPatchedId(obj)) {
            return null;
        }

        ClientLib.Data.MainData.GetInstance()
            .get_Cities()
            .set_CurrentCityId(obj.$Id);
        return obj.$Id;
    }

    /**
     * Scan a city given the cityId
     * @param cityId
     */
    async scanLayout(cityId: number): Promise<CityLayout | null>;

    /**
     * Scan a city given the position and optionally the city to scan from
     * @param x worldX
     * @param y worldY
     * @param scanCityId optional city to scan from
     */
    async scanLayout(x: number, y: number, scanCityId?: number): Promise<CityLayout | null>;
    async scanLayout(x: number, y?: number, scanCityId?: number): Promise<CityLayout | null> {
        if (this.isAborting) {
            return null;
        }

        if (scanCityId != null) {
            this.setCurrentCity(scanCityId);
        }

        const cityId = y == null ? x : this.getCityId(x, y);
        if (cityId == null) {
            return null;
        }

        const city = await CityData.waitForCityReady(cityId);
        if (this.isAborting) {
            return null;
        }

        if (city == null) {
            console.error(x, y, 'ScanFailed');
            return null;
        }

        return city;
    }

    setCurrentCity(cityId: number) {
        if (this.lastCityId == cityId) {
            return;
        }

        const allCities = ClientLib.Data.MainData.GetInstance()
            .get_Cities()
            .get_AllCities();
        const selectedBase = allCities.d[cityId];
        const visMain = ClientLib.Vis.VisMain.GetInstance();

        visMain.CenterGridPosition(selectedBase.get_PosX(), selectedBase.get_PosY());
        visMain.Update();
        visMain.ViewUpdate();
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

                const coOrd = ClientLib.Base.MathUtil.EncodeCoordId(scanX, scanY);
                if (this.toScan[coOrd]) {
                    continue;
                }

                const object = world.GetObjectFromPosition(scanX, scanY);
                if (object == null) {
                    continue;
                }

                if (object.Type !== WorldObjectType.NPCBase && object.Type !== WorldObjectType.NPCCamp) {
                    continue;
                }

                if (ClientLibPatcher.hasPatchedCampType(object) && object.$CampType === NpcCampType.Destroyed) {
                    continue;
                }

                this.toScan[coOrd] = {
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
