import {Base} from '../../../lib/base';
import {BaseProduction} from '../../../lib/production';

import * as Util from '../../../lib/util';
import {GameResources} from "../../../lib/game.resources";


var ORDER = [GameResources.TIBERIUM, GameResources.CRYSTAL, GameResources.POWER, GameResources.CREDIT];
//export function RenderBaseHeader(base:Base) {
//    return m('div', {
//        className: 'BaseHeader'
//    }, [
//        makeTitle(base),
//        makeProduction(base)
//    ])
//}

export function makeSideInfo(base:Base) {
    return makeProduction(base);
}

export function makeProduction(base:Base) {
    var production = BaseProduction.getOutput(base);

    var productionLists = ORDER.map(function (key) {

        return m('div', {
            className: 'BaseProduction BaseProduction--' + key
        }, [
            m('i.icon-' + key),
            m('span.BaseProduction-Value', Util.formatNumber(production.cont[key] + production.pkg[key]) + '/h')
        ]);
    });

    return m('div', {
        className: 'BaseProduction--Group BoxShadow'
    }, [
        m('span.BaseProduction-Title', 'Production'),
        productionLists
    ]);
}


export function makeTitle(base:Base) {
    var location = base.getLocation();
    return m('div', {
        className: 'BaseInfo BoxShadow'
    }, [
        m('span', {
            className: 'BaseName',
        }, [
            m('i.icon-' + base.getFaction().getClassName()),
            m('div.BaseName-Name', base.getName())
        ]),
        m('span', {
            className: 'BaseLocation'
        }, `${location.x}:${location.y}`)

        //m('span', {
        //    className: 'BaseFaction'
        //}, [
        //    m('i.icon-' + base.getFaction().getClassName()),
        //    m('span.BaseFaction--name', base.getFaction().getName())
        //])
    ])
}