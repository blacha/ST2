import { V2PlayerGet, V2PlayerCityGet } from '@st/api/build/v2/v2.player';
import { Stores } from '@st/model';
import { TypeOf } from 'io-ts';
import { PermissionChecker } from '../../permission/check';
import { V2ApiHandler, V2Request } from '../v2.request';
import { WorldPlayerId } from '@st/shared';
import { CompositeId, WorldId, PlayerId } from '@cncta/clientlib';

export class V2PlayerGetService extends V2ApiHandler<typeof V2PlayerGet> {
    def = V2PlayerGet;

    async handle(req: V2Request, params: TypeOf<typeof V2PlayerGet['request']>) {
        const userId = await req.userId();
        const userObj = await Stores.User.get(userId);

        for (const playerId of params.playerNameIds) {
            PermissionChecker.assertPlayer(req, playerId, userObj);
        }

        const playerData = await Stores.Player.getAllBy({ playerNameId: params.playerNameIds });
        return { players: playerData };
    }
}

export class V2PlayerCityGetService extends V2ApiHandler<typeof V2PlayerCityGet> {
    def = V2PlayerCityGet;

    async handle(req: V2Request, params: TypeOf<typeof V2PlayerCityGet['request']>) {
        const userId = await req.userId();
        const userObj = await Stores.User.get(userId);

        const { worldId, playerId } = params;
        const docId = WorldPlayerId.pack({ worldId, playerId }) as CompositeId<[WorldId, PlayerId]>;
        const result = await Stores.Player.get(docId);
        if (result == null) {
            return { cities: [], worldId, playerId };
        }

        if (result.allianceId == null) {
            PermissionChecker.assertPlayer(req, result.playerNameId, userObj);
        } else {
            PermissionChecker.assertAlliance(req, worldId, result.allianceId, userObj);
        }

        return { cities: Object.values(result.cities), worldId, playerId };
    }
}
