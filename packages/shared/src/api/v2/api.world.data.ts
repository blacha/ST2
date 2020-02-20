import * as t from 'io-ts';
import { defineV2 } from '../api.v2';
import { Validate } from '../api.validate';

export const ApiWorldData = defineV2('world.update', t.type({ worldId: Validate.WorldId }), t.type({ id: t.string }));
