import {Base} from '../../lib/base';
import {BaseProduction} from '../../lib/production';

import * as Util from '../../lib/util';


var ORDER = ['tiberium', 'crystal', 'power', 'credit'];
export function RenderBaseHeader(base:Base) {
    return m('div', {
        className: 'BaseHeader'
    }, [
        makeTitle(base),
        makeProduction(base)
    ])
}


function makeProduction(base:Base) {
    var production = BaseProduction.getOutput(base);

    var productionLists = ORDER.map(function (key) {
        var output = production[key];

        return m('div', {
            className: 'BaseProduction BaseProduction--' + key
        }, [
            m('i.icon-' + key),
            m('span.BaseProduction--Value', Util.formatNumber(output.cont + output.pkg) + '/h')
        ]);
    });

    return m('div', {
        className: 'BaseProduction--Group'
    }, productionLists);
}


function makeTitle(base:Base) {
    var location = base.getLocation();
    return m('div', {
        className: 'BaseHead'
    }, [
        m('span', {
            className: 'BaseName',
        }, base.getName()),
        m('span', {
            className: 'BaseLocation'
        }, `${location.x}:${location.y}`),
        m('span', {
            className: 'BaseFaction'
        }, [
            m('i.icon-' + base.getFaction().getClassName()),
            m('span.BaseFaction--name', base.getFaction().getName())
        ])
    ])
}