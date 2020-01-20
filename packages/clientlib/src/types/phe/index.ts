import { ClientLibEventEmitter, ClientLibEvents, ClientLibEvent } from '../clientlib';

export interface ClientLibDelegateCreation {
    response: unknown;
}

export interface PheStaticUtil {
    attachNetEvent<T extends ClientLibEvents<T>, K extends keyof T>(
        source: ClientLibEventEmitter<T>,
        evtName: K,
        eventFunction: T[K],
        thisArg: any,
        callback: Function,
    ): void;

    detachNetEvent<T extends ClientLibEvents<T>, K extends keyof T>(
        source: ClientLibEventEmitter<T>,
        evtName: K,
        eventFunction: T[K],
        thisArg: any,
        callback: Function,
    ): void;

    createEventDelegate<T extends ClientLibDelegateCreation>(
        evt: ClientLibEvent,
        thisArg: any,
        cb: (context: unknown, data: T['response']) => void,
    ): ClientLibEventDelegate<T['response']>;
}

export interface ClientLibEventDelegate<T> {
    /** Used for typings */
    __delegate: T;
}

export interface PheStatic {
    cnc: {
        Util: PheStaticUtil;
    };
}
