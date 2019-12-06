
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Base } from '../../lib/base';
import { BaseBuilder } from '../../lib/base.builder';
import { style } from "typestyle";
import { Tile } from '../../lib/base/tile';
import { Buildable } from '../../lib/base/buildable';
import { BaseProduction } from '../../lib/production';


const TileSize = 48;

export const BaseCss = {
    Base: style({
        width: (Base.MaxX * TileSize) + 'px',
        display: 'flex',
        flexWrap: 'wrap'
    }),
    Grid: {
        Base: style({
            position: 'relative',
            width: `${TileSize}px`,
            height: `${TileSize}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            outline: '1px solid rgba(0,0,0,0.4)'
        }),
        Crystal: style({
            backgroundColor: 'rgba(0,0,150,0.47)'
        }),
        Tiberium: style({
            backgroundColor: 'rgba(0,200,0,0.47)'
        })
    },
    Cell: {
        Level: style({
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            fontSize: '80%',
            // border: '1px solid rgba(0,0,0,0.2)',
            // backgroundColor: 'rgba(150,0,0,0.8)',
            // borderRadius: '4px'
        })
    }
}

interface ViewBaseProps extends RouteComponentProps<{ baseId?: string }> { }

export class ViewBase extends React.Component<ViewBaseProps> {
    base: Base;

    constructor(props: ViewBaseProps) {
        super(props)
        const { baseId } = this.props.match.params;
        if (baseId == null) {
            this.base = new Base();
        } else {
            if (baseId.indexOf('|') > -1) {
                this.base = BaseBuilder.fromCnCOpt(baseId);
            } else {
                this.base = new Base();
            }
        }
    }

    render() {
        return (
            <div className="Base">
                <ViewBaseMain base={this.base} />
                <ViewBaseStats base={this.base} />
            </div>
        )
    }
}

export class ViewBaseMain extends React.Component<{ base: Base }> {

    render() {
        const output = []
        for (let y = 0; y < Base.MaxBaseY; y++) {
            for (let x = 0; x < Base.MaxX; x++) {
                output.push(
                    <ViewBaseItem x={x} y={y} base={this.props.base} key={`${x}-${y}`} />
                )
            }
        }

        return (<div className={BaseCss.Base}>{output}</div>)
    }
}


export class ViewBaseItem extends React.Component<{ x: number, y: number, base: Base }> {

    render() {
        const { x, y, base } = this.props;
        const classNames = [BaseCss.Grid.Base];
        const tile = base.getTile(x, y);
        if (tile == Tile.Crystal) {
            classNames.push(BaseCss.Grid.Crystal)
        } else if (tile == Tile.Tiberium) {
            classNames.push(BaseCss.Grid.Tiberium)
        }
        const building = base.getBase(x, y);
        if (building == null) {
            return <div className={classNames.join(" ")} />
        }

        return (
            <div className={classNames.join(' ')} title={building.type.data.display + ` (${building.level})`} >
                <div className={BaseCss.Cell.Level}>{building.level}</div>
                <div>{building.type.code}</div>
            </div>
        )
    }
}

export class ViewBaseStats extends React.Component<{ base: Base }> {

    render() {
        const stats = this.props.base.stats;
        // const prod = BaseProduction.getOutput(this.props.base);
        // console.log(prod)
        return (<div className={BaseCss.Base}>
            <div>Stats</div>
            <div><div>Tiberium</div><div>{stats.tiberium.score}</div></div>
            <div><div>Crystal</div><div>{stats.crystal.score}</div></div>
        </div>)
    }
}
