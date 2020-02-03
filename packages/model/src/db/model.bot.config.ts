import { Model, AccountSessionId } from './model';
import { Duration } from '@cncta/util';

export interface Session<T extends string> {
    id: T;
    expiresAt: number;
}

export interface ModelBotConfigHasSession {
    session: Session<AccountSessionId>;
}

export class ModelBotConfig extends Model<ModelBotConfig> {
    id: string;
    email: string;
    password: string;
    session?: Session<AccountSessionId>;

    constructor(data?: Partial<ModelBotConfig>) {
        super(data);
        this.email = data?.email ?? '';
        this.password = data?.password ?? '';
        this.session = data?.session ?? undefined;
    }

    isSessionValid(): this is ModelBotConfigHasSession {
        return this.session != null && Date.now() < this.session.expiresAt - Duration.minutes(5);
    }
}
