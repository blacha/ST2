import {PlayerInfoModule} from './player/player.info.module';
import {CityData} from './city/city.data';

import {ClientLibPatcher} from './patch/patch';

import {Log} from '../lib/log/log';
import {ParseUtil} from './util/parse';
import {ClientLibUtil} from './util/clientlib';
import {StorageUtil} from './util/storage';

var PlayerInfo = PlayerInfoModule.getInstance();

export var $VERSION = '2.0.0';

export var Modules = {
    PlayerInfo: PlayerInfoModule
};

export var Util = {
    Parse: ParseUtil,
    Log: Log,
    Storage: StorageUtil
};

export function start() {
    if (ClientLibUtil.isLoaded() === false) {
        setTimeout(start, 100);
        return;
    }

    // Patch the client lib before starting the modules
    ClientLibPatcher.patch();

    PlayerInfoModule.start();
}


export function stop() {
    PlayerInfoModule.stop();
}

if (typeof ClientLib !== 'undefined') {
    if (typeof ST2 !== 'undefined' && ST2.stop) {
        ST2.stop();
    }
    start();
}
