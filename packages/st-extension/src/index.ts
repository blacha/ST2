import { St } from './st';

if (typeof window != 'undefined') {
    async function startup() {
        const windowAny = window as any;
        if (windowAny.st != null) {
            await windowAny.st.stop();
        }

        const st = St.getInstance();
        windowAny.st = st;
        await st.start();
    }

    startup().catch(e => console.error(e));
}
