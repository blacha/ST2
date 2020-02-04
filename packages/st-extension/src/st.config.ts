import { Duration } from '@cncta/util';
import { StCliConfigSet, StCliDisable, StCliEnable, StCliConfigList } from './module/cli.command.config';
import { StModule } from './module/module';
import { StModuleBase } from './module/module.base';

export interface StConfigData<T> {
    value: T;
    description: string;
}

export const StConfigKeys = {
    'CampTracker.icon.size': { value: 24, description: 'Size of the circle' },
    'CampTracker.icon.font': { value: 'Iosevka Term', description: 'Font to use' },
    'CampTracker.icon.fontSize': { value: 20, description: '' },
    /** filter out any camps/outposts that are below your main's offlevel - this value*/
    'CampTracker.offense': { value: -1, description: 'Filter out camps that are below your mains offlevel' },
    /** Max number of icons to show */
    'CampTracker.count': { value: 10, description: 'Number of icons to show' },
    /** Is the module enabled */
    'CampTracker.enabled': { value: true, description: 'Is module enabled' },
    'ButtonScan.enabled': { value: undefined, description: 'Is Module enabled' },
} as const;
export type StConfigKey = keyof typeof StConfigKeys;

export type StConfigValue<T extends StConfigKey> = typeof StConfigKeys[T]['value'];

export class StConfig extends StModuleBase {
    name = 'StConfig';

    private localStorageKey = 'st-config';
    data: Partial<Record<StConfigKey, string | number | boolean>> = {};

    /** Optional hook called when the module starts */
    async onStart() {
        this.load();
        // Reload config
        this.interval(() => this.load(), Duration.seconds(60));

        this.cli(StCliEnable);
        this.cli(StCliDisable);
        this.cli(StCliConfigSet);
        this.cli(StCliConfigList);
    }
    /** Optional hook called when the module stops */
    async onStop() {
        this.save();
    }

    get allKeys(): StConfigKey[] {
        const set = new Set<StConfigKey>();
        for (const key of Object.keys(this.data)) {
            set.add(key as StConfigKey);
        }
        for (const key of Object.keys(StConfigKeys)) {
            set.add(key as StConfigKey);
        }
        return [...set.values()];
    }

    load() {
        const item = localStorage.getItem(this.localStorageKey);
        if (item == null) {
            return;
        }
        this.data = JSON.parse(item);
    }

    save() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.data));
    }

    get<T extends StConfigKey>(key: T): StConfigValue<T> {
        if (this.data[key] == null) {
            if (StConfigKeys[key] == null) {
                return undefined as StConfigValue<T>;
            }
            return StConfigKeys[key].value;
        }
        return this.data[key] as StConfigValue<T>;
    }

    hasKey(key: string): key is StConfigKey {
        return StConfigKeys[key as StConfigKey] != null;
    }

    convert<T extends StConfigKey>(key: T, value: any): StConfigValue<T> {
        const defaultVal = StConfigKeys[key];
        if (defaultVal == null) {
            return value;
        }
        if (typeof defaultVal.value == 'number') {
            value = parseFloat(value);
            if (isNaN(value)) {
                throw new Error('Invalid number');
            }
        }
        return value as StConfigValue<T>;
    }

    set<T extends StConfigKey>(key: T, value: StConfigValue<T> | undefined) {
        const oldValue = this.get(key);

        if (value == undefined) {
            delete this.data[key];
        } else {
            this.data[key] = this.convert(key, value);
        }

        if (oldValue != value) {
            this.save();
            this.st.onConfig();
        }
    }

    disable(module: StModule) {
        this.set(`${module.name}.enabled` as StConfigKey, false as any);
    }

    enable(module: StModule) {
        this.set(`${module.name}.enabled` as StConfigKey, true);
    }

    isDisabled(module: StModule): boolean {
        return this.get(`${module.name}.enabled` as StConfigKey) == (false as any);
    }
}
