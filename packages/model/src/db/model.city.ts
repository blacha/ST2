import { CityId, WorldId, TimeStamp } from '@cncta/clientlib';
import { StCity } from '@cncta/util';
import { Model } from './model';
import { CompositeId } from '@cncta/clientlib';

export class ModelCity extends Model<ModelCity> {
    id: CompositeId<[WorldId, TimeStamp, CityId]>;
    city: StCity;

    constructor(data?: Partial<ModelCity>) {
        super(data);
        this.city = data?.city ?? ({} as any);
    }
}
