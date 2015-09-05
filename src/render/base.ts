/// <reference path="../../typings/tsd.d.ts" />


import {Base} from '../lib/base';
import {Tile} from '../lib/base/tile';
import {Building} from '../lib/building/building';
import {Buildable} from '../lib/base/buildable';
import {Constants} from '../lib/constants';

import {FORTRESS, NODBASE, GDIBASE, CAMP_2} from '../client/client.base';


export var BaseRender = {
    controller: function () {
        this.base = Base.load(CAMP_2);
    },

    view: function (ctrl) {
        console.log(ctrl.base.getName());
        console.time('base-render');
        var output = m('div', [
            makeBaseHeader(ctrl.base),
            makeBaseTiles(ctrl.base)
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
        return m('div', { className: className.join(' ') });
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
        }, node.getLevel())
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