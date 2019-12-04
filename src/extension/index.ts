import { ClientLibUtil } from './util/client.lib';
import { ClientLibPatcher } from './patch/patch';
import { StModule } from './module';
import { LayoutScanner } from './city/layout.scan';
import { BaseBuilder } from '../lib/base.builder';

class ShockrTools {
    Base = BaseBuilder;
    Modules: Record<string, StModule> = {
        Layout: new LayoutScanner(),
    };

    get mods() {
        return Object.values(this.Modules);
    }

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

        for (const mod of this.mods) {
            await mod.start();
        }
    }

    async stop() {
        for (const mod of this.mods) {
            await mod.stop();
        }
    }
}

if (typeof window != 'undefined') {
    const windowAny = window as any;
    if (windowAny.ST) {
        windowAny.ST.stop();
    }
    const st = new ShockrTools();
    windowAny.ST = st;
    st.start().catch(e => console.error(e));
}
