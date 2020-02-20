import { AllianceId, AllianceName, PlayerId, PlayerNameDisplay, PlayerNameId, WorldId } from '@cncta/clientlib';
import * as t from 'io-ts';
import { InstallId } from '../id';

function createType<T, K>(name: string, is: t.Is<T>): t.Type<T, K, unknown> {
    function parse(input: unknown, context: t.Context): t.Validation<T> {
        return is(input) ? t.success(input) : t.failure(input, context);
    }
    return new t.Type<T, K, unknown>(name, is, parse, t.identity as any);
}

function isWorldId(input: unknown): input is WorldId {
    return typeof input == 'number' && input > 0;
}

function isPlayerName(input: unknown): input is PlayerNameDisplay {
    if (typeof input != 'string') {
        return false;
    }
    return input.match(/[a-zA-Z0-9]+/) != null;
}

function isPlayerNameId(input: unknown): input is PlayerNameId {
    return isPlayerName(input) && input.toLowerCase() == input;
}

function isInstallId(input: unknown): input is InstallId {
    return typeof input == 'string';
}
const isPlayerId = (t: unknown): t is PlayerId => typeof t == 'number';
const isAllianceId = (t: unknown): t is AllianceId => typeof t == 'number';
const isAllianceName = (t: unknown): t is AllianceName => typeof t == 'string';

export const Validate = {
    InstallId: createType<InstallId, string>('InstallId', isInstallId),
    WorldId: createType<WorldId, number>('worldId', isWorldId),
    PlayerId: createType<PlayerId, number>('PlayerId', isPlayerId),
    PlayerNameId: createType<PlayerNameId, string>('PlayerNameId', isPlayerNameId),
    PlayerNameDisplay: createType<PlayerNameDisplay, string>('PlayerName', isPlayerName),
    AllianceId: createType<AllianceId, number>('AllianceId', isAllianceId),
    AllianceName: createType<AllianceName, string>('AllianceName', isAllianceName),
};
