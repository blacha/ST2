import { StModuleHooks, StModuleState } from './module';
import { St } from '../st';
import { Id } from '@st/shared';

export abstract class StModuleBase implements StModuleHooks {
    id: string = Id.generate();
    name: string;
    state = StModuleState.Init;
    st: St;

    abstract start(st: St): Promise<void>;
    abstract stop(): Promise<void>;

    get isStopping(): boolean {
        return this.state == StModuleState.Stopped || this.state == StModuleState.Stopping;
    }

    get isReady(): boolean {
        return this.state == StModuleState.Started;
    }
}
