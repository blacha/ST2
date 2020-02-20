import * as t from 'io-ts';
import { defineV2 } from './v2';
import { Validate } from './v2.validate';

export const V2LayoutGet = defineV2(
    'layout.get',
    t.type({ worldId: Validate.WorldId, allianceId: Validate.AllianceId }),
    t.type({
        layouts: t.array(
            t.type({
                updatedAt: t.number,
                createdAt: t.number,
                layout: t.string,
                x: t.number,
                y: t.number,
            }),
        ),
    }),
);
