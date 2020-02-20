import { TypeOf } from 'io-ts';
import { V2ApiHandler, V2Request } from '../v2.request';
import { V2InstallTrack, V2InstallChallenge } from '@st/api/build/v2/v2.install';
import { Stores } from '@st/model';

export class V2InstallTrackService extends V2ApiHandler<typeof V2InstallTrack> {
    def = V2InstallTrack;

    async handle(req: V2Request, params: TypeOf<typeof V2InstallTrack['request']>) {
        req.logContext['installId'] = params.installId;
        req.logContext['installVersion'] = params.version;
        req.logContext['installHash'] = params.hash;
        req.logContext['player'] = params.player;
        req.logContext['worldId'] = params.worldId;

        await Stores.Install.transaction(params.installId, async obj =>
            obj.touch(params.player, params.worldId, params.version, params.hash),
        );

        // TODO if new install send mail message to confirm
        // @see V2ApiInstallChallenge
        return {};
    }
}

export class V2InstallChallengeService extends V2ApiHandler<typeof V2InstallChallenge> {
    def = V2InstallChallenge;

    async handle(req: V2Request, params: TypeOf<typeof V2InstallChallenge['request']>) {
        req.logContext['installId'] = params.installId;
        req.logContext['player'] = params.player;
        req.logContext['worldId'] = params.worldId;

        // TODO if new install send mail message to confirm
        // @see V2ApiInstallChallenge
        return {};
    }
}
