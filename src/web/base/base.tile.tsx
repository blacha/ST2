import { Base } from "../../lib/base";
import { Tile } from "../../lib/base/tile";
import * as React from 'react';


export class BaseView extends React.Component {

    render() {
        return (
            <div className="Base">

            </div>
        )
    }
}

export interface TileProps {

}
export interface TileState {

}

export class BaseTileView extends React.Component<TileProps, TileState> {

    render() {
        return (
            <div className="BaseTile"></div>
        )
    }
}

// export function RenderBuildingTile(base: Base, x: number, y: number) {
//     const className = [
//         'BaseTile',
//         `BaseRow-${y}`,
//         `BaseCol-${x}`,
//         `BaseTile-${x}-${y}`
//     ];
//     const tile = base.getTile(x, y);

//     if (tile !== Tile.Empty) {
//         className.push('BaseTile-' + tile.name);
//     }
//     const building = base.getBase(x, y)

//     if (building == null) {
//         return m('div', { className: className.join(' ') });
//     }

//     const hasUpgrade = base.hasUpgrade(building.type.id);
//     if (hasUpgrade) {
//         className.push('UnitUpgrade');
//     }

//     className.push('BaseTile-' + building.type.id);
//     const output: m.Vnode[] = [
//         m('img', {
//             style: {
//                 width: '64px',
//                 height: '64px',
//             },
//             src: '/static/images/' + building.type.id + '.png',
//         }),
//         m('span', {
//             className: 'BaseTileLevel'
//         }, building.level)
//     ];

//     return m('div', {
//         className: className.join(' '),
//         title: building.type.name
//     }, output);
// }
