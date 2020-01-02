import React = require('react');
import { style } from 'typestyle';
import { BackgroundImage, FlexCenter } from '../../css.util';
import { Tile, Base } from '@st/shared';
import { UnitIcon, UnitUpgradeIcon } from '../units';

const BaseTileCss = {
    Base: style({
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        outline: '1px solid rgba(0,0,0,0.4)',
        ...BackgroundImage(90),
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
        return `Tile-${tile.name}`;
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
                <UnitIcon unitId={building.type.id} />
                <div className={BaseTileCss.Cell.Level}>{building.level}</div>
                <UnitUpgradeIcon isUpgraded={base.isResearchUpgraded(building.type.id)} />
            </div>
        );
    }
}
