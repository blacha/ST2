import { CityId, CompositeId, TimeStamp, WorldId } from '@cncta/clientlib';
import { V2CityGet } from '@st/api/build/v2/v2.city';
import { Stores } from '@st/model';
import { TypeOf } from 'io-ts';
import { V2ApiHandler, V2Request } from '../v2.request';

export class V2CityGetService extends V2ApiHandler<typeof V2CityGet> {
    def = V2CityGet;

    async handle(req: V2Request, params: TypeOf<typeof V2CityGet['request']>) {
        const { cityId } = params;
        const result = await Stores.City.get(cityId as CompositeId<[WorldId, TimeStamp, CityId]>);
        if (result == null) {
            return { city: undefined };
        }
        return { city: result.city };
    }
}
