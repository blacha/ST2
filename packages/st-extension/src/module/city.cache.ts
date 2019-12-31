import { LocalCache, StCity, OneDayMs } from '@cncta/clientlib';
import { St } from '../st';

export class CityCache {
    static get(cityId: number, maxAge: number = OneDayMs): StCity {
        return LocalCache.get(String(cityId), maxAge) as StCity;
    }

    static set(cityId: number, layout: StCity) {
        St.getInstance().api.base(layout);
        return LocalCache.set(String(cityId), layout);
    }
}
