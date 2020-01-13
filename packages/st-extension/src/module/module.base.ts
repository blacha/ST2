import { ClientLibEventEmitter, ClientLibEvents, PheStatic, ClientLibClass } from '@cncta/clientlib';
import { Id } from '@st/shared';
import { St } from '../st';
import { StModuleHooks, StModuleState } from './module';
import { ClientLibPatch } from '@cncta/util';

declare const phe: PheStatic;

export interface EventContext<T extends ClientLibEvents<T>, K extends keyof T> {
    source: ClientLibEventEmitter<T>;
    name: K;
    type: T[K];
    cb: Function;
}

export abstract class StModuleBase implements StModuleHooks {
    id: string = Id.generate();
    name: string;
    state = StModuleState.Init;
    st: St;

    events: EventContext<any, any>[] = [];
    timers: number[] = [];
    patches: ClientLibPatch<{}, any>[] = [];

    onStart?(): Promise<void>;
    onStop?(): Promise<void>;

    async start(st: St): Promise<void> {
        this.state = StModuleState.Starting;
        this.st = st;
        await this.onStart?.();

        for (const patch of this.patches) {
            st.log.info({ patch }, 'Patch:Apply');
            patch.apply();
        }

        this.state = StModuleState.Started;
    }

    async stop(): Promise<void> {
        this.state = StModuleState.Stopping;
        await this.onStop?.();
        // Destroy events
        for (const event of this.events) {
            phe.cnc.Util.detachNetEvent(event.source, event.name, event.type, this, event.cb);
        }
        for (const timer of this.timers) {
            clearInterval(timer);
        }
        for (const patch of this.patches) {
            patch.remove();
        }
        this.state = StModuleState.Stopped;
    }

    patch<T extends {}>(obj: ClientLibClass<T>): ClientLibPatch<{}, T> {
        const patch = new ClientLibPatch(() => obj);
        this.patches.push(patch);
        return patch;
    }

    interval(func: Function, timeout: number) {
        this.timers.push(setInterval(func, timeout));
    }

    addEvent<T extends ClientLibEvents<T>, K extends keyof T>(
        source: ClientLibEventEmitter<T>,
        name: K,
        type: T[K],
        cb: Function,
    ) {
        this.events.push({ source, name, type, cb });
        phe.cnc.Util.attachNetEvent(source, name, type, this, cb);
    }

    get isStopping(): boolean {
        return this.state == StModuleState.Stopped || this.state == StModuleState.Stopping;
    }

    get isReady(): boolean {
        return this.state == StModuleState.Started;
    }
}
