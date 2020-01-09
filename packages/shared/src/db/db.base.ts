import { DbObject } from './db.object';
import { StCity } from '@cncta/plugin';

export interface DbBase extends DbObject, StCity {
    baseId: string;
}
