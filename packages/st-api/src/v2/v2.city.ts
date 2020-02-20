import * as t from 'io-ts';
import { defineV2 } from './v2';
import { StCityValidate } from './v2.validate.city';

export const V2CityGet = defineV2(
    'city.get',
    t.type({ cityId: t.string }),
    t.type({ city: t.union([StCityValidate, t.undefined]) }),
);
