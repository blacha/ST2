import { St } from './st';
import { StCliCommand } from './st.cli';
import { StPlugin } from './st.plugin';

function getPlugin(st: St, pluginName: string): StPlugin | null {
    if (pluginName == null || pluginName.trim() == '') {
        st.cli.sendMessage('red', 'Invalid plugin name');
        return null;
    }

    const plugin = st.plugins.find(f => f.name.toLowerCase() == pluginName.toLowerCase());
    if (plugin == null) {
        const pluginNames = st.plugins.map(c => c.name);
        if (pluginNames.length == 0) {
            st.cli.sendMessage('red', 'No plugins found');
            return null;
        }
        st.cli.sendMessage('red', 'Could not find plugin, current plugins: ' + pluginNames.join(', '));
        return null;
    }

    return plugin;
}

export const StCliDisable: StCliCommand = {
    cmd: 'disable',

    handle(st: St, args: string[]): void {
        const plugin = getPlugin(st, args[0]);
        if (plugin == null) {
            return;
        }

        st.log.info({ plugin: plugin.name }, 'Disable');
        st.config.disable(plugin);
        if (plugin.isStarted) {
            st.cli.sendMessage('lightblue', 'Stopping ' + plugin.name);
            plugin.stop();
        }
    },
};

export const StCliEnable: StCliCommand = {
    cmd: 'enable',

    handle(st: St, args: string[]): void {
        const plugin = getPlugin(st, args[0]);
        if (plugin == null) {
            return;
        }

        st.log.info({ plugin: plugin.name }, 'Enable');
        st.config.enable(plugin);
        if (!plugin.isStarted) {
            st.cli.sendMessage('lightblue', 'Starting ' + plugin.name);
            plugin.start();
        }
    },
};

export const StCliConfigSet: StCliCommand = {
    cmd: 'set',

    handle(st: St, args: string[]): void {
        const [key, value] = args;
        if (key == null || key.trim() == '') {
            st.cli.sendMessage('red', 'Could not find key to set');
            return;
        }

        if (value == null || value.trim() == '') {
            st.cli.sendMessage('red', 'Invalid value');
            return;
        }
        const [pluginName, optionKey] = key.toLowerCase().split('.');
        const plugin = st.plugin(pluginName);
        if (plugin == null || plugin.options == null) {
            st.cli.sendMessage('red', `Unable to find plugin for key "${key}"`);
            return;
        }

        const cfgKey = Object.keys(plugin.options).find(f => f.toLowerCase() == optionKey);
        if (cfgKey == null) {
            st.cli.sendMessage('red', `Unable to find option "${key}"`);
            return;
        }
        const cfg = plugin.options[cfgKey];
        const configKey = `${plugin.name}.${cfgKey}`;
        if (typeof cfg.value == 'number') {
            st.config.set(configKey, parseFloat(value));
        } else {
            st.config.set(configKey, value);
        }
        st.log.info({ key: configKey, value }, 'ConfigSet');
    },
};

export const StCliConfigList = {
    cmd: 'list',
    handle(st: St, args: string[]): void {
        const [key] = args;
        if (key == null || key.trim() == '') {
            st.cli.sendMessage('red', 'Could not find option to list use: plugins, config');
            return;
        }
        const searchKey = key.toLowerCase();
        if (searchKey != 'plugins' && searchKey != 'config') {
            st.cli.sendMessage('red', 'Could not find option to list use: plugins, config');
            return;
        }

        if (searchKey == 'plugins') {
            st.cli.sendMessage('white', 'Plugins');
            for (const plugin of st.plugins) {
                st.cli.sendMessage(
                    'white',
                    `    ${plugin.name} : ${st.config.isDisabled(plugin) ? 'disabled' : 'enabled'}`,
                );
            }
        }

        if (searchKey == 'config') {
            st.cli.sendMessage('white', 'Config');
            for (const plugin of st.plugins) {
                if (plugin.options == null) {
                    continue;
                }
                st.cli.sendMessage('white', `${plugin.name}`);
                st.cli.sendMessage('white', ``);
                for (const key of Object.keys(plugin.options)) {
                    const cfg = plugin.options[key];
                    const currentValue = plugin.config(key);
                    const cfgKey = `${plugin.name}.${key}`;
                    st.cli.sendMessage(
                        'white',
                        `${cfgKey}: ${currentValue} - ${cfg.description}(Default: ${cfg.value})`,
                    );
                }
            }
        }
    },
};
