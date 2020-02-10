import { St } from './st';
import { StCliCommand, StCliCommandSub, FontBuilder } from './st.cli';
import { StPlugin } from './st.plugin';

function getPlugin(st: St, pluginName: string): StPlugin | null {
    if (pluginName == null || pluginName.trim() == '') {
        st.cli.sendCommandError('Invalid plugin name');
        return null;
    }

    const plugin = st.plugins.find(f => f.name.toLowerCase() == pluginName.toLowerCase());
    if (plugin == null) {
        const pluginNames = st.plugins.map(c => c.name);
        if (pluginNames.length == 0) {
            st.cli.sendCommandError('No plugins found');
            return null;
        }
        st.cli.sendCommandError('Could not find plugin, current plugins: ' + pluginNames.join(', '));
        return null;
    }

    return plugin;
}

const StCliConfigSet: StCliCommand = {
    cmd: 'config set',

    handle(st: St, args: string[]): void {
        const [key, value] = args;
        if (key == null || key.trim() == '') {
            st.cli.sendCommandError('Could not find key to set');
            return;
        }

        if (value == null || value.trim() == '') {
            st.cli.sendCommandError('Invalid value');
            return;
        }
        const [pluginName, optionKey] = key.toLowerCase().split('.');
        const plugin = st.plugin(pluginName);
        if (plugin == null || plugin.options == null) {
            st.cli.sendCommandError(`Unable to find plugin for key "${key}"`);
            return;
        }

        const cfgKey = Object.keys(plugin.options).find(f => f.toLowerCase() == optionKey);
        if (cfgKey == null) {
            st.cli.sendCommandError(`Unable to find option "${key}"`);
            return;
        }
        const cfg = plugin.options[cfgKey];
        const configKey = `${plugin.name}.${cfgKey}`;
        if (typeof cfg.value == 'number') {
            st.config.set(configKey, parseFloat(value));
        } else if (typeof cfg.value === 'boolean') {
            st.config.set(configKey, value == 'true');
        } else {
            st.config.set(configKey, value);
        }
        st.log.info({ key: configKey, value }, 'ConfigSet');
    },
};

const StCliConfigList = {
    cmd: 'config list',
    handle(st: St): void {
        st.cli.sendMessage('white', 'Config');
        for (const plugin of st.plugins) {
            if (plugin.options == null) {
                continue;
            }
            st.cli.sendMessage('white', `----------------`);
            st.cli.sendMessage('white', `${plugin.name}`);
            st.cli.sendMessage('white', `----------------`);
            for (const key of Object.keys(plugin.options)) {
                const cfg = plugin.options[key];
                const currentValue = plugin.config(key);
                // const cfgKey = `${plugin.name}.${key}`;

                const message = [
                    FontBuilder.color('white', plugin.name + '.'),
                    FontBuilder.color('lightblue', key),
                    FontBuilder.color('white', ': '),
                    FontBuilder.color('lightgreen', String(currentValue)),
                    FontBuilder.color('white', ` - ${cfg.description} (Default: `),
                    FontBuilder.color('lightgreen', String(cfg.value)),
                    FontBuilder.color('white', ' )'),
                ];
                st.cli.sendMessageRaw(message.join(''));
            }
        }
    },
};

export const StCliConfigCommand: StCliCommandSub = {
    cmd: 'config',
    commands: {
        list: StCliConfigList,
        set: StCliConfigSet,
    },
};

const StCliDisable: StCliCommand = {
    cmd: 'plugin disable',

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

const StCliEnable: StCliCommand = {
    cmd: 'plugin enable',

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
export const StCliPluginCommand: StCliCommandSub = {
    cmd: 'plugin',
    commands: {
        enable: StCliEnable,
        disable: StCliDisable,
    },
};
