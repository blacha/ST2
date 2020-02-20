import * as t from 'io-ts';
import { defineV2 } from '../api.v2';
import { Validate } from '../api.validate';

export const ApiPlayerList = defineV2(
    'player.list',
    t.type({
        installId: t.string,
        player: Validate.PlayerNameDisplay,
        version: t.string,
        hash: t.string,
    }),
    t.type({
        players: t.array(
            t.type({
                player: Validate.PlayerNameId,
                name: Validate.PlayerNameDisplay,
                claimId: t.string,
                alliances: t.record(t.number, t.type({ validatedBy: t.string, allianceId: t.number })),
            }),
        ),
    }),
);

export type apiInstallResponse = t.TypeOf<typeof ApiPlayerList['response']>;
