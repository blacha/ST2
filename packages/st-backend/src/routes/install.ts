import { ApiInstallRequest } from '@st/shared';
import { ApiCall, ApiRequest } from '../api.call';
import { InstallId, Stores } from '@st/shared/build/db';
import { PlayerId, PlayerName, WorldId } from '@cncta/clientlib/src';

export class ApiInstall extends ApiCall<ApiInstallRequest> {
    path = '/api/v1/world/:worldId/player/:player/install/:installId' as const;
    method = 'get' as const;

    async handle(req: ApiRequest<ApiInstallRequest>): Promise<{}> {
        const installId = req.params.installId as InstallId;
        const playerName = req.params.player as PlayerName;
        const worldId = Number(req.params.worldId) as WorldId;

        await Stores.Install.transaction(installId, async obj => obj.touch(playerName, worldId));
        // TODO if new install send mail message to confirm
        return {};
    }
}
