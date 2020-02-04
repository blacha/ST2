import { CityScannerUtil, CityUtil, ClientLibLoader, Patches, LocalCache } from '@cncta/util';
import { Id, StLog } from '@st/shared';
import { StModuleAction } from './actions';
import { ClientApi } from './api/client.api';
import { AllianceScanner } from './module/alliance/alliance.info';
import { ButtonScan } from './module/button/button.scan';
import { CampTracker } from './module/camp.tracker/camp.tracker';
import { IdleScanner } from './module/idle/idle.module';
import { KillInfo } from './module/kill.info/kill.info';
import { LayoutScanner } from './module/layout/layout.scan';
import { hasStModuleHooks, StModule, StModuleState } from './module/module';
import { StModuleBase } from './module/module.base';
import { PlayerStatus } from './module/player.status/player.status';
import { StConfig } from './config';
import { StCli } from './module/cli';

/** What is the player currently up to */
export enum PlayerState {
    /** Has recently done something */
    Active,
    /** Hasnt moved in a while */
    Idle,
}

export enum StState {
    Idle,
    Active,
    Stopped,
}

const InstanceIdKey = 'st-instance-id';
const ChallengeIdKey = 'st-instance-challenge-id';

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

    get challengeId(): string {
        return localStorage.getItem(ChallengeIdKey) ?? '';
    }

    player: PlayerState = PlayerState.Active;
    state: StState = StState.Idle;

    log: typeof StLog;

    config = new StConfig();
    cli = new StCli();
    api = new ClientApi();
    layout = new LayoutScanner();
    alliance = new AllianceScanner();

    util = {
        scan: CityScannerUtil,
        city: CityUtil,
    };

    modules: StModule[] = [
        // Core modules
        this.config,
        this.cli,
        this.api,

        // Feature modules
        this.layout,
        this.alliance,
        new ButtonScan(),
        new CampTracker(),
        new KillInfo(),
        new PlayerStatus(),
        new IdleScanner(),
    ];

    constructor() {
        this.log = StLog.child({ id: this.id });
    }

    get isIdle(): boolean {
        return this.state == StState.Idle;
    }

    get isPlayerIdle(): boolean {
        return this.player == PlayerState.Idle;
    }

    actions: StModuleAction[] = [];
    queue(action: StModuleAction) {
        this.actions.push(action);
        if (this.isIdle && this.isPlayerIdle) {
            this.run();
        }
    }

    /** Remove any queued actions from a module */
    clearActions(stModule?: StModuleBase) {
        if (stModule == null) {
            this.actions = [];
        } else {
            this.actions = this.actions.filter(f => f.module.id != stModule.id);
        }
    }

    async scan() {
        this.layout.scanAll();
        await this.run(true);
    }

    /**
     * Run the queued actions, each action will be run once at a time
     *
     * This should be pauseable if the user decides to move the mouse and click @see this.player state
     */
    async run(playerTriggered = false): Promise<void> {
        if (!this.isIdle) {
            throw new Error('ST is not idle');
        }
        if (this.actions.length == 0) {
            return;
        }
        this.state = StState.Active;
        // Force a async callback
        await new Promise(resolve => setTimeout(resolve, 0));
        const startTime = Date.now();
        this.log.info('RunStart');
        let reason = 'None';
        try {
            let count = 0;
            while (this.actions.length > 0) {
                const action = this.actions.shift();
                if (action == null) {
                    break;
                }

                if (this.state != StState.Active) {
                    reason = 'StExit';
                    break;
                }

                if (action.module.isStopping) {
                    reason = 'ModuleStopping';
                    break;
                }

                if (!playerTriggered && this.player == PlayerState.Active) {
                    this.log.info('AbortScan');
                    reason = 'PlayerActive';
                    break;
                }

                count++;
                await action.run(count, this.actions.length + count);
            }
            if (this.actions.length == 0) {
                reason = 'Finished';
            }
        } finally {
            this.log.info({ duration: Date.now() - startTime, reason }, 'RunFinished');
            this.state = StState.Idle;
        }
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
        const removed = LocalCache.cleanUp();
        this.log.trace({ removed }, 'StCleanup');

        this.log.trace('StPatch');
        for (const patch of Object.values(Patches)) {
            this.log.info({ patch }, 'Patch:Apply');
            patch.apply();
        }

        for (const module of this.modules) {
            if (this.config.isDisabled(module)) {
                this.log.info({ module: module.name }, 'StModule:Disabled');
                continue;
            }
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
        this.state = StState.Stopped;
        for (const patch of Object.values(Patches)) {
            this.log.info({ patch }, 'Patch:Remove');
            patch.remove();
        }
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

    onConfig() {
        for (const module of this.modules) {
            if (hasStModuleHooks(module) && module.onConfig) {
                module.onConfig();
            }
        }
    }
}
