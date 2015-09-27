/// <reference path="../../../typings/tsd.d.ts" />


import {CNCBase} from '../client.base.ts';
import {Base} from '../../lib/base';
import {Tile} from '../../lib/base/tile';
import {Faction} from '../../lib/data/faction';
import {Building} from '../../lib/building/building';
import {Buildable} from '../../lib/base/buildable';
import {Constants} from '../../lib/constants';

import {RenderBuildingTile} from './base/tile';
import * as Header from './base/header';
import * as Layout from './layout/layout';

import {BaseProduction} from '../../lib/production';
import {ParseUtil} from './parse';

export var BaseRender = {
    controller: function () {
        var baseID = m.route.param('baseID');
        var baseProp = m.prop();

        ParseUtil.getData('Layout', baseID).then(function (base) {
            baseProp(Base.load(base));
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
    if (base.getFaction() !== Faction.Forgotten) {
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
