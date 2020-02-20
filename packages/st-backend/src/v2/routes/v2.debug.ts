import { V2Debug } from '@st/api/build/v2/v2.debug';
import { Config } from '@st/shared';
import { V2ApiHandler } from '../v2.request';

export class V2DebugService extends V2ApiHandler<typeof V2Debug> {
    def = V2Debug;

    async handle() {
        return { version: Config.version, hash: Config.hash };
    }
}
