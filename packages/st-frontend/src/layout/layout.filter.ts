import { Base, GameResource } from '@st/shared';
import { computed, observable, action, IObservableArray } from 'mobx';

export class LayoutFilterItem {
    @observable isEnabled = false;
    resource: GameResource | 'mixed';
    touches: number;
    count: number;
    layoutFilter: LayoutFilter;

    constructor(filter: LayoutFilter, resource: GameResource | 'mixed', touches: number, count: number) {
        this.layoutFilter = filter;
        this.resource = resource;
        this.touches = touches;
        this.count = count;
    }

    @action.bound toggle() {
        this.isEnabled = !this.isEnabled;
    }

    @computed get layoutCount() {
        let count = 0;
        for (const base of this.layoutFilter.layouts) {
            if (this.filter(base)) {
                count++;
            }
        }
        return count;
    }

    filter(base: Base) {
        const stats = base.info.silos[this.resource];
        if (stats == null) {
            return false;
        }

        return stats[this.touches].length >= this.count;
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

    layouts: IObservableArray<Base> = observable.array([], { deep: false });

    @action setLayouts(base: Base[]) {
        this.layouts.replace(base);
    }

    // Order of this array is rendering order
    filters = [
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

    @computed get isAllDisabled() {
        for (const filter of this.filters) {
            if (filter.isEnabled) {
                return false;
            }
        }
        return true;
    }

    filter(): Base[] {
        const output: Base[] = [];
        for (const base of this.layouts) {
            let keep = true;
            for (const filter of this.filters) {
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
