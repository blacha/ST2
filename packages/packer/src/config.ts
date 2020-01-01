import * as gitRev from 'git-rev-sync';
export const Config = {
    hash: gitRev.short(),
    version: '',
    icon: 'favicon.0012b310.png',
    baseUrl: 'https://shockrtools.web.app',
    apiKey: 'AIzaSyBm7H-ccEuECJXxP4hAPSnew0E6HyGmeoo',
};

export function replaceConfig(str: string): string {
    return str
        .replace(/__VERSION__/g, Config.version)
        .replace(/__ICON__/g, Config.icon)
        .replace(/__URL__/g, Config.baseUrl)
        .replace(/__HASH__/g, Config.hash)
        .replace(/__API_KEY__/g, Config.apiKey);
}
