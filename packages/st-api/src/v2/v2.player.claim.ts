import * as t from 'io-ts';
import { defineV2 } from './v2';
import { Validate } from './v2.validate';

export const V2PlayerClaim = defineV2(
    'player.claim.request',
    t.type({ worldId: Validate.WorldId, player: Validate.PlayerNameId }),
    t.type({}),
);

export const V2PlayerClaimAccept = defineV2(
    'player.claim.accept',
    t.type({ claimId: t.string }),
    t.type({ worldId: Validate.WorldId, player: Validate.PlayerNameId }),
);
