import { Duration, LocalCache } from '@cncta/util';

const OneDayMs = Duration.days(1);

export interface CityLayoutCache {
    stId: string;
    layout: string;
}

export class CityCache {
    static get cacheKey() {
        return `${LocalCache.prefix}-layout-cache`;
    }

    static get(cityId: number, maxAge: number = OneDayMs): CityLayoutCache {
        return LocalCache.get(String(cityId), maxAge) as CityLayoutCache;
    }

    static setStId(cityId: number, stId: string, layout: string): void {
        LocalCache.set(String(cityId), { stId, layout });
    }
}
