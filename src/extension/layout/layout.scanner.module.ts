import {Log} from '../../lib/log/log';

import {ParseUtil} from '../util/parse';
import {LayoutScanner} from "./layout.scanner";

export class LayoutScannerModule {
    static log:Log;

    static start() {
        LayoutScannerModule.log = Log.child({module: 'LayoutScanner'});
    }

    static stop() {
        LayoutScanner.$abort = true;
    }

    static getInstance() {
        return LayoutScanner;
    }

    static run(force = false) {

    }
}
