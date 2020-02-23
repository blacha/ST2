import { V2AllianceGet } from '@st/api/build/v2/v2.alliance';
import { Stores } from '@st/model';
import { TypeOf } from 'io-ts';
import { PermissionChecker } from '../../permission/check';
import { V2ApiHandler, V2Request } from '../v2.request';
import { WorldAllianceId } from '@st/shared';
import { CompositeId, WorldId, AllianceId } from '@cncta/clientlib';

export class V2AllianceGetService extends V2ApiHandler<typeof V2AllianceGet> {
    def = V2AllianceGet;

    async handle(req: V2Request, params: TypeOf<typeof V2AllianceGet['request']>) {
        const userId = await req.userId();
        const userObj = await Stores.User.get(userId);

        const { worldId, allianceId } = params;
        PermissionChecker.assertAlliance(req, worldId, allianceId, userObj);
        const docId = WorldAllianceId.pack({ worldId, allianceId }) as CompositeId<[WorldId, AllianceId]>;

        const playerData = await Stores.Player.getAllBy({ allianceKey: docId }, 100);

        return { players: playerData.sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 50) };
    }
}
