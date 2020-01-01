import { ClientLibVis } from '../clientlib/vis';

// TODO add more event names
export type PheEventName = 'SelectionChange';

export interface PheStatic {
    cnc: {
        Util: {
            attachNetEvent(
                mainData: ClientLibVis,
                evtName: PheEventName,
                eventFunction: Function,
                thisArg: any,
                callback: Function,
            ): void;
            detachNetEvent(
                mainData: ClientLibVis,
                evtName: PheEventName,
                eventFunction: Function,
                thisArg: any,
                callback: Function,
            ): void;
        };
    };
}
