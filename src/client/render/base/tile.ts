/// <reference path="../../../../typings/tsd.d.ts" />


import {CNCBase} from '../../client.base.ts';
import {Base} from '../../../lib/base';
import {Tile} from '../../../lib/base/tile';
import {Building} from '../../../lib/building/building';
import {Buildable} from '../../../lib/base/buildable';
import {Constants} from '../../../lib/constants';

export function RenderBuildingTile(x:number, y:number, building:Buildable, tile:Tile, base:Base) {
    var className = [
        'BaseTile',
        `BaseRow-${y}`,
        `BaseCol-${x}`,
        `BaseTile-${x}-${y}`];

    if (x == 4 && y == 1) {
        className.push('BaseTile--Selected');
    }

    if (tile !== Tile.Empty) {
        className.push('BaseTile-' + tile.getName())
    }

    if (building == null) {
        return m('div', {className: className.join(' ')});
    }

    var hasUpgrade = base.hasUpgrade(building.getID());
    if (hasUpgrade) {
        className.push('UnitUpgrade');
    }

    className.push('BaseTile-' + building.getID());

    return m('div', {
        className: className.join(' '),
        title: building.getName()
    }, [
        m('img', {
            src: './images/' + building.getID() + '.png',
        }),
        m('span', {
            className: 'BaseTileLevel'
        }, building.getLevel())
    ]);
}