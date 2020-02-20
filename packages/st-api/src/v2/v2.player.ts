import * as t from 'io-ts';
import { defineV2 } from './v2';
import { Validate } from './v2.validate';
import { StCityValidate } from './v2.validate.city';

export const V2PlayerList = defineV2(
    'player.list',
    t.type({}),
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

export const V2PlayerType = t.type({
    worldId: Validate.WorldId,
    player: Validate.PlayerNameDisplay,
    playerId: Validate.PlayerId,
    alliance: t.union([Validate.AllianceName, t.undefined]),
    allianceId: t.union([Validate.AllianceId, t.undefined]),
    cities: t.record(t.string, StCityValidate),
    updatedAt: t.number,
});
export const V2PlayerGet = defineV2(
    'player.get',
    t.type({ playerNameIds: t.array(Validate.PlayerNameId) }),
    t.type({
        players: t.array(V2PlayerType),
    }),
);

export const V2PlayerCityGet = defineV2(
    'player.city.get',
    t.type({ worldId: Validate.WorldId, playerId: Validate.PlayerId }),
    t.type({
        worldId: Validate.WorldId,
        playerId: Validate.PlayerId,
        cities: t.array(StCityValidate),
    }),
);
