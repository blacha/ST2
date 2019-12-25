import { CityLayout } from '../../api/city.layout';
import { DbObject } from './db.object';

export interface DbBase extends DbObject, CityLayout {
    baseId: string;
}
