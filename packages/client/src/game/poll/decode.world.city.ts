import { Base91 } from '@cncta/util';
import { DecodeWorldXy } from './decode.world.xy';

export class DecodeWorldCity {
    static decode(data: string) {
        const ctx = { data, offset: 2 };
        const header = Base91.dec(ctx, 5);
        const city = {
            type: 'city',
            ...DecodeWorldXy.decode(data),
            id: -1,
            allianceId: -1,
            name: '',
            level: (header >> 9) & 0xff,
            radius: (header >> 16) & 15,
            healthBase: -1,
            healthDef: -1,
            sectorPlayerId: (header >> 22) & 0x3ff,
            defenseCondition: -1,
            lockDownEndStep: 0,
            protectionEndStep: 0,
            supportAlertStartStep: 0,
            supportAlertEndStep: 0,
            moveCooldownEndStep: 0,
            moveRestrictionEndStep: 0,
            moveRestrictionCoord: 0,
            recoveryEndStep: 0,
        };
        // const isAttacked = (header & 1) != 0;
        const isLocked = ((header >> 1) & 1) != 0;
        const isProtected = ((header >> 2) & 1) != 0;
        const isAlerted = ((header >> 3) & 1) != 0;
        const isMoveCooldown = ((header >> 4) & 1) != 0;
        const isMoveRestricted = ((header >> 5) & 1) != 0;
        const isRecovery = ((header >> 6) & 1) != 0;
        const isDefenseDamaged = ((header >> 7) & 1) != 0;

        if (isLocked) {
            city.lockDownEndStep = Base91.dec(ctx);
        }
        if (isProtected) {
            city.protectionEndStep = Base91.dec(ctx);
        }
        if (isAlerted) {
            city.supportAlertStartStep = Base91.dec(ctx);
            city.supportAlertEndStep = Base91.dec(ctx);
        }
        if (isMoveCooldown) {
            city.moveCooldownEndStep = Base91.dec(ctx);
        }
        if (isMoveRestricted) {
            city.moveRestrictionEndStep = Base91.dec(ctx);
            city.moveRestrictionCoord = Base91.dec(ctx);
        }
        if (isRecovery) {
            city.recoveryEndStep = Base91.dec(ctx);
        }
        city.healthBase = Base91.dec(ctx);
        if (isDefenseDamaged) {
            city.defenseCondition = Base91.dec(ctx);
        }

        Base91.dec(ctx); // Unknown
        city.id = Base91.dec(ctx);
        city.allianceId = Base91.dec(ctx);
        city.name = data.substr(ctx.offset);
        return city;
    }
}
