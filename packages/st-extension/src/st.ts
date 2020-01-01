import { ClientLibStatic, ClientLibLoader, ClientLibPatcher, ClientLib } from '@cncta/clientlib';
import { Id, StLog } from '@st/shared';
import { StModule, hasStModuleHooks, StModuleState } from './module/module';
import { LayoutScanner } from './module/layout/layout.scan';
import { AllianceScanner } from './module/alliance/alliance.info';
import { ClientApi } from './api/client.api';
import { ButtonScan } from './module/button/button.scan';

declare const Clientlib: ClientLibStatic;

/** What is the player currently upto */
export enum PlayerState {
    /** Has recently done something */
    Active,
    /** Hasnt moved in a while */
    Idle,
}

export enum StState {
    Idle,
    Active,
}

const InstanceIdKey = 'st-instance-id';

export class St {
    static instance: St;
    static getInstance() {
        if (St.instance == null) {
            St.instance = new St();
        }
        return St.instance;
    }

    id = Id.generate();

    /** Unique installation key */
    get instanceId() {
        let instanceId = localStorage.getItem(InstanceIdKey);
        if (instanceId == null) {
            instanceId = Id.generate();
            localStorage.setItem(InstanceIdKey, instanceId);
        }
        return instanceId;
    }

    log: typeof StLog;

    api = new ClientApi();
    layout = new LayoutScanner();
    alliance = new AllianceScanner();

    modules: StModule[] = [this.layout, this.alliance, this.api, new ButtonScan()];

    player: PlayerState = PlayerState.Idle;
    state: StState = StState.Idle;
    stateModule: StModule | null;

    get isIdle(): boolean {
        return this.state == StState.Idle;
    }

    get isPlayerIdle(): boolean {
        return this.player == PlayerState.Idle;
    }

    /**
     * Run a function inside the state lock, so that only one thing can be scanning at a time.
     *
     * This should be pausable if the user decides to move the mouse and click @see this.player state
     */
    async run<T>(module: StModule, cb: () => AsyncGenerator<T>): Promise<T[]> {
        if (!this.isIdle) {
            throw new Error('ST is not idle');
        }
        try {
            const output: T[] = [];

            this.state = StState.Active;
            this.stateModule = module;
            for await (const res of cb()) {
                output.push(res);
                if (module) {
                    // Acquire lock again
                }
            }
            return output;
        } finally {
            this.state = StState.Idle;
            this.stateModule = null;
        }
    }

    constructor() {
        this.log = StLog.child({ id: this.id });
    }

    get isClientLoaded(): boolean {
        return ClientLibLoader.isLoaded;
    }

    async start() {
        this.log.debug('StStartup');
        let failCount = 0;
        while (this.isClientLoaded === false) {
            failCount++;
            await new Promise(resolve => setTimeout(resolve, 100));
            if (failCount > 100) {
                this.log.error('StStartup:Failed');

                throw new Error('ShockrTools failed to start after 100 attempts.');
            }
        }

        this.log.trace('StPatch');
        ClientLibPatcher.patch(ClientLib);

        for (const module of this.modules) {
            this.log.debug({ module: module.name }, 'StModule:Start');
            if (module.state != StModuleState.Init) {
                this.log.warn({ module: module.name, state: module.state }, 'Invalid module state');
                continue;
            }
            if (!hasStModuleHooks(module)) {
                continue;
            }
            await module.start(this);
            if (module.state !== StModuleState.Started) {
                this.log.warn({ module: module.name, state: module.state }, 'Module failed to start');
            }
        }
    }

    async stop() {
        for (const module of this.modules) {
            this.log.debug({ module: module.name }, 'StModule:Stop');

            if (module.state != StModuleState.Started) {
                continue;
            }
            if (!hasStModuleHooks(module)) {
                continue;
            }
            await module.stop();
            if (module.state !== StModuleState.Stopped) {
                this.log.warn({ module: module.name, state: module.state }, 'Module failed to stop');
            }
        }
    }

    add(m: StModule) {
        this.log.debug({ module: m.name }, 'StModule:Add');

        if (m.state !== StModuleState.Init) {
            throw new Error('Invalid module state: ' + m.name + ' ' + m.state);
        }

        if (this.modules.find(f => f.name == m.name)) {
            throw new Error('Duplicate module name: ' + m.name);
        }

        this.modules.push(m);
        if (this.isClientLoaded && hasStModuleHooks(m)) {
            m.start(this).catch(error => StLog.error({ error, module: m.name }, 'Failed to start module'));
        }
    }
}
