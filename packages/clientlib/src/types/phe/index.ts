import { ClientLibEvent, ClientLibEventName, ClientLibEventEmitter } from '../clientlib';

// TODO add more event names

export interface PheStatic {
    cnc: {
        Util: {
            attachNetEvent(
                source: ClientLibEventEmitter,
                evtName: ClientLibEventName,
                eventFunction: ClientLibEvent,
                thisArg: any,
                callback: Function,
            ): void;
            detachNetEvent(
                source: ClientLibEventEmitter,
                evtName: ClientLibEventName,
                eventFunction: ClientLibEvent,
                thisArg: any,
                callback: Function,
            ): void;
        };
    };
}
