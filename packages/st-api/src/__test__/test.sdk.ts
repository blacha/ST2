import { V2Sdk } from '../sdk';
import { WorldId, PlayerNameDisplay } from '@cncta/clientlib';
import { InstallId } from '../id';

V2Sdk.call('install.track', {
    worldId: 410 as WorldId,
    installId: 'abc' as InstallId,
    player: '' as PlayerNameDisplay,
    hash: '1',
    version: '1',
});
V2Sdk.call('player.list');
