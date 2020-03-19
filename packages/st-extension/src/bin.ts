import { BugFixer } from './plugins/bug/bug.fix';
import { St } from './st';
import { CampTracker } from './plugins/camp.tracker/camp.tracker';
import { AllianceScanner } from './plugins/alliance.scanner/alliance.scanner';
import { LayoutScanner } from './plugins/layout/layout';
import { KillInfo } from './plugins/kill.info/kill.info';
import { Button } from './plugins/button/button';
import { PlayerStatus } from './plugins/player.status/player.status';
import { StPlugin } from './st.plugin';

interface WindowStatic {
    st?: St;
}

function autoDisable(st: St, module: StPlugin) {
    if (st.config.get(`${module.name}.enabled`) == null) {
        st.config.disable(module);
    }
}

if (typeof window != 'undefined') {
    async function startup() {
        const windowAny = (window as any) as WindowStatic;
        await windowAny.st?.stop();
        const st = St.getInstance();
        windowAny.st = st;
        await st.start();

        const as = new AllianceScanner(st);
        const ls = new LayoutScanner(st);
        const button = new Button(st);

        autoDisable(st, as);
        autoDisable(st, ls);
        autoDisable(st, button);

        st.push(as);
        st.push(ls);
        st.push(new CampTracker(st));
        st.push(new KillInfo(st));
        st.push(button);
        st.push(new PlayerStatus(st));
    }

    startup().catch(e => console.error(e));

    /** FixOnLoad */
    BugFixer.fixOnUnload();
}
