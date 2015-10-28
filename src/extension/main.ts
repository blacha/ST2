import {PlayerInfoModule} from './player/player.info.module';
import {CityData} from './city/city.data';

import {Log} from '../lib/log/log';
import {ParseUtil} from './util/parse';
import {PatchUtil} from './util/patch';
import {ClientLibUtil} from './util/clientlib';
import {StorageUtil} from './util/storage';

var PlayerInfo = PlayerInfoModule.getInstance();

export var $VERSION = '2.0.0';

export var Modules = {
    PlayerInfo: PlayerInfo
};

export var Util = {
    Parse: ParseUtil.getInstance(),
    Log: Log.getInstance(),
    Storage: StorageUtil,
    Patch: PatchUtil
};

export function start() {
    if (ClientLibUtil.isLoaded() === false) {
        setTimeout(start, 100);
        return;
    }


    PlayerInfoModule.start();
}