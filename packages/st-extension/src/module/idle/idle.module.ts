import { Duration } from '@cncta/util';
import { PlayerState } from '../../st';
import { StModuleBase } from '../module.base';

/** Events used to determine if the player is active */
const PlayerEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];

export class IdleScanner extends StModuleBase {
    name = 'IdleScanner';
    /** No user actions within 20 minutes, means to player is idle */
    IdleTime = Duration.minutes(20);

    lastActionTime: number;
    playerAction = () => {
        this.lastActionTime = Date.now();
        if (this.st.player == PlayerState.Idle) {
            this.st.log.info('PlayerActive');
        }
        this.st.player = PlayerState.Active;
    };

    async onStart() {
        for (const evt of PlayerEvents) {
            document.addEventListener(evt, this.playerAction, true);
        }

        this.interval(() => this.checkIdle(), 1000);
    }
    async onStop() {
        for (const evt of PlayerEvents) {
            document.removeEventListener(evt, this.playerAction, true);
        }
    }

    checkIdle() {
        if (this.st.player == PlayerState.Idle) {
            return;
        }
        if (Date.now() - this.lastActionTime > this.IdleTime) {
            this.st.player = PlayerState.Idle;
            this.st.log.debug({ lastAction: new Date(this.lastActionTime).toISOString() }, 'PlayerIdle');
        }
    }
}
