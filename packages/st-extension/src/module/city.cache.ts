import { LocalCache, StCity, OneDayMs } from '@cncta/clientlib';
import { St } from '../st';

export class CityCache {
    static get(cityId: number, maxAge: number = OneDayMs): StCity {
        return LocalCache.get(String(cityId), maxAge) as StCity;
    }

    /** Returns the unique id stored in shockrtools */
    static set(cityId: number, layout: StCity, flush = false): Promise<string> {
        LocalCache.set(String(cityId), layout);
        return St.getInstance().api.base(layout, flush);
    }
}
