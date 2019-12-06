import { ClientLibUtil } from './util/client.lib';
import { ClientLibPatcher } from './patch/patch';
import { StModule } from './module';
import { LayoutScanner } from './city/layout.scan';
import { BaseBuilder } from '../lib/base.builder';
import { Base } from '../lib/base';

class ShockrTools {
    Version = {
        /** package.json version */
        version: '__VERSION__',
        /** Git commit hash */
        hash: '__HASH__',
    };

    Base = BaseBuilder;
    Layout = new LayoutScanner();
    Modules: StModule[] = [this.Layout];

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

    async stop() {
        for (const mod of this.Modules) {
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
