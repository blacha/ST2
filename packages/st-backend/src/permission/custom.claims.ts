import { WorldId } from '@cncta/clientlib';
import { StLog, WorldIdPacker } from '@st/shared';
import admin = require('firebase-admin');
import { UId } from '@st/model';
export type CustomUserClaims = Record<string, boolean>;

export class CustomClaims {
    static async updateClaims(uid: UId, worldId: WorldId, claims: string[], log?: typeof StLog) {
        const adminAuth = admin.auth();
        const user = await adminAuth.getUser(uid);
        if (user == null) {
            log?.warn({ uid }, 'UserDoesNotExist');
            return;
        }
        const userClaims: CustomUserClaims = (user.customClaims as CustomUserClaims) ?? {};

        const hasChanges = this.updateClaim(uid, worldId, userClaims, claims, log);
        if (hasChanges) {
            log?.info({ uid, userClaims }, 'UpdateClaims');
            await adminAuth.setCustomUserClaims(uid, userClaims);
        }
    }

    static updateClaim(
        uid: UId,
        worldId: WorldId,
        userClaims: CustomUserClaims,
        toAdd: string[],
        log?: typeof StLog,
    ): boolean {
        let changes = false;
        const packedWorldId = WorldIdPacker.pack({ worldId });
        for (const key of Object.keys(userClaims)) {
            if (key.startsWith(packedWorldId) && !toAdd.includes(key)) {
                log?.info({ allianceKey: key, uid }, 'RemoveAccess');
                delete userClaims[key];
                changes = true;
            }
        }

        for (const claim of toAdd) {
            if (userClaims[claim] == true) {
                continue;
            }
            log?.info({ allianceKey: claim, uid }, 'AddAccess');
            userClaims[claim] = true;
            changes = true;
        }
        return changes;
    }
}
