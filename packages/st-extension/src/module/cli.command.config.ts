import { St } from '../st';
import { StCliCommand } from './cli';
import { StModuleBase } from './module.base';
import { StConfigKeys } from '../st.config';

function getModule(st: St, moduleName: string): StModuleBase | null {
    if (moduleName == null || moduleName.trim() == '') {
        st.cli.sendMessage('red', 'Invalid module name');
        return null;
    }

    const module = st.modules.find(f => f.name.toLowerCase() == moduleName.toLowerCase());
    if (module == null) {
        const moduleNames = st.modules.map(c => c.name);
        if (moduleNames.length == 0) {
            st.cli.sendMessage('red', 'No modules found');
            return null;
        }
        st.cli.sendMessage('red', 'Could not find module, current modules: ' + moduleNames.join(', '));
        return null;
    }

    return module;
}

export const StCliDisable: StCliCommand = {
    cmd: 'disable',

    handle(st: St, args: string[]): void {
        const module = getModule(st, args[0]);
        if (module == null) {
            return;
        }

        st.log.info({ module: module.name }, 'Disable');
        st.config.disable(module);
        if (module.isReady) {
            module.stop();
        }
    },
};

export const StCliEnable: StCliCommand = {
    cmd: 'enable',

    handle(st: St, args: string[]): void {
        const module = getModule(st, args[0]);
        if (module == null) {
            return;
        }

        st.log.info({ module: module.name }, 'Enable');
        st.config.enable(module);
        if (!module.isReady) {
            module.start();
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

        st.log.info({ key, value }, 'ConfigSet');
        st.config.set(key as any, value as any);
    },
};

export const StCliConfigList = {
    cmd: 'list',
    keys: ['modules', 'config'],
    handle(st: St, args: string[]): void {
        const [key] = args;
        if (key == null || key.trim() == '') {
            st.cli.sendMessage('red', 'Could not find option to list use: modules, config');
            return;
        }
        const searchKey = key.toLowerCase();
        if (searchKey != 'modules' && searchKey != 'config') {
            st.cli.sendMessage('red', 'Could not find option to list use: modules, config');
            return;
        }
        if (searchKey == 'modules') {
            st.cli.sendMessage('white', 'Modules');
            for (const module of st.modules) {
                st.cli.sendMessage(
                    'white',
                    `    ${module.name} : ${st.config.isDisabled(module) ? 'disabled' : 'enabled'}`,
                );
            }
        }
        if (searchKey == 'config') {
            st.cli.sendMessage('white', 'Config');
            for (const key of st.config.allKeys) {
                const cfg = StConfigKeys[key];
                const currentValue = st.config.get(key);
                if (cfg == null) {
                    st.cli.sendMessage('white', `  ${key}: ${currentValue}`);
                } else {
                    st.cli.sendMessage(
                        'white',
                        `  ${key}: ${currentValue} - ${cfg.description} (Default: ${cfg.value})`,
                    );
                }
            }
        }
    },
};
