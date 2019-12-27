import { DbObject } from './db.object';
import { CityLayout } from '../../api/city.layout';

export interface DbPlayer extends DbObject {
    allianceId: number | null;
    allianceKey: string; // Packed worldId + allianceId
    ownerId: number;
    worldId: number;
    bases: Record<string, CityLayout>; // cityId
}

export interface BaseLayout {
    xy: string;
    layout: string;
    updatedAt: number;
}

export interface DbLayout extends DbObject {
    layouts: Record<string, BaseLayout>; // xy
}
