import { ApiV2 } from '@st/api/build/v2/v2';
import { StLog } from '@st/shared';
import { TypeOf } from 'io-ts';
import { UId } from '@st/model';

export interface V2Request {
    /** Request Id */
    id: string;
    /** Context logger */
    log: typeof StLog;
    /** Get current user from request, throws if no user is found */
    userId: () => Promise<UId>;
    /** Log context for end of request */
    logContext: Record<string, any>;

    /** Track a value */
    track(key: string, value: any): void;
}

export abstract class V2ApiHandler<T extends ApiV2<any, any, any> = ApiV2<any, any, any>> {
    def: T;
    abstract handle(req: V2Request, params: TypeOf<T['request']>): Promise<TypeOf<T['response']>>;
}
