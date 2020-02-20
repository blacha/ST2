import * as t from 'io-ts';
import { defineV2 } from './v2';

export const V2Debug = defineV2('debug', t.type({}), t.type({ version: t.string, hash: t.string }));
