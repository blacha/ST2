import { ApiV2, ApiV2Service } from '@st/api/build/v2';
import { V2AllianceGetService } from './routes/v2.alliance.get';
import { V2CityGetService } from './routes/v2.city.get';
import { V2PlayerClaimAcceptService, V2PlayerClaimService } from './routes/v2.claim.player';
import { V2DebugService } from './routes/v2.debug';
import { V2InstallTrackService, V2InstallChallengeService } from './routes/v2.install';
import { V2LayoutGetService } from './routes/v2.layout.get';
import { V2PlayerListService } from './routes/v2.player';
import { V2PlayerCityGetService, V2PlayerGetService } from './routes/v2.player.get';
import { V2CityScanService } from './routes/v2.scan';
import { V2ApiHandler } from './v2.request';
import { V2WorldListService, V2WorldUpdateService } from './routes/v2.world.list';

export const V2ServiceAll: Record<keyof ApiV2Service, V2ApiHandler<any>> = {
    debug: new V2DebugService(),

    'install.track': new V2InstallTrackService(),
    'install.challenge': new V2InstallChallengeService(),

    'player.list': new V2PlayerListService(),
    'player.get': new V2PlayerGetService(),
    'player.city.get': new V2PlayerCityGetService(),
    'player.claim.request': new V2PlayerClaimService(),
    'player.claim.accept': new V2PlayerClaimAcceptService(),

    'alliance.get': new V2AllianceGetService(),

    'city.scan': new V2CityScanService(),
    'city.get': new V2CityGetService(),

    'layout.get': new V2LayoutGetService(),

    'world.list': new V2WorldListService(),
    'world.update': new V2WorldUpdateService(),
};

export const V2Service = new Map<keyof ApiV2Service, V2ApiHandler<ApiV2>>();
Object.entries(V2ServiceAll).forEach(([k, v]) => V2Service.set(k as any, v));
