import { St } from '../st';

export interface StModule {
    /** Module instance id */
    id: string;
    /** Module name, should be unique */
    name: string;
    /** Current module lifecycle */
    state: StModuleState;
}

export interface StModuleHooks extends StModule {
    start(st: St): Promise<void>;
    stop(): Promise<void>;
}

export function hasStModuleHooks(x: any): x is StModuleHooks {
    return typeof x.start == 'function';
}

export enum StModuleState {
    Init,
    Starting,
    Started,
    Stopping,
    Stopped,
}
