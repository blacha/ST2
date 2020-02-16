import { WorldId } from '@cncta/clientlib';

export function isValidWorld(worldId?: WorldId) {
    if (worldId == null) {
        return false;
    }
    if (isNaN(worldId)) {
        return false;
    }
    // TODO do we actually want the max world ID here?
    if (worldId < 0 || worldId > 1000) {
        return false;
    }
    return true;
}
