import { defineV2 } from '../api.v2';
import { Validate } from '../api.validate';
import * as t from 'io-ts';

export const ApiInstall = defineV2(
    'install.track',
    t.type({
        installId: t.string,
        player: Validate.PlayerNameDisplay,
        version: t.string,
        hash: t.string,
    }),
    t.type({}),
);

export const ApiInstallChallenge = defineV2(
    'install.challenge',
    t.type({
        installId: t.string,
        worldId: Validate.WorldId,
        player: Validate.PlayerNameDisplay,
        challengeId: t.string,
    }),
    t.type({}),
);
