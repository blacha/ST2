import { CityId, WorldId } from '@cncta/clientlib';
import { StCity } from '@cncta/util';
import { Model, TimeStamp } from './model';
import { CompositeId } from '../id';

export class ModelBase extends Model<ModelBase> {
    id: CompositeId<[WorldId, CityId, TimeStamp]>;
    city: StCity;

    constructor(data?: Partial<ModelBase>) {
        super(data);
        this.city = data?.city ?? ({} as any);
    }
}
