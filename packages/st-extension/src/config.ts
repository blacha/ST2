import { Duration } from '@cncta/util';
import { StModuleBase } from './module/module.base';
import { StModule } from './module/module';
import { StLog } from '@st/shared';

export type StConfigKey = keyof StConfigKeys;

export interface StConfigKeys {
    'CampTracker.icon.size': number;
    'CampTracker.icon.font': string;
    'CampTracker.icon.fontSize': string;
    /** filter out any camps/outposts that are below your main's offlevel - this value*/
    'CampTracker.offense': number;
    /** Max number of icons to show */
    'CampTracker.count': number;
}

export class StConfig extends StModuleBase {
    name = 'StConfig';

    private localStorageKey = 'st-config';
    data: Partial<Record<StConfigKey, string | number | boolean>> = {};

    /** Optional hook called when the module starts */
    async onStart() {
        this.load();
        // Reload config every 30 seconds
        this.interval(() => this.load(), Duration.seconds(30));

        this.st.cli.register('config', ([key, value]) => {
            if (key == null || key == '') {
                return 'No key provided, usage /st set <key> <value>';
            }
            if (value == null || value.trim() == '') {
                return 'No value provided, usage /st set <key> <value>, or /st unset <key> to remove a key';
            }
            StLog.info({ key, value }, 'SetConfig');
            this.set(key as StConfigKey, value);
            return;
        });
    }
    /** Optional hook called when the module stops */
    async onStop() {
        this.save();
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

    get<T extends StConfigKey>(key: T): undefined | StConfigKeys[T] {
        return this.data[key] as StConfigKeys[T];
    }

    set<T extends StConfigKey>(key: StConfigKey, value: StConfigKeys[T] | undefined) {
        const oldValue = this.data[key];
        if (value == undefined) {
            delete this.data[key];
        } else {
            this.data[key] = value;
        }
        if (oldValue != value) {
            this.save();
            this.st.onConfig();
        }
    }

    isDisabled(module: StModule) {
        return this.data[`Module.${module.name}` as StConfigKey] == false;
    }
}
