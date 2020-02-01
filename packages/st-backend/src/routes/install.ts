import { PlayerNameDisplay, WorldId } from '@cncta/clientlib';
import { ApiInstallRequest, isValidWorld } from '@st/shared';
import { InstallId, Stores } from '@st/model';
import { ApiCall, ApiRequest } from '../api.call';
import { HttpError } from '../http.error';

export class ApiInstall extends ApiCall<ApiInstallRequest> {
    path = '/api/v1/install/:installId' as const;
    method = 'post' as const;

    async handle(req: ApiRequest<ApiInstallRequest>): Promise<{}> {
        const installId = req.params.installId as InstallId;
        const playerName = req.body.player as PlayerNameDisplay;
        const worldId = Number(req.body.worldId) as WorldId;
        if (playerName == null) {
            throw new HttpError(400, 'Missing player name');
        }

        if (!isValidWorld(worldId)) {
            throw new HttpError(400, 'Invalid worldId');
        }
        req.log.info({ player: playerName, worldId, installId }, 'ExtensionInstall');

        await Stores.Install.transaction(installId, async obj => obj.touch(playerName, worldId));
        // TODO if new install send mail message to confirm
        return {};
    }
}
