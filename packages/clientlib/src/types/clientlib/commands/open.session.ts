import { GameWorldCommand } from './command';

export interface CommandOpenSession extends GameWorldCommand {
    command: 'OpenSession';
    request: {
        platformId: number;
        refId: number;
        reset: boolean;
        version: number;
        session: string;
    };
    response: {
        /** UUID  */
        i: string;
        /** @example 1 */
        r: number;
        /** Looks like a date time */
        ri: number;
    };
}
