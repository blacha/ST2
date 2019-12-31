/* eslint-disable @typescript-eslint/camelcase */

export interface ClientLibServer {
    get_WorldId(): number;
    get_MaxAttackDistance(): number;

    /** Level difference to activate tunnel exits */
    get_POIActivationLevelDifference(): number;
}
