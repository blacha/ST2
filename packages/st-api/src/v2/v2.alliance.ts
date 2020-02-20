import * as t from 'io-ts';
import { defineV2 } from './v2';
import { Validate } from './v2.validate';
import { StCityValidate } from './v2.validate.city';

export const V2AllianceGet = defineV2(
    'alliance.get',
    t.type({ worldId: Validate.WorldId, allianceId: Validate.AllianceId }),
    t.type({
        players: t.array(
            t.type({
                worldId: Validate.WorldId,
                player: Validate.PlayerNameDisplay,
                alliance: t.union([Validate.AllianceName, t.undefined]),
                allianceId: t.union([Validate.AllianceId, t.undefined]),
                cities: t.record(t.string, StCityValidate),
            }),
        ),
    }),
);
