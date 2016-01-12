import {Log} from "../../lib/log/log";
import {LayoutScanAPI, CityLayout, LayoutDataVersion} from "../../api/city.layout";
import {Layout} from '../objects/layout';
import {ParseLayoutObject} from "../objects/layout";

var LayoutLog = Log.child({
    func: 'layout_scan'
});


function processLayout($log:Log, cityLayout:CityLayout) {
    var query = {};

    query[Layout.schema.X] = cityLayout.x;
    query[Layout.schema.Y] = cityLayout.y;
    query[Layout.schema.WORLD] = cityLayout.world;


    return Layout.firstQuery(query, true, $log)
        .then((layout:ParseLayoutObject) => {
            if (layout) {
                // Layout is the same
                if (layout.get('cityid') === cityLayout.cityid) {
                    $log.debug('layout updated');
                    return Layout.addACLS(layout, cityLayout, $log);
                }

                return layout.destroy().then(function() {
                    $log.debug('layout destroyed');
                    return Layout.create(cityLayout, true, $log);
                });
            }

            $log.debug('layout created');
            return Layout.create(cityLayout, true, $log);
    });
}



function LayoutScan(req, res) {
    var layoutScan = <LayoutScanAPI>req.params;
    var layouts:CityLayout[] = layoutScan.layouts;

    if (isNaN(layoutScan.version) || layoutScan.version < LayoutDataVersion) {
        return res.success('Version too old');
    }

    var $log = LayoutLog.child({
        player: layoutScan.player,
        world: layoutScan.world,
        layouts: layoutScan.layouts.length
    });

    $log.debug('Layout scan start');

    layouts.reduce((prev, current) => {
        return prev.then(() => {
            $log.debug({
                coord: Layout.makeCoord(current.x, current.y)
            }, 'process layout');
            return processLayout($log, current);
        })
    }, Parse.Promise.as()).then(function () {
        $log.debug('Layout scan done');
        res.success('Layout scan done');
    }, function (err) {
        $log.error({error: err}, 'Error');
        res.error(err);
    })
}

export function define() {
    Parse.Cloud.define('layout_scan', LayoutScan);
}
