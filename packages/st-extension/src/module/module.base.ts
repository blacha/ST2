import { ClientLibEventEmitter, ClientLibEvents, PheStatic, ClientLibClass } from '@cncta/clientlib';
import { Id } from '@st/shared';
import { St } from '../st';
import { StModuleHooks, StModuleState } from './module';
import { ClientLibPatch } from '@cncta/util';
import { StAction } from '../actions';

declare const phe: PheStatic;

export interface EventContext<T extends ClientLibEvents<T>, K extends keyof T> {
    source: ClientLibEventEmitter<T>;
    name: K;
    type: T[K];
    cb: Function;
}

export abstract class StModuleBase implements StModuleHooks {
    /** Unique id for the specific instantiation of the module */
    id: string = Id.generate();
    /** Module name, should be unique */
    abstract name: string;
    state = StModuleState.Init;
    st: St;

    /** Bound events to ClientLib */
    events: EventContext<any, any>[] = [];
    /** Any periodic timers needed */
    timers: number[] = [];
    /** ClientLib Patches specifically applied for this module */
    patches: ClientLibPatch<{}, any>[] = [];

    /** Optional hook called when the module starts */
    onStart?(): Promise<void>;
    /** Optional hook called when the module stops */
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
        this.clearActions();
        await this.onStop?.();
        // Destroy events
        for (const event of this.events) {
            phe.cnc.Util.detachNetEvent(event.source, event.name, event.type, this, event.cb);
        }
        // Destroy timers
        for (const timer of this.timers) {
            clearInterval(timer);
        }
        // Remove any clientlib patches
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

    clearActions() {
        this.st.clearActions(this);
    }

    queue(action: StAction) {
        this.st.queue({ module: this, run: action });
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
