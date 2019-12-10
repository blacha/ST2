
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Base } from '../../lib/base';
import { BaseBuilder } from '../../lib/base.builder';
import { style } from "typestyle";
import { Tile } from '../../lib/base/tile';
import { Buildable } from '../../lib/base/buildable';
import { BaseProduction } from '../../lib/production';


const TileSize = 32;

export const BaseCss = {
    Size32: style({
        width: '32px',
        height: '32px'
    }),
    Size48: style({
        width: '48px',
        height: '48px'
    }),

    Base: style({
        display: 'flex',
        flexWrap: 'wrap'
    }),
    Grid: {
        Base: style({
            position: 'relative',
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
                <ViewBaseMain base={this.base} size={32} />
                <ViewBaseStats base={this.base} />
            </div>
        )
    }
}

export class ViewBaseMain extends React.Component<{ base: Base, size: number }> {

    render() {
        const output = []
        for (let x = 0; x < Base.MaxX; x++) {
            const row = []
            for (let y = 0; y < Base.MaxBaseY; y++) {
                row.push(
                    <ViewBaseItem x={x} y={y} base={this.props.base} size={this.props.size} key={`${x}-${y}`} />
                )
            }
            output.push(<div className={`BaseRow-${x}`} key={`row-${x}`}>{...row}</div>)
        }

        return (<div className={BaseCss.Base}>{output}</div>)
    }
}


export class ViewBaseItem extends React.Component<{ x: number, y: number, base: Base, size: number }> {

    render() {
        const { x, y, base, size } = this.props;
        const classNames = [BaseCss.Grid.Base];
        const tile = base.getTile(x, y);
        if (tile == Tile.Crystal) {
            classNames.push(BaseCss.Grid.Crystal)
        } else if (tile == Tile.Tiberium) {
            classNames.push(BaseCss.Grid.Tiberium)
        }
        if (size !== 32) {
            classNames.push(style({ width: size + 'px', height: size + 'px' }))
        } else {
            classNames.push(BaseCss.Size48)
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
        const prod = BaseProduction.getOutput(this.props.base);
        console.log(prod)
        return (<div className={BaseCss.Base}>
            <div>Stats</div>
            <div><div>Tiberium</div><div>{stats.tiberium.score}</div></div>
            <div><div>Crystal</div><div>{stats.crystal.score}</div></div>
        </div>)
    }
}
