import { DbObject } from './db.object';
import { StCity } from '@cncta/clientlib';

export interface DbBase extends DbObject, StCity {
    baseId: string;
}
