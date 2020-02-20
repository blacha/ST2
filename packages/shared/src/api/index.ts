export * from './request.scan';
export * from './request.claim';
export * from './request.claim.layout';
export * from './request.install';
export * from './request.world.data';

export * from './api.func';
export * from './api.util';

export const ApiHeaders = {
    ExtensionVersion: 'X-St-Extension-Version',
    ExtensionHash: 'X-St-Extension-Hash',
    ExtensionInstall: 'X-St-Extension-Install',
};
