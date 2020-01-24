import { WorldId, PlayerNameDisplay, PlayerId, TimeStamp, PlayerNameId } from '@cncta/clientlib';
import { CompositeId } from '@st/shared';

export type InstallId = string & { _t: 'InstallId' };
export type UId = string & { _uid: never };
export type WorldSessionId = string & { _t: 'WorldSessionId' };
export type AccountSessionId = string & { _t: 'AccountSessionId' };

export const InvalidWorldId = -1 as WorldId;
export const InvalidPlayerName = '' as PlayerNameDisplay;
export const InvalidPlayerId = -1 as PlayerId;

export interface FireStoreInstance {
    id: string | CompositeId<any[]>;
    updatedAt: TimeStamp;
    createdAt: TimeStamp;
}

export const ModelUtil = {
    TimeStamp(): TimeStamp {
        return Date.now() as TimeStamp;
    },

    toPlayerNameId(p: PlayerNameDisplay): PlayerNameId {
        return p.toLowerCase() as PlayerNameId;
    },
};

export abstract class Model<T extends FireStoreInstance> implements FireStoreInstance {
    id: string;
    createdAt: TimeStamp = ModelUtil.TimeStamp();
    updatedAt: TimeStamp = this.createdAt;

    constructor(data?: Partial<T>) {
        this.updatedAt = data?.updatedAt ?? this.updatedAt;
        this.createdAt = data?.createdAt ?? this.createdAt;
    }
}
