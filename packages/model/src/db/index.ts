// TODO this cannot live inside shared as it brings in a firebase dep which makes everything massive

import { Store } from './store';
import { ModelInstall } from './model.install';
import { ModelClaim } from './model.claim';
import { ModelUser } from './model.user';
import { ModelPlayer } from './model.player';
import { ModelCity } from './model.city';
import { ModelLayout } from './model.layout';

export * from './model';
export * from './store';
export * from './model.install';
export * from './model.claim';
export * from './model.user';
export * from './model.city';
export * from './model.layout';

export const Stores = {
    Install: new Store('Install', ModelInstall),
    Claim: new Store('Claim', ModelClaim),
    User: new Store('User', ModelUser),
    Player: new Store('Player', ModelPlayer),
    City: new Store('City', ModelCity),
    Layout: new Store('Layout', ModelLayout),
};
