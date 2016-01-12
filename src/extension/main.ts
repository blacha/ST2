import {PlayerInfoModule} from './player/player.info.module';
import {CityData} from './city/city.data';

import {ClientLibPatcher} from './patch/patch';

import {Log} from '../lib/log/log';
import {ParseUtil} from './util/parse';
import {ClientLibUtil} from './util/clientlib';
import {StorageUtil} from './util/storage';
import {ConsoleLogTextStream} from "../lib/log/stream";
import {WaveCounterModule} from "./wave/wave.counter.module";
import {LayoutScannerModule} from "./layout/layout.scanner.module";

var PlayerInfo = PlayerInfoModule.getInstance();

Log.getInstance().addStream(new ConsoleLogTextStream(Log.DEBUG));

export var $VERSION = '2.0.0';

export var Modules = {
    PlayerInfo: PlayerInfoModule,
    WaveCounter: WaveCounterModule,
    LayoutScanner: LayoutScannerModule
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

    Object.keys(Modules).forEach((key) => {
        var module = Modules[key];
        module.start();
    });

}


export function stop() {
    Object.keys(Modules).forEach((key) => {
        var module = Modules[key];
        module.stop();
    });
}

if (typeof ST2 !== 'undefined' && ST2.stop) {
    ST2.stop();
}

