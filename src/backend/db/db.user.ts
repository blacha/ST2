import { DbObject } from './db.object';

export interface DbUser extends DbObject {
    name: string;

    /** Player CNC Info */
    cncId?: number;
    cncName?: string;

    claims: {
        [allianceId: string]: boolean;
    };
}
