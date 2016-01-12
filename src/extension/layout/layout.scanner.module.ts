import {Log} from '../../lib/log/log';

import {ParseUtil} from '../util/parse';
import {LayoutScanner} from "./layout.scanner";
import {LayoutScanAPI, CityLayout} from "../../api/city.layout";

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

    static run(x:number, y:number) {
        LayoutScanner.scanLayout(x, y, null, LayoutScannerModule.log).then((layout:CityLayout) => {
            console.log('scan-done', layout);


            var api: LayoutScanAPI = {
                version: 1,
                player: 'shockrNZ',
                world: 327,
                layouts: [layout]
            };

            ParseUtil.send('layout_scan', api, LayoutScannerModule.log);

        });
    }


}
