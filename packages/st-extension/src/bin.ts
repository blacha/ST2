import { St } from './st';
import { CampTracker } from './plugins/camp.tracker/camp.tracker';
import { AllianceScanner } from './plugins/alliance.scanner/alliance.scanner';
import { LayoutScanner } from './plugins/layout/layout';
import { KillInfo } from './plugins/kill.info/kill.info';
import { Button } from './plugins/button/button';
import { PlayerStatus } from './plugins/player.status/player.status';

interface WindowStatic {
    st?: St;
}

if (typeof window != 'undefined') {
    async function startup() {
        const windowAny = (window as any) as WindowStatic;
        windowAny.st?.stop();
        const st = St.getInstance();
        windowAny.st = st;
        await st.start();

        st.push(new CampTracker(st));
        st.push(new AllianceScanner(st));
        st.push(new LayoutScanner(st));
        st.push(new KillInfo(st));
        st.push(new Button(st));
        st.push(new PlayerStatus(st));
    }

    startup().catch(e => console.error(e));
}
