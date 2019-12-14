import { ClientLibUtil } from './util/client.lib';
import { ClientLibPatcher } from './patch/patch';
import { StModule } from './module';
import { LayoutScanner } from './city/layout.scan';
import { BaseBuilder } from '../lib/base.builder';
import { Base } from '../lib/base';
import { ClientLibStatic } from './@types/client.lib';
import { KillInfo } from './killinfo/kill.info';

declare const ClientLib: ClientLibStatic;

class ShockrTools {
    Version = {
        /** package.json version */
        version: '__VERSION__',
        /** Git commit hash */
        hash: '__HASH__',
    };

    Base = BaseBuilder;
    Layout = new LayoutScanner();
    KillInfo = new KillInfo();
    Modules: StModule[] = [this.Layout, this.KillInfo];

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

        for (const mod of this.Modules) {
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
        for (const mod of this.Modules) {
            await mod.stop();
        }
    }
}

if (typeof window != 'undefined') {
    const windowAny = window as any;
    if (windowAny.st) {
        windowAny.st.stop();
    }
    const st = new ShockrTools();
    windowAny.st = st;
    st.start().catch(e => console.error(e));
}
