import { CityLayout } from '../../api/city.layout';
import { DbObject } from './db.object';

export interface DbBase extends DbObject {
    baseId: string;
    base: CityLayout;
}
