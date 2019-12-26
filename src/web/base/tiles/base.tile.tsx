import React = require('react');
import { style } from 'typestyle';
import { Base } from '../../../lib/base/base';
import { Tile } from '../../../lib/base/tile';
import { BackgroundImage } from '../../css.util';

const BaseTileCss = {
    Base: style({
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        outline: '1px solid rgba(0,0,0,0.4)',
        ...BackgroundImage,
    }),
    Crystal: style({ backgroundColor: 'rgba(0,0,150,0.47)' }),
    Tiberium: style({ backgroundColor: 'rgba(0,200,0,0.47)' }),
    Oil: style({ backgroundColor: 'rgba(20,20,20,0.47)' }),
    Woods: style({ backgroundColor: 'rgba(140,80,0,0.47)' }),
    Swamp: style({ backgroundColor: 'rgba(0,0,80,0.47)' }),
    Scrub: style({ backgroundColor: 'rgba(100,80,80,0.47)' }),

    Cell: {
        Level: style({
            position: 'absolute',
            bottom: '4px',
            right: '4px',
            fontSize: '80%',
            outline: '1px solid rgba(0,0,0,0.4)',
            padding: '2px',
            backgroundColor: 'rgba(209,209,209,0.4)',
        }),
    },
};
function getTileCss(tile: Tile, useImages = false): string {
    if (useImages) {
        if (tile == Tile.Crystal) {
            return 'Tile-Crystal';
        } else if (tile == Tile.Tiberium) {
            return 'Tile-Tiberium';
        } else if (tile == Tile.Oil) {
            return BaseTileCss.Oil;
        } else if (tile == Tile.Swamp) {
            return BaseTileCss.Swamp;
        } else if (tile == Tile.Woods) {
            return BaseTileCss.Woods;
        } else if (tile == Tile.Scrub) {
            return BaseTileCss.Scrub;
        }
    } else {
        if (tile == Tile.Crystal) {
            return BaseTileCss.Crystal;
        } else if (tile == Tile.Tiberium) {
            return BaseTileCss.Tiberium;
        } else if (tile == Tile.Oil) {
            return BaseTileCss.Oil;
        } else if (tile == Tile.Swamp) {
            return BaseTileCss.Swamp;
        } else if (tile == Tile.Woods) {
            return BaseTileCss.Woods;
        } else if (tile == Tile.Scrub) {
            return BaseTileCss.Scrub;
        }
    }
    return '';
}
const TileSizeCss: Record<number, string> = {};

function getSizeCss(size: number) {
    if (TileSizeCss[size] == null) {
        TileSizeCss[size] = style({ width: size + 'px', height: size + 'px' });
    }
    return TileSizeCss[size];
}

export class ViewBaseItem extends React.Component<{
    x: number;
    y: number;
    base: Base;
    size: number;
    useImages?: boolean;
}> {
    render() {
        const { x, y, base, size, useImages } = this.props;
        const tile = base.getTile(x, y);
        const classNames = [BaseTileCss.Base, getTileCss(tile, useImages ?? true), getSizeCss(size)];

        const building = base.getBase(x, y);
        if (building == null) {
            return <div className={classNames.join(' ')} title={tile.name} />;
        }

        return (
            <div className={classNames.join(' ')} title={building.type.data.display + ` (${building.level})`}>
                <div className={BaseTileCss.Cell.Level}>{building.level}</div>
                <div>{building.type.code}</div>
            </div>
        );
    }
}
