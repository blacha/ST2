import * as ulid from 'ulid';

export type CompositeId<T> = string & { _t: T };

export const Id = {
    generate(): string {
        return ulid.ulid().toLowerCase();
    },
};
