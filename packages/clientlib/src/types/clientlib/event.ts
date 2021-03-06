/* eslint-disable @typescript-eslint/no-empty-interface */
export interface ClientLibEvent {
    // Place holder for events
    data: unknown;
}

export type ClientLibEvents<T> = Record<keyof T, ClientLibEvent>;
export declare class ClientLibEventEmitter<T extends ClientLibEvents<T>> {
    /** used for typing of events */
    __events: T;
}
