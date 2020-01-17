import { St } from './st';

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
    }

    startup().catch(e => console.error(e));
}
