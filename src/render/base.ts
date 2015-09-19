/// <reference path="../../typings/tsd.d.ts" />


import {CNCBase} from '../client/client.base';
import {Base} from '../lib/base';
import {Tile} from '../lib/base/tile';
import {Faction} from '../lib/data/faction';
import {Building} from '../lib/building/building';
import {Buildable} from '../lib/base/buildable';
import {Constants} from '../lib/constants';

import {RenderBuildingTile} from './base/tile';
import * as Header from './base/header';
import * as Layout from './layout/layout';

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
            baseProp(base);
            return base;
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

        var base = ctrl.base();
        if (base == null) {
            console.log('no-base');
            return;
        }


        return Layout.createLayout(null, [
            m('div.Cell--2', Header.makeTitle(base)),
            m('div.Cell--8', makeBaseTiles(ctrl, base)),
            m('div.Cell--2', Header.makeSideInfo(base))
        ]);
    }
};


function makeBaseTiles(ctrl, base:Base) {
    var baseTiles = m('div.BuildingTiles', base.buildingsForEach(RenderBuildingTile));
    var defTiles = m('div.DefTiles', base.defForEach(RenderBuildingTile));

    var offTiles;
    if (base.getFaction() !== Faction.Forgotten){
        offTiles = m('div.OffTiles', base.offForEach(RenderBuildingTile));
    }

    return m('div', {
        className: 'BaseTiles', onclick: function (evt) {
            console.log('base-click', evt);
        }
    }, [
        baseTiles,
        defTiles,
        offTiles
    ]);
}
