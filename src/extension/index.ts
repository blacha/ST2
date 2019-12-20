import { ClientLibUtil } from './util/client.lib';
import { ClientLibPatcher } from './patch/patch';
import { StModule } from './module';
import { LayoutScanner } from './city/layout.scan';
import { BaseBuilder } from '../lib/base.builder';
import { Base } from '../lib/base';
import { ClientLibStatic } from './@types/client.lib';
import { KillInfo } from './killinfo/kill.info';
import { VisitBaseButton } from './visit/visit.base';
import { PlayerInfo } from './player/player.info';

declare const ClientLib: ClientLibStatic;

class ShockrTools {
    Version = {
        /** package.json version */
        version: '__VERSION__',
        /** Git commit hash */
        hash: '__HASH__',
    };

    Base = Base;
    Builder = BaseBuilder;
    Layout = new LayoutScanner();
    KillInfo = new KillInfo();
    VisitBase = new VisitBaseButton();
    Player = new PlayerInfo();
    Modules: StModule[] = [this.Layout, this.KillInfo, this.VisitBase, this.Player];

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
        console.log('st:starting');
        for (const mod of this.Modules) {
            console.log('\tstart' + mod.name);
            await mod.start();
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
            md.get_Cities().set_CurrentCityId(obj.$get_Id());
        }
    }

    async stop() {
        console.log('st:stopping');
        for (const mod of this.Modules) {
            console.log('\tstop', mod.name);
            await mod.stop();
        }
        console.log('st:stopped');
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
