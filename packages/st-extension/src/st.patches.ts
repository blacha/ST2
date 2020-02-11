import { Patches } from '@cncta/util/build/patch/index';
import { St } from './st';
import { StPlugin } from './st.plugin';

export class StPatches extends StPlugin {
    name = 'Patches';
    priority = 0;
    constructor(st: St) {
        super(st);
        for (const patch of Object.values(Patches)) {
            this.patches.push(patch);
        }
    }
}
