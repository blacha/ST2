import { ShockrTools } from './index';

export interface StModule {
    name: string;
    start?(st: ShockrTools): Promise<void>;
    stop?(): Promise<void>;
}
