import { LocalCache, StCity, Duration } from '@cncta/plugin';
import { St } from '../st';

const OneDayMs = Duration.days(1);
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
