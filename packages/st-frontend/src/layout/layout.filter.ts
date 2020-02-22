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

export class LayoutFilterLayout extends LayoutFilterBase {
    touches: 5 | 6 | 7;
    count: number;
    layoutFilter: LayoutFilter;

    constructor(filter: LayoutFilter, touches: 5 | 6 | 7) {
        super(filter, 'tiberium');
        this.touches = touches;
    }

    filter(base: Base) {
        return base.info.tiles.tiberium == this.touches;
    }
}

export class LayoutFilter {
    layouts: IObservableArray<Base> = observable.array([], { deep: false });

    @action setLayouts(base: Base[]) {
        this.layouts.replace(base);
    }

    // Order of this array is rendering order
    filterResource = [
        new LayoutFilterItem(this, 'tiberium', 6, 1),
        new LayoutFilterItem(this, 'tiberium', 5, 1),
        new LayoutFilterItem(this, 'tiberium', 5, 2),
        new LayoutFilterItem(this, 'tiberium', 4, 3),
        new LayoutFilterItem(this, 'tiberium', 4, 2),

        new LayoutFilterItem(this, 'crystal', 6, 1),
        new LayoutFilterItem(this, 'crystal', 5, 2),
        new LayoutFilterItem(this, 'crystal', 5, 1),

        new LayoutFilterItem(this, 'mixed', 6, 1),
        new LayoutFilterItem(this, 'mixed', 5, 2),
        new LayoutFilterItem(this, 'mixed', 5, 1),

        new LayoutFilterItem(this, 'power', 8, 4),
        new LayoutFilterItem(this, 'power', 8, 3),
        new LayoutFilterItem(this, 'power', 7, 3),
    ];

    filterTime = [
        new LayoutFilterUpdateAt(this, Duration.OneHour),
        new LayoutFilterUpdateAt(this, Duration.OneDay),
        new LayoutFilterUpdateAt(this, Duration.days(3)),
    ];

    filterLayout = [new LayoutFilterLayout(this, 7), new LayoutFilterLayout(this, 6), new LayoutFilterLayout(this, 5)];

    @computed get allFilters(): LayoutFilterBase[] {
        const x: LayoutFilterBase[] = [];
        return x
            .concat(this.filterResource)
            .concat(this.filterTime)
            .concat(this.filterLayout);
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
