import { ClientLibEvent, ClientLibEventName, ClientLibEventSource } from '../clientlib';

// TODO add more event names

export interface PheStatic {
    cnc: {
        Util: {
            attachNetEvent(
                source: ClientLibEventSource,
                evtName: ClientLibEventName,
                eventFunction: ClientLibEvent,
                thisArg: any,
                callback: Function,
            ): void;
            detachNetEvent(
                source: ClientLibEventSource,
                evtName: ClientLibEventName,
                eventFunction: ClientLibEvent,
                thisArg: any,
                callback: Function,
            ): void;
        };
    };
}
