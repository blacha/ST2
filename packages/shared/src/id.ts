import * as ulid from 'ulid';

export const Id = {
    generate(): string {
        return ulid.ulid().toLowerCase();
    },
};
