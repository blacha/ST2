declare let qx: any;
export class ClientLibUtil {
    static isLoaded(): boolean {
        if (typeof ClientLib === 'undefined') {
            return false;
        }

        if (typeof qx === 'undefined') {
            return false;
        }

        const a = qx.core.Init.getApplication();
        if (a === null || a === undefined) {
            return false;
        }

        const mb = qx.core.Init.getApplication().getMenuBar();
        if (mb === null || mb === undefined) {
            return false;
        }

        const md = ClientLib.Data.MainData.GetInstance();
        if (md === null || md === undefined) {
            return false;
        }

        const player = md.get_Player();
        if (player === null || player === undefined) {
            return false;
        }

        if (player.name === '') {
            return false;
        }

        return true;
    }
}
