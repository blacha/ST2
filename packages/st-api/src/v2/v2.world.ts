import * as t from 'io-ts';
import { defineV2 } from './v2';
import { Validate } from './v2.validate';

export const V2WorldList = defineV2(
    'world.list',
    t.type({}),
    t.type({
        worlds: t.array(t.type({ worldId: Validate.WorldId, name: t.string })),
    }),
);
export const V2WorldUpdate = defineV2('world.update', t.type({ worldId: Validate.WorldId }), t.type({ id: t.string }));
