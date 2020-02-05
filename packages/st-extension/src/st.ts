import { CityScannerUtil, CityUtil, ClientLibLoader, LocalCache, Patches } from '@cncta/util';
import { Id } from '@st/shared/build/id';
import { StLog } from '@st/shared/build/log';
import { StConfig } from './st.config';
import { StCli } from './st.cli';
import { StPlugin, StPluginState } from './st.plugin';
import { StActions } from './st.actions';
import { StApi } from './api/st.api';
import { StPatches } from './st.patches';

const InstanceIdKey = 'st-instance-id';
const ChallengeIdKey = 'st-instance-challenge-id';

export class St {
    /** Time St was initialized */
    startedAt = Date.now();
    static instance: St;
    static getInstance() {
        if (St.instance == null) {
            St.instance = new St();
        }
        return St.instance;
    }

    id = Id.generate();

    /** Unique installation key */
    get instanceId() {
        let instanceId = localStorage.getItem(InstanceIdKey);
        if (instanceId == null) {
            instanceId = Id.generate();
            localStorage.setItem(InstanceIdKey, instanceId);
        }
        return instanceId;
    }

    /** Challenge key given to the user */
    get challengeId(): string {
        return localStorage.getItem(ChallengeIdKey) ?? '';
    }

    log: typeof StLog = StLog.child({ id: this.id });

    config = new StConfig(this);
    cli = new StCli(this);
    api = new StApi(this);
    actions = new StActions(this);
    patches = new StPatches(this);

    util = {
        scan: CityScannerUtil,
        city: CityUtil,
    };

    plugins: StPlugin[] = [
        // Core modules
        this.patches,
        this.config,
        this.cli,
        this.api,
        this.actions,
    ];

    plugin<T extends StPlugin>(name: string): T | undefined {
        return this.plugins.find(f => f.name.toLowerCase() == name.toLowerCase()) as T;
    }

    async start() {
        this.log.debug('StStartup');
        let failCount = 0;
        while (ClientLibLoader.isLoaded === false) {
            failCount++;
            await new Promise(resolve => setTimeout(resolve, 100));
            if (failCount > 100) {
                this.log.error('StStartup:Failed');
                throw new Error('St: failed to start after 100 attempts.');
            }
        }
        const removed = LocalCache.cleanUp();
        this.log.trace({ removed }, 'StCleanup');

        for (const plugin of this.plugins) {
            if (this.config.isDisabled(plugin)) {
                this.log.info({ plugin: plugin.name }, 'StPlugin:Disabled');
                continue;
            }

            if (plugin.state != StPluginState.Init) {
                this.log.warn({ plugin: plugin.name, state: plugin.state }, 'Invalid module state');
                continue;
            }

            this.log.debug({ plugin: plugin.name }, 'StPlugin:Start');
            await plugin.start();
        }
    }

    async stop() {
        for (const plugin of this.plugins) {
            if (plugin.state != StPluginState.Started) {
                continue;
            }
            this.log.debug({ plugin: plugin.name }, 'StPlugin:Stop');
            await plugin.stop();
        }
    }

    push(plugin: StPlugin) {
        this.log.debug({ plugin: plugin.name }, 'StPlugin:Add');
        if (!plugin.isInit) {
            throw new Error('Invalid plugin state: ' + plugin.name + ' ' + plugin.state);
        }

        if (this.plugins.find(f => f.name == plugin.name)) {
            throw new Error('Duplicate plugin name: ' + plugin.name);
        }

        this.plugins.push(plugin);
        if (ClientLibLoader.isLoaded && !this.config.isDisabled(plugin)) {
            plugin.st = this;
            plugin.start().catch(error => StLog.error({ error, plugin: plugin.name }, 'Failed to start plugin'));
        }
    }

    onConfig() {
        this.plugins.forEach(c => c.isStarted && c.onConfig?.());
    }
}
