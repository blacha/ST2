import { IdName, StCity } from '@cncta/plugin';
import { DbObject } from './db.object';

export interface DbPlayer extends DbObject {
    alliance: IdName | null;
    allianceKey: string; // Packed worldId + allianceId
    owner: IdName;
    worldId: number;
    bases: Record<string, StCity>; // Packed cityId
}
