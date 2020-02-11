import { St } from '../../st';

export type WindowFixed = Window & { _addEventListener: typeof Window.prototype.addEventListener };

export class BugFixer {
    /**
     * `window.onunload` takes a very long time inside of _onNativeUnload
     * which appears to be destroying objects.
     *
     * quick hack remove onunload listeners
     */
    static fixOnUnload() {
        const fixedWindow = (window as any) as WindowFixed;
        fixedWindow._addEventListener = window.addEventListener;
        window.addEventListener = function(a: string, b: any, c?: any) {
            if (a == 'unload') {
                St.getInstance().log.info('Prevented Unload bug');
                return;
            }
            return fixedWindow._addEventListener(a, b, c);
        };
    }
}
