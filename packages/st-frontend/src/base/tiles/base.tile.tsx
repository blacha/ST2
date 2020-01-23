import React = require('react');
import { style } from 'typestyle';
import { BackgroundImage, FlexCenter } from '../../css.util';
import { Tile, Base } from '@st/shared';
import { UnitIcon, UnitUpgradeIcon } from '../units';
import * as icons from '../../../static/icon/*.png';

export const TileIconCss = {
    [Tile.Crystal.id]: style({ backgroundImage: `url(${icons.TileCrystal})` }),
    [Tile.Tiberium.id]: style({ backgroundImage: `url(${icons.TileTiberium})` }),
    [Tile.Oil.id]: style({ backgroundImage: `url(${icons.TileOil})` }),
    [Tile.Woods.id]: style({ backgroundImage: `url(${icons.TileWoods})` }),
    [Tile.Swamp.id]: style({ backgroundImage: `url(${icons.TileSwamp})` }),
    [Tile.Scrub.id]: style({ backgroundImage: `url(${icons.TileScrub})` }),
};
export const TileColorCss = {
    [Tile.Crystal.id]: style({ backgroundColor: 'rgba(0,0,150,0.47)' }),
    [Tile.Tiberium.id]: style({ backgroundColor: 'rgba(0,200,0,0.47)' }),
    [Tile.Oil.id]: style({ backgroundColor: 'rgba(20,20,20,0.47)' }),
    [Tile.Woods.id]: style({ backgroundColor: 'rgba(140,80,0,0.47)' }),
    [Tile.Swamp.id]: style({ backgroundColor: 'rgba(0,0,80,0.47)' }),
    [Tile.Scrub.id]: style({ backgroundColor: 'rgba(100,80,80,0.47)' }),
};

const BaseTileCss = {
    Base: style({
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        outline: '1px solid rgba(0,0,0,0.4)',
        ...BackgroundImage(90),
    }),

    Cell: {
        Level: style({
            position: 'absolute',
            top: '2px',
            left: '2px',
            fontSize: '80%',
            border: '1px solid rgba(0,0,0,0.8)',
            backgroundColor: 'rgba(209,209,209,0.8)',
            borderRadius: '4px',
            minWidth: '20px',
            minHeight: '20px',
            textAlign: 'center',
            fontWeight: 'bold',
            ...FlexCenter,
        }),
    },
};
function getTileCss(tile: Tile, useImages = false): string {
    if (useImages) {
        return TileIconCss[tile.id];
    } else {
        return TileColorCss[tile.id];
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
                <UnitIcon unitId={building.type.id} />
                <div className={BaseTileCss.Cell.Level}>{building.level}</div>
                <UnitUpgradeIcon isUpgraded={base.isResearchUpgraded(building.type.id)} />
            </div>
        );
    }
}
