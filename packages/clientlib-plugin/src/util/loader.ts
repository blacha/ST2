import { ClientLibStatic, QxStatic } from '@cncta/clientlib';

declare let qx: QxStatic;
declare const ClientLib: ClientLibStatic;
export class ClientLibLoader {
    /** Has the game fully loaded */
    static get isLoaded(): boolean {
        if (typeof ClientLib === 'undefined') {
            return false;
        }

        if (typeof qx === 'undefined') {
            return false;
        }

        const a = qx.core.Init.getApplication();
        if (a == null) {
            return false;
        }

        const mb = a.getMenuBar();
        if (mb == null) {
            return false;
        }

        const md = ClientLib.Data.MainData.GetInstance();
        if (md == null) {
            return false;
        }

        const player = md.get_Player();
        if (player == null) {
            return false;
        }

        if (player.name === '') {
            return false;
        }

        return true;
    }
}
