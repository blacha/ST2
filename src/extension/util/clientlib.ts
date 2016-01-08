export class ClientLibUtil {

    static isLoaded():boolean {
        if (typeof ClientLib === 'undefined') {
            return false;
        }

        if (typeof qx === 'undefined') {
            return false;
        }

        var a = qx.core.Init.getApplication();
        if (a === null || a === undefined) {
            return false;
        }

        var mb = qx.core.Init.getApplication().getMenuBar();
        if (mb === null || mb === undefined) {
            return false;
        }

        var md = ClientLib.Data.MainData.GetInstance();
        if (md === null || md === undefined) {
            return false;
        }

        var player = md.get_Player();
        if (player === null || player === undefined) {
            return false;
        }

        if (player.get_Name() === '') {
            return false;
        }

        return true;
    }
}