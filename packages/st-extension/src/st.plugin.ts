import { ClientLibEventEmitter, ClientLibEvents, PheStatic, ClientLibClass } from '@cncta/clientlib';
import { St } from './st';
import { ClientLibPatch } from '@cncta/util';
import { StCliCommand, StCliCommandSub } from './st.cli';
import { Id } from '@st/shared/build/id';
import { StAction } from './st.actions';
import { StConfigData } from './st.config';

declare const phe: PheStatic;

export interface EventContext<T extends ClientLibEvents<T>, K extends keyof T> {
    source: ClientLibEventEmitter<T>;
    name: K;
    type: T[K];
    cb: Function;
}

export enum StPluginState {
    Init = 'init',
    Starting = 'starting',
    Started = 'started',
    Stopping = 'stopping',
    Stopped = 'stopped',
}
export type StPluginConfig = Record<string, StConfigData>;

export abstract class StPlugin<Conf extends StPluginConfig = StPluginConfig> {
    /** Unique id for the specific instantiation of the module */
    id: string = Id.generate();
    /** Module name, should be unique */
    abstract name: string;
    abstract priority: number;
    options?: Conf;

    state: StPluginState = StPluginState.Init;
    st: St;

    constructor(st: St) {
        this.st = st;
    }

    /** Bound events to ClientLib */
    private events: EventContext<any, any>[] = [];
    /** Any periodic timers needed */
    private timers: number[] = [];
    /** ClientLib Patches specifically applied for this module */
    protected patches: ClientLibPatch<{}, any>[] = [];

    private cliCommands: (StCliCommand | StCliCommandSub)[] = [];

    /** Optional hook called when the module starts */
    onStart?(): Promise<void>;
    /** Optional hook called when the module stops */
    onStop?(): Promise<void>;

    /** Optional hook called when config changes */
    onConfig?(): void;

    async start(): Promise<void> {
        this.state = StPluginState.Starting;
        await this.onStart?.();

        for (const patch of this.patches) {
            patch.apply();
        }
        if (this.patches.length > 0) {
            this.st.log.info({ plugin: this.name, patches: this.patches.length }, 'Patch:Apply');
        }

        this.onConfig?.();
        this.state = StPluginState.Started;
    }

    protected cli(cmd: StCliCommand | StCliCommandSub) {
        this.st.cli.register(cmd);
        this.cliCommands.push(cmd);
    }

    async stop(): Promise<void> {
        this.state = StPluginState.Stopping;
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
        this.state = StPluginState.Stopped;
    }

    config<T extends keyof Conf>(key: T): Conf[T]['value'] {
        if (this.config == null) {
            throw new Error('No config provided for plugin: ' + this.name);
        }
        const res = this.st.config.get(`${this.name}.${key}` as any);
        if (res == null) {
            return this.options?.[key]?.value as any;
        }
        return res as any;
    }

    protected patch<T extends {}>(obj: ClientLibClass<T>): ClientLibPatch<{}, T> {
        const patch = new ClientLibPatch(() => obj);
        this.patches.push(patch);
        return patch;
    }

    protected interval(func: Function, timeout: number) {
        this.timers.push(setInterval(func, timeout));
    }

    protected clearActions() {
        this.st.actions.clear(this);
    }

    protected queueAction(action: StAction) {
        this.st.actions.queue({ plugin: this, run: action });
    }

    protected addEvent<T extends ClientLibEvents<T>, K extends keyof T>(
        source: ClientLibEventEmitter<T>,
        name: K,
        type: T[K],
        cb: Function,
    ) {
        this.events.push({ source, name, type, cb });
        phe.cnc.Util.attachNetEvent(source, name, type, this, cb);
    }

    get isStopping(): boolean {
        return this.state == StPluginState.Stopped || this.state == StPluginState.Stopping;
    }

    get isStarting(): boolean {
        return this.state == StPluginState.Started || this.state == StPluginState.Starting;
    }

    get isInit(): boolean {
        return this.state == StPluginState.Init;
    }

    get isStarted(): boolean {
        return this.state == StPluginState.Started;
    }
}
