import { ClientLibStatic } from '../types';
declare const ClientLib: ClientLibStatic;

export const CacheVersion = 0;
export interface CachedObject<T> {
    value: T;
    v: number;
    timestamp: number;
}

export const OneDayMs = 24 * 60 * 60 * 1000;
export const OneWeekMs = 7 * OneDayMs;

export class LocalCache {
    static prefixStr = 'st-';
    static get prefix(): string {
        const worldId = ClientLib.Data.MainData.GetInstance()
            .get_Server()
            .get_WorldId();
        return `${LocalCache.prefixStr}-${worldId}-`;
    }

    static MaxAgeMs = 3 * OneDayMs; // 3 days
    static get<T>(key: string, maxAge = LocalCache.MaxAgeMs) {
        const obj = localStorage.getItem(LocalCache.prefix + key);
        if (obj == null) {
            return null;
        }

        const objJson = JSON.parse(obj) as CachedObject<T>;
        if (objJson.v == null || objJson.v != CacheVersion) {
            localStorage.removeItem(LocalCache.prefix + key);
            return null;
        }

        if (Date.now() - objJson.timestamp > maxAge) {
            localStorage.removeItem(LocalCache.prefix + key);
            return null;
        }
        return objJson.value;
    }

    static set<T>(key: string, value: Record<any, any>) {
        const toStore = JSON.stringify({ timestamp: Date.now(), value, v: CacheVersion });
        localStorage.setItem(LocalCache.prefix + key, toStore);
    }

    static cleanUp() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key?.startsWith(LocalCache.prefix)) {
                continue;
            }
            const value = localStorage.getItem(key);
            if (value == null) {
                localStorage.removeItem(key);
                continue;
            }
            const cacheItem = JSON.parse(value) as CachedObject<any>;
            if (cacheItem == null || cacheItem.timestamp == null || Date.now() - cacheItem.timestamp > OneWeekMs) {
                localStorage.removeItem(key);
            }
        }
    }
}
