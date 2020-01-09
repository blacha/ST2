import { DbObject } from './db.object';
import { StCity } from '@cncta/util';

export interface DbBase extends DbObject, StCity {
    baseId: string;
}
