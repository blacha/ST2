import { StPlugin } from './st.plugin';
import { Duration } from '@cncta/util/build/duration';
import { QxStatic, ClientLibStatic } from '@cncta/clientlib';

declare const qx: QxStatic;
declare const ClientLib: ClientLibStatic;

export enum StState {
    Idle = 'idle',
    Active = 'active',
    Stopped = 'stopped',
}

export interface StAction {
    (index: number, total: number): Promise<boolean | void>;
}

export interface StPluginAction {
    plugin: StPlugin;
    run: StAction;
}

/** What is the player currently up to */
export enum PlayerState {
    /** Has recently done something */
    Active,
    /** Hasnt moved in a while */
    Idle,
}

/** Every repeat ms, trigger the action */
export interface StRepeatAction {
    repeat: number;
    trigger(): void;
}
const PlayerEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];

export class StActions extends StPlugin {
    name = 'Actions';
    actions: StPluginAction[] = [];
    priority = 100;
    actionState = StState.Idle;
    player: PlayerState = PlayerState.Active;

    /** No user actions within 20 minutes, means player is idle */
    IdleTime = Duration.minutes(20);

    lastActionTime: number;
    playerAction = () => {
        this.lastActionTime = Date.now();
        if (this.player == PlayerState.Idle) {
            this.st.log.info('PlayerActive');
        }
        this.player = PlayerState.Active;
    };

    async onStart() {
        for (const evt of PlayerEvents) {
            document.addEventListener(evt, this.playerAction, true);
        }
        this.lastActionTime = Date.now();
        this.interval(() => this.checkIdle(), Duration.OneSecond);
    }
    async onStop() {
        for (const evt of PlayerEvents) {
            document.removeEventListener(evt, this.playerAction, true);
        }
    }

    checkIdle() {
        if (this.player == PlayerState.Idle) {
            return;
        }

        if (Date.now() - this.lastActionTime > this.IdleTime) {
            this.player = PlayerState.Idle;
            this.st.log.debug({ lastAction: new Date(this.lastActionTime).toISOString() }, 'PlayerIdle');
            // Start processing background actions
            this.run();
        }
    }

    queue(action: StPluginAction) {
        this.actions.push(action);
        if (this.isIdle && this.isPlayerIdle) {
            this.run();
        }
    }

    /** Remove any queued actions from a module */
    clear(StPlugin?: StPlugin) {
        if (StPlugin == null) {
            this.actions = [];
        } else {
            this.actions = this.actions.filter(f => f.plugin.id != StPlugin.id);
        }
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

        this.actionState = StState.Active;
        // Hide the main overlay
        qx.core.Init.getApplication().showMainOverlay(false);

        // Force a async callback
        await new Promise(resolve => setTimeout(resolve, 0));
        const startTime = Date.now();
        this.st.log.info('RunStart');
        let reason = 'None';
        try {
            let count = 0;
            while (this.actions.length > 0) {
                // User actions make poll's faster
                ClientLib.Net.CommunicationManager.GetInstance().UserAction();

                const action = this.actions.shift();
                if (action == null) {
                    break;
                }

                if (!this.isActive) {
                    reason = 'StExit';
                    break;
                }

                if (action.plugin.isStopping) {
                    reason = 'ModuleStopping';
                    break;
                }

                if (!playerTriggered && !this.isPlayerIdle) {
                    this.st.log.info('AbortScan');
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
            this.st.log.info({ duration: Date.now() - startTime, reason }, 'RunFinished');
            this.actionState = StState.Idle;
        }
    }

    get isIdle() {
        return this.actionState == StState.Idle;
    }

    get isActive() {
        return this.actionState == StState.Active;
    }

    get isPlayerIdle() {
        return this.player == PlayerState.Idle;
    }
}
