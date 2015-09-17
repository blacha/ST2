/// <reference path="../../typings/tsd.d.ts" />


import {CNCBase} from '../client/client.base';
import {Base} from '../lib/base';
import {Tile} from '../lib/base/tile';
import {Building} from '../lib/building/building';
import {Buildable} from '../lib/base/buildable';
import {Constants} from '../lib/constants';
import {RenderBuildingTile} from './base/tile';



import {BaseProduction} from '../lib/production';

function ParseConfig(http, opts) {
    http.setRequestHeader('X-Parse-Application-Id', 'p1tXYbkTHiz7KuX9BiGG5LtJEe0EOqegIl6F1XhJ');
    http.setRequestHeader('X-Parse-REST-API-Key', 'UdPxMf4bww3S5KSUe9qAFYMaZ1mfEGYE2TGePGTU');
    return http;
}

function getParseData(id) {
    var url = 'https://api.parse.com/1/classes/Layout/' + id;
    return m.request({
        method: 'GET',
        url: url,
        config: ParseConfig
    }).then(function (data:CNCBase) {
        console.log('got-data', id, data);
        return data;
    }).then(function (data:CNCBase) {
        return Base.load(data);
    })
}


export var BaseRender = {
    controller: function () {
        var baseID = m.route.param('baseID');
        var baseProp = m.prop();

        getParseData(baseID).then(function (base) {
            console.log('set-prop', base);
            baseProp(base);

            return base;
        }).then(function (base) {
            console.log('get-production')
            var production = BaseProduction.getOutput(base);
            console.log(production);
        });

        return {
            base: baseProp,
            ready: function () {
                return !!baseProp();
            },
            selected: m.prop()
        }
    },

    view: function (ctrl) {
        if (ctrl.ready() == false) {
            console.log('not-ready');
            return;
        }
        console.log('base-data', ctrl.base);

        var base = ctrl.base();
        if (base == null) {
            console.log('no-base');
            return;
        }
        console.log(base.getName());
        console.time('base-render');
        var output = m('div', {
            className: 'Container'
        }, [
            makeBaseHeader(base),
            makeBaseTiles(ctrl, base)
        ]);
        console.timeEnd('base-render');

        return output;
    }
};

function makeBaseTiles(ctrl, base:Base) {
    var tiles = base.buildingsForEach(RenderBuildingTile);
    return m('div', {
        className: 'BaseTiles', onclick: function (evt) {
            console.log('base-click', evt);
        }
    }, tiles);
}

function makeBaseHeader(base:Base) {
    return m('div', {
        className: 'BaseHead'
    }, [
        m('span', {
            className: 'BaseName',
        }, base.getName()),
        m('span', {
            className: 'BaseFaction'
        }, base.getFaction().getName())
    ])
}