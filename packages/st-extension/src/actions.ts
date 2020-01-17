import { StModuleBase } from './module/module.base';

export interface StAction {
    (index: number, total: number): Promise<boolean | void>;
}

export interface StModuleAction {
    module: StModuleBase;
    run: StAction;
}

/** Every repeat ms, trigger the action */
export interface StRepeatAction {
    repeat: number;
    trigger(): void;
}
