import { ClientLibEventEmitter, ClientLibEvents } from '../clientlib';

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
}

export interface PheStatic {
    cnc: {
        Util: PheStaticUtil;
    };
}
