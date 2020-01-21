import { FactionType } from '@cncta/clientlib/src';
import { Duration, LocalCache, StCity } from '@cncta/util';
import { St } from '../st';

const OneDayMs = Duration.days(1);
export class CityCache {
    static get(cityId: number, maxAge: number = OneDayMs): StCity {
        return LocalCache.get(String(cityId), maxAge) as StCity;
    }

    /** Returns the unique id stored in shockrtools */
    static set(cityId: number, layout: StCity, flush = false): Promise<string> {
        // No need to cache player cities
        if (layout.faction == FactionType.Nod || layout.faction == FactionType.Gdi) {
            return St.getInstance().api.base(layout, flush);
        }
        LocalCache.set(String(cityId), layout);
        return St.getInstance().api.base(layout, flush);
    }
}
