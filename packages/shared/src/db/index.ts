// TODO this cannot live inside shared as it brings in a firebase dep which makes everything massive

import { Store } from './store';
import { ModelInstall } from './model.install';
import { ModelClaim } from './model.claim';
import { ModelUser } from './model.user';
import { ModelPlayer } from './model.player';
import { ModelBase } from './model.base';
import { ModelLayout } from './model.layout';

export * from './model';
export * from './store';
export * from './model.install';
export * from './model.claim';
export * from './model.user';
export * from './model.base';
export * from './model.layout';

export const Stores = {
    Install: new Store('Install', ModelInstall),
    Claim: new Store('Claim', ModelClaim),
    User: new Store('User', ModelUser),
    Player: new Store('Player', ModelPlayer),
    Base: new Store('Base', ModelBase),
    Layout: new Store('Layout', ModelLayout),
};
