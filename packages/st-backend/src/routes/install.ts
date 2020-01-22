import { ApiInstallRequest } from '@st/shared';
import { ApiCall, ApiRequest } from '../api.call';
import { InstallId, Stores } from '@st/shared/build/db';

export class ApiInstall extends ApiCall<ApiInstallRequest> {
    path = '/api/v1/world/:worldId/install/:installId' as const;
    method = 'post' as const;

    async handle(req: ApiRequest<ApiInstallRequest>): Promise<{}> {
        const installId = req.params.installId as InstallId;
        const playerName = req.body.player;
        const worldId = Number(req.params.worldId);

        await Stores.Install.transaction(installId, async obj => obj.touch(playerName, worldId));
        // TODO if new install send mail message to confirm
        return {};
    }
}
