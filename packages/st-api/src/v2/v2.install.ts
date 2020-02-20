import { defineV2 } from './v2';
import { Validate } from './v2.validate';
import * as t from 'io-ts';

export const V2InstallTrack = defineV2(
    'install.track',
    t.type({
        worldId: Validate.WorldId,
        installId: Validate.InstallId,
        player: Validate.PlayerNameDisplay,
        version: t.string,
        hash: t.string,
    }),
    t.type({}),
);

export const V2InstallChallenge = defineV2(
    'install.challenge',
    t.type({
        installId: t.string,
        worldId: Validate.WorldId,
        player: Validate.PlayerNameDisplay,
        challengeId: t.string,
    }),
    t.type({}),
);
