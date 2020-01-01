import { StModuleHooks, StModuleState } from './module';
import { St } from '../st';

export abstract class StModuleBase implements StModuleHooks {
    name: string;
    state = StModuleState.Init;

    abstract start(st: St): Promise<void>;
    abstract stop(): Promise<void>;

    get isStopping(): boolean {
        return this.state == StModuleState.Stopped || this.state == StModuleState.Stopping;
    }

    get isReady(): boolean {
        return this.state == StModuleState.Started;
    }
}
