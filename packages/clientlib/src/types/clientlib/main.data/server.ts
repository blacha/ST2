import { WorldId } from '../../../id';

/* eslint-disable @typescript-eslint/camelcase */

export interface ClientLibServer {
    get_WorldId(): WorldId;
    get_MaxAttackDistance(): number;

    /** Level difference to activate tunnel exits */
    get_POIActivationLevelDifference(): number;
}
