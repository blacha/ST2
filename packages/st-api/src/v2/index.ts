import { V2AllianceGet } from './v2.alliance';
import { V2CityGet } from './v2.city';
import { V2Debug } from './v2.debug';
import { V2InstallChallenge, V2InstallTrack } from './v2.install';
import { V2LayoutGet } from './v2.layout';
import { V2PlayerCityGet, V2PlayerGet, V2PlayerList } from './v2.player';
import { V2PlayerClaim, V2PlayerClaimAccept } from './v2.player.claim';
import { V2CityScan } from './v2.scan';
import { V2WorldList, V2WorldUpdate } from './v2.world';

export { ApiV2 } from './v2';

export interface ApiV2Service {
    debug: typeof V2Debug;

    'install.track': typeof V2InstallTrack;
    'install.challenge': typeof V2InstallChallenge;

    'player.list': typeof V2PlayerList;
    'player.get': typeof V2PlayerGet;
    'player.city.get': typeof V2PlayerCityGet;
    'player.claim.request': typeof V2PlayerClaim;
    'player.claim.accept': typeof V2PlayerClaimAccept;

    'city.scan': typeof V2CityScan;
    'city.get': typeof V2CityGet;

    'alliance.get': typeof V2AllianceGet;
    'layout.get': typeof V2LayoutGet;

    'world.list': typeof V2WorldList;
    'world.update': typeof V2WorldUpdate;
}
