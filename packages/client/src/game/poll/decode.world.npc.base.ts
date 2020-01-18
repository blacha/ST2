import { Base91 } from '@cncta/util';
import { DecodeWorldXy } from './decode.world.xy';

export class DecodeWorldNpcBase {
    static decode(data: string) {
        const ctx = { data, offset: 2 };
        const header = Base91.dec(ctx, 4);
        // const isAttacked = (header & 1) !== 0;
        const isLocked = ((header >> 1) & 1) !== 0;
        const isAlerted = ((header >> 2) & 1) !== 0;
        const isDefenseDamaged = ((header >> 3) & 1) !== 0;

        const base = {
            type: 'base',
            ...DecodeWorldXy.decode(data),
            id: -1,
            level: ((header >> 4) & 0x3fff) / 100,

            healthBase: 0,
            healthDefense: 0,

            lockdownEndStep: 0,
            lastCombatStep: 0,
        };

        if (isLocked) {
            base.lockdownEndStep = Base91.dec(ctx);
        }

        if (isAlerted) {
            Base91.dec(ctx); // Unused
            Base91.dec(ctx); // Unused
        }

        base.healthBase = Base91.dec(ctx);
        if (isDefenseDamaged) {
            base.healthDefense = Base91.dec(ctx);
        }
        base.lastCombatStep = Base91.dec(ctx);
        base.id = Base91.dec(ctx);

        return base;
    }
}
