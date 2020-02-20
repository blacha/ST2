import * as t from 'io-ts';
import { WorldId, PlayerNameDisplay, PlayerNameId } from '@cncta/clientlib';

function isWorldId(input: unknown): input is WorldId {
    return typeof input == 'number' && input > 0;
}

function parseWorldId(input: unknown, context: t.Context): t.Validation<WorldId> {
    return isWorldId(input) ? t.success(input) : t.failure(input, context);
}

const worldId = new t.Type<WorldId, number, unknown>('worldId', isWorldId, parseWorldId, t.identity);

function isPlayerName(input: unknown): input is PlayerNameDisplay {
    if (typeof input != 'string') {
        return false;
    }
    return input.match(/[a-zA-Z0-9]+/) != null;
}
function parsePlayerName(input: unknown, context: t.Context): t.Validation<PlayerNameDisplay> {
    return isPlayerName(input) ? t.success(input) : t.failure(input, context);
}
const playerNameDisplay = new t.Type<PlayerNameDisplay, string, unknown>(
    'PlayerName',
    isPlayerName,
    parsePlayerName,
    t.identity,
);

function isPlayerNameId(input: unknown): input is PlayerNameId {
    return isPlayerName(input) && input.toLowerCase() == input;
}

function parsePlayerNameId(input: unknown, context: t.Context): t.Validation<PlayerNameId> {
    return isPlayerNameId(input) ? t.success(input) : t.failure(input, context);
}

const playerNameId = new t.Type<PlayerNameId, string, unknown>(
    'PlayerNameId',
    isPlayerNameId,
    parsePlayerNameId,
    t.identity,
);

export const Validate = {
    WorldId: worldId,
    PlayerNameId: playerNameId,
    PlayerNameDisplay: playerNameDisplay,
};
