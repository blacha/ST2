import { ClientLibUtil } from './util/client.lib';
import { ClientLibPatcher } from './patch/patch';
import { StModule } from './module';
import { LayoutScanner } from './city/layout.scan';
import { BaseBuilder } from '../lib/base/base.builder';
import { Base } from '../lib/base/base';
import { ClientLibStatic } from './@types/client.lib';
import { KillInfo } from './kill.info/kill.info';
import { VisitBaseButton } from './visit/visit.base';
import { PlayerInfo } from './player/player.info';
import { Version } from '../version';
import { ClientApi } from './api/client.api';
import { Id } from '../lib/id';

declare const ClientLib: ClientLibStatic;

export class ShockrTools {
    id = Id.generate();
    version = Version;
    base = Base;
    builder = BaseBuilder;

    api = new ClientApi();
    layout = new LayoutScanner();
    plunder = new KillInfo();
    button = new VisitBaseButton();
    player = new PlayerInfo();

    Modules: StModule[] = [this.api, this.layout, this.plunder, this.button, this.player];

    async start() {
        let failCount = 0;
        while (ClientLibUtil.isLoaded() === false) {
            failCount++;
            await new Promise(resolve => setTimeout(resolve, 100));
            if (failCount > 100) {
                throw new Error('ShockrTools failed to start after 100 attempts.');
            }
        }

        // Patch the client lib before starting the modules
        ClientLibPatcher.patch();
        console.log('st:starting', this.id);
        for (const mod of this.Modules) {
            if (mod.start) {
                console.log('\tstart' + mod.name, this.id);
                await mod.start(this);
            }
        }
    }

    select(b: Base): void;
    select(x: number, y: number): void;
    select(x: number | Base, y?: number): void {
        if (typeof x == 'number' && typeof y == 'number') {
            this.selectXy(x, y);
        } else if (x instanceof Base) {
            this.selectXy(x.x, x.y);
        }
    }

    selectXy(x: number, y: number) {
        ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(x, y);

        const md = ClientLib.Data.MainData.GetInstance();

        const world = md.get_World();
        const obj = world.GetObjectFromPosition(x, y);
        if (obj == null) {
            return;
        }

        if (ClientLibPatcher.hasPatchedId(obj)) {
            md.get_Cities().set_CurrentCityId(obj.$Id);
        }
    }

    async stop() {
        console.log('st:stopping', this.id);
        for (const mod of this.Modules) {
            if (mod.stop) {
                console.log('\tstop', mod.name, this.id);
                await mod.stop();
            }
        }
        console.log('st:stopped', this.id);
    }
}

export const StStatic = new ShockrTools();

if (typeof window != 'undefined') {
    async function startup() {
        const windowAny = window as any;
        if (windowAny.st) {
            await windowAny.st.stop();
        }

        windowAny.st = StStatic;
        await StStatic.start();
    }

    startup().catch(e => console.error(e));
}
