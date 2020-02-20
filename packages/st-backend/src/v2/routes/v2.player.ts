import { V2PlayerList } from '@st/api/build/v2/v2.player';
import { Stores } from '@st/model';
import { V2ApiHandler, V2Request } from '../v2.request';

export class V2PlayerListService extends V2ApiHandler<typeof V2PlayerList> {
    def = V2PlayerList;

    async handle(req: V2Request) {
        const userId = await req.userId();

        const playerData = await Stores.User.get(userId);
        if (playerData == null) {
            return { players: [] };
        }

        return { players: playerData.claims };
    }
}
