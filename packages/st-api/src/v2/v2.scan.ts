import * as t from 'io-ts';
import { defineV2 } from './v2';
import { Validate } from './v2.validate';
import { StCityValidate } from './v2.validate.city';

export const V2CityScan = defineV2(
    'city.scan',
    t.type({ worldId: Validate.WorldId, player: Validate.PlayerNameDisplay, cities: t.array(StCityValidate) }),
    t.type({
        cityIds: t.array(t.string),
    }),
);
