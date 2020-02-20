import { V2LayoutGet } from '@st/api/build/v2/v2.layout';
import { Stores } from '@st/model';
import { TypeOf } from 'io-ts';
import { PermissionChecker } from '../../permission/check';
import { V2ApiHandler, V2Request } from '../v2.request';
import { WorldAllianceId, NumberPacker } from '@st/shared';
import { CompositeId, WorldId, AllianceId } from '@cncta/clientlib';
import { BaseLocationPacker } from '@cncta/util';

export class V2LayoutGetService extends V2ApiHandler<typeof V2LayoutGet> {
    def = V2LayoutGet;

    async handle(req: V2Request, params: TypeOf<typeof V2LayoutGet['request']>) {
        const userId = await req.userId();
        const userObj = await Stores.User.get(userId);

        const { worldId, allianceId } = params;
        PermissionChecker.assertAlliance(req, worldId, allianceId, userObj);
        const docId = WorldAllianceId.pack({ worldId, allianceId }) as CompositeId<[WorldId, AllianceId]>;
        const layoutData = await Stores.Layout.get(docId);
        if (layoutData == null) {
            return { layouts: [] };
        }

        const layouts = Object.entries(layoutData.layouts)
            .map(([k, v]) => {
                const xy = BaseLocationPacker.unpack(NumberPacker.unpack(k)[0]);
                return {
                    ...v,
                    ...xy,
                };
            })
            .sort((a, b) => a.updatedAt - b.updatedAt);
        return { layouts };
    }
}
