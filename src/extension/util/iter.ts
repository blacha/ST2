import { ClientLibMap } from '../@types/client.lib';

export class ClientLibIter {
    static values<T>(obj: ClientLibMap<T>): T[] {
        return Object.values(obj.d);
    }
    static *iter<T>(obj: ClientLibMap<T>): Generator<{ key: string; value: T }> {
        for (const key of Object.keys(obj.d)) {
            const value = obj.d[key];
            yield { key, value };
        }
    }
}
