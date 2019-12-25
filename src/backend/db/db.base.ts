import { CityLayout } from '../../api/city.layout';
import { DbObject } from './db.object';

export interface DbBase extends DbObject, CityLayout {
    baseId: string;
}

export interface DbLayout extends DbObject {
    layouts: Record<string, { layout: string; updatedAt: number }>;
}
