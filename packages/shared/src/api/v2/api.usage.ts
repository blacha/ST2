import { ApiPlayerList } from './api.player';
import { TypeOf } from 'io-ts';

const apiData: Partial<TypeOf<typeof ApiPlayerList['response']>> = {};

console.log(apiData);
