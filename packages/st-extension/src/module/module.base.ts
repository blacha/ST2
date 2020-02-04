import { ClientLibEventEmitter, ClientLibEvents, PheStatic, ClientLibClass } from '@cncta/clientlib';
import { Id } from '@st/shared';
import { St } from '../st';
import { StModuleHooks, StModuleState } from './module';
import { ClientLibPatch } from '@cncta/util';
import { StAction } from '../actions';
import { StCliCommand } from './cli';

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

    constructor(st: St) {
        this.st = st;
    }

    /** Bound events to ClientLib */
    events: EventContext<any, any>[] = [];
    /** Any periodic timers needed */
    timers: number[] = [];
    /** ClientLib Patches specifically applied for this module */
    patches: ClientLibPatch<{}, any>[] = [];

    cliCommands: StCliCommand[] = [];

    /** Optional hook called when the module starts */
    onStart?(): Promise<void>;
    /** Optional hook called when the module stops */
    onStop?(): Promise<void>;

    /** Optional hook called when config changes */
    onConfig?(): void;

    async start(): Promise<void> {
        this.state = StModuleState.Starting;
        await this.onStart?.();

        for (const patch of this.patches) {
            this.st.log.info({ patch }, 'Patch:Apply');
            patch.apply();
        }

        this.onConfig?.();
        this.state = StModuleState.Started;
    }

    cli(cmd: StCliCommand) {
        this.st.cli.register(cmd);
        this.cliCommands.push(cmd);
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
        this.cliCommands.forEach(c => this.st.cli.unregister(c));
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
