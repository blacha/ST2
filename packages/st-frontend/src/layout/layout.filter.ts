import { Duration } from '@cncta/util';
import { Base, GameResource } from '@st/shared';
import { action, computed, IObservableArray, observable } from 'mobx';
export type FilterTypes = GameResource | 'mixed' | 'updatedAt';

export abstract class LayoutFilterBase {
    @observable isEnabled = false;
    type: FilterTypes;
    layoutFilter: LayoutFilter;
    constructor(filter: LayoutFilter, type: FilterTypes) {
        this.layoutFilter = filter;
        this.type = type;
    }
    @action.bound toggle() {
        this.isEnabled = !this.isEnabled;
    }
    @computed get layoutCount() {
        let count = 0;
        for (const base of this.layoutFilter.filtered) {
            if (this.filter(base)) {
                count++;
            }
        }
        return count;
    }
    abstract filter(base: Base): boolean;
}

export class LayoutFilterUpdateAt extends LayoutFilterBase {
    duration: number;

    constructor(filter: LayoutFilter, duration: number) {
        super(filter, 'updatedAt');
        this.duration = duration;
    }

    filter(base: Base): boolean {
        const dateDiff = Date.now() - base.updatedAt;
        return dateDiff < this.duration;
    }
}

export class LayoutFilterItem extends LayoutFilterBase {
    touches: number;
    type: GameResource | 'mixed';
    count: number;
    layoutFilter: LayoutFilter;

    constructor(filter: LayoutFilter, resource: GameResource | 'mixed', touches: number, count: number) {
        super(filter, resource);
        this.touches = touches;
        this.count = count;
        this.type = resource;
    }

    filter(base: Base) {
        const stats = base.info.silos[this.type];

        if (stats == null) {
            return false;
        }

        return stats[this.touches]?.length >= this.count;
    }
}
export class LayoutFilter {
    tib6 = new LayoutFilterItem(this, 'tiberium', 6, 1);
    tib5x1 = new LayoutFilterItem(this, 'tiberium', 5, 1);
    tib5x2 = new LayoutFilterItem(this, 'tiberium', 5, 2);
    tib4x3 = new LayoutFilterItem(this, 'tiberium', 4, 3);

    crystal6 = new LayoutFilterItem(this, 'crystal', 6, 1);
    crystal5x1 = new LayoutFilterItem(this, 'crystal', 5, 1);
    crystal5x2 = new LayoutFilterItem(this, 'crystal', 5, 2);

    mixed6 = new LayoutFilterItem(this, 'mixed', 6, 1);
    mixed5x1 = new LayoutFilterItem(this, 'mixed', 5, 1);
    mixed5x2 = new LayoutFilterItem(this, 'mixed', 5, 2);

    power8x4 = new LayoutFilterItem(this, 'power', 8, 4);
    power8x3 = new LayoutFilterItem(this, 'power', 8, 3);
    power7x3 = new LayoutFilterItem(this, 'power', 7, 3);

    updatedAtHour = new LayoutFilterUpdateAt(this, Duration.OneHour);
    updatedAtDay = new LayoutFilterUpdateAt(this, Duration.OneDay);
    updatedAt3Days = new LayoutFilterUpdateAt(this, Duration.days(3));

    layouts: IObservableArray<Base> = observable.array([], { deep: false });

    @action setLayouts(base: Base[]) {
        this.layouts.replace(base);
    }

    // Order of this array is rendering order
    filterResource = [
        this.tib6,
        this.tib5x2,
        this.tib5x1,
        this.tib4x3,

        this.crystal6,
        this.crystal5x2,
        this.crystal5x1,

        this.power8x4,
        this.power8x3,
        this.power7x3,

        this.mixed6,
        this.mixed5x2,
        this.mixed5x1,
    ];

    updatedFilter = [this.updatedAtHour, this.updatedAtDay, this.updatedAt3Days];

    @computed get allFilters(): LayoutFilterBase[] {
        const x: LayoutFilterBase[] = [];
        return x.concat(this.filterResource).concat(this.updatedFilter);
    }

    @computed get isAllDisabled() {
        for (const filter of this.allFilters) {
            if (filter.isEnabled) {
                return false;
            }
        }
        return true;
    }

    @computed get filtered(): Base[] {
        const output: Base[] = [];
        for (const base of this.layouts) {
            let keep = true;
            for (const filter of this.allFilters) {
                if (filter.isEnabled && filter.filter(base) == false) {
                    keep = false;
                    break;
                }
            }
            if (keep) {
                output.push(base);
            }
        }
        return output;
    }
}
