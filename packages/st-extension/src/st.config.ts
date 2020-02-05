import { Duration } from '@cncta/util/build/duration';
import { StPlugin } from './st.plugin';

export interface StConfigData {
    value: string | number | boolean;
    description: string;
}

export class StConfig extends StPlugin {
    name = 'Config';
    priority = 10;

    private localStorageKey = 'st-config';
    data: Record<string, string | number | boolean> = {};

    async onStart() {
        this.load();
        // Auto reload config
        this.interval(() => this.load(), Duration.seconds(60));
    }

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

    get(key: string): string | number | boolean | undefined {
        return this.data[key.toLowerCase()];
    }

    set(key: string, value: string | number | boolean | undefined) {
        const searchKey = key.toLowerCase();
        const oldValue = this.get(searchKey);

        if (value == undefined) {
            delete this.data[searchKey];
        } else {
            this.data[searchKey] = value;
        }

        if (oldValue != value) {
            this.save();
            this.st.onConfig();
        }
    }

    isDisabled(plugin: StPlugin) {
        return this.get(`${plugin.name}.enabled`) == false;
    }

    disable(module: StPlugin) {
        this.set(`${module.name}.enabled`, false);
    }

    enable(module: StPlugin) {
        this.set(`${module.name}.enabled`, true);
    }
}
