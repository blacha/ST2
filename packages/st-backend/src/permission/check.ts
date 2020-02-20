import { PlayerNameId, PlayerNameDisplay, WorldId, AllianceId } from '@cncta/clientlib';
import { V2Request } from '../v2/v2.request';
import { ModelUser } from '@st/model';
import { HttpError } from '../http.error';

export const PermissionChecker = {
    assertPlayer(req: V2Request, player: PlayerNameId | PlayerNameDisplay, user?: ModelUser): boolean {
        if (user == null) {
            req.log.warn({ player }, 'PermissionDenied');
            throw new HttpError(403, 'Permission Denied: No user claims');
        }
        const playerNameId = player.toLowerCase() as PlayerNameId;

        const claimed = user.claimed[playerNameId];
        if (claimed == null) {
            req.log.warn({ uid: user.id, player }, 'PermissionDenied');
            throw new HttpError(403, `Permission Denied: Unable to view player "${player}"`);
        }
        return true;
    },

    assertAlliance(req: V2Request, worldId: WorldId, allianceId: AllianceId, user?: ModelUser): boolean {
        if (user == null || allianceId == null) {
            req.log.warn({ worldId, allianceId }, 'PermissionDenied');
            throw new HttpError(403, 'Permission Denied: No user claims');
        }

        for (const claim of user.claims) {
            if (claim.alliances[worldId] == null) {
                continue;
            }
            if (claim.alliances[worldId].allianceId != allianceId) {
                continue;
            }
            return true;
        }

        req.log.warn({ uid: user.id, worldId, allianceId }, 'PermissionDenied');
        throw new HttpError(403, 'Permission Denied: Not part of alliance');
    },
};
