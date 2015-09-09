/// <reference path="../../typings/tsd.d.ts" />


import {Base} from '../lib/base';
import {Tile} from '../lib/base/tile';
import {Building} from '../lib/building/building';
import {Buildable} from '../lib/base/buildable';
import {Constants} from '../lib/constants';

//import {FORTRESS, NODBASE, GDIBASE, CAMP_2} from '../client/client.base';
//import {GDI_BASE} from '../client/gdi.base';
//import {FORTRESS} from '../client/fortress.w301';


function ParseConfig(http, opts) {
    http.setRequestHeader('X-Parse-Application-Id', 'p1tXYbkTHiz7KuX9BiGG5LtJEe0EOqegIl6F1XhJ');
    http.setRequestHeader('X-Parse-REST-API-Key', 'UdPxMf4bww3S5KSUe9qAFYMaZ1mfEGYE2TGePGTU');
    return http;
}

function getParseData(layout) {
    var url = 'https://api.parse.com/1/classes/Layout/' + layout;
    return m.request({
        method: 'GET',
        url: url,
        config: ParseConfig
    }).then(function (data) {
        console.log('got-data', layout, data);
        return data;
    }).then(function (data) {
        return Base.load(data);
    })
}


var BASE_ID = {
    fortress: 'D5alGNhME0',
    nod: 'TgNPCrzyAJ'
};

var url = 'https://api.parse.com/1/classes/Layout/' + BASE_ID.fortress;

export var BaseRender = {
    controller: function () {
        var baseProp = m.prop();

        m.request({
            method: 'GET',
            url: url,
            config: ParseConfig
        }).then(function(data) {
            var actualBase = Base.load(data);
            console.log(actualBase);
            baseProp(actualBase);
            return actualBase;
        }).then(m.redraw);

        console.log('controller');

        return {
            base: baseProp,
            ready: function() {
                return !!baseProp();
            }
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
            makeBaseTiles(base)
        ]);
        console.timeEnd('base-render');

        return output;
    }
};

function makeBaseTiles(base:Base) {
    var output = [];

    var i;

    for (i = 0; i < Constants.MAX_BASE_Y; i++) {
        output.push(makeBaseTilesRow(base, i, base.getBaseTile));
    }

    var defTiles = [m('div', {className: 'BaseTileRow BaseTitle'}, 'Def')];
    for (i = 0; i < Constants.MAX_DEF_Y; i++) {
        defTiles.push(makeBaseTilesRow(base, i, base.getDefTile));
    }
    output.push(m('div', {className: 'BaseDefTiles'}, defTiles));

    var offTiles = [m('div', {className: 'BaseTileRow BaseTitle'}, 'Off')];
    for (i = 0; i < Constants.MAX_OFF_Y; i++) {
        offTiles.push(makeBaseTilesRow(base, i, base.getOffTile));
    }
    output.push(m('div', {className: 'BaseOffTiles'}, offTiles));

    return m('div', {className: 'BaseTiles'}, output);
}

function makeBaseTilesRow(base:Base, row:number, baseTileFunc) {
    var output = [];

    for (var i = 0; i < Constants.MAX_BASE_X; i++) {
        output.push(makeBaseTile(base, i, row, baseTileFunc));
    }

    return m('div', {className: 'BaseTileRow'}, output);
}

function makeBaseTile(base:Base, x, y, tileFunc) {
    var className = ['BaseTile'];
    var tile = base.getTile(x, y);
    if (tile !== Tile.Empty) {
        className.push('BaseTile-' + tile.getName())
    }
    var node = tileFunc.call(base, x, y);
    if (node == null) {
        return m('div', {className: className.join(' ')});
    }

    var hasUpgrade = base.hasUpgrade(node.getID());
    var upgradeText = '';
    if (hasUpgrade) {
        className.push('UnitUpgrade');
    }
    className.push('BaseTile-' + node.getID());
    return m('div', {
        className: className.join(' '),
        title: node.getName()
    }, [
        m('img', {
            src: './images/' + node.getID() + '.png',
        }),
        //m('span', {
        //    className: 'BaseTileName'
        //}, tile.getName()),
        m('span', {
            className: 'BaseTileLevel'
        }, upgradeText + node.getLevel())
    ]);
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