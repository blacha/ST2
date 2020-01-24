import { PlayerNameDisplay, WorldId } from '@cncta/clientlib';
import { ApiInstallRequest } from '@st/shared';
import { InstallId, Stores } from '@st/model';
import { ApiCall, ApiRequest } from '../api.call';

export class ApiInstall extends ApiCall<ApiInstallRequest> {
    path = '/api/v1/install/:installId' as const;
    method = 'post' as const;

    async handle(req: ApiRequest<ApiInstallRequest>): Promise<{}> {
        const installId = req.params.installId as InstallId;
        const playerName = req.body.player as PlayerNameDisplay;
        const worldId = Number(req.body.worldId) as WorldId;

        await Stores.Install.transaction(installId, async obj => obj.touch(playerName, worldId));
        // TODO if new install send mail message to confirm
        return {};
    }
}
