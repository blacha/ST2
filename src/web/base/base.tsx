import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Base } from '../../lib/base';
import { BaseBuilder } from '../../lib/base.builder';
import { style } from 'typestyle';
import { Tile } from '../../lib/base/tile';
import { Buildable } from '../../lib/base/buildable';
import { BaseProduction } from '../../lib/production';
import { formatNumber } from '../../lib/util';
import { ViewBaseStats } from './base.stats';
import { ViewBaseMain } from './base.main';
import { ViewBaseDef } from './base.def';
import { ViewBaseOff } from './base.off';

const TileSize = 32;

export const BaseCss = {
    Size32: style({
        width: '32px',
        height: '32px',
    }),
    Size48: style({
        width: '48px',
        height: '48px',
    }),

    Base: style({
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    }),
    BaseDef: style({
        margin: '16px 0',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    }),
    Total: style({
        fontWeight: 'bold',
    }),
    Title: style({
        fontWeight: 'bold',
    }),
    Grid: {
        Base: style({
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            outline: '1px solid rgba(0,0,0,0.4)',
        }),
        Crystal: style({
            backgroundColor: 'rgba(0,0,150,0.47)',
        }),
        Tiberium: style({
            backgroundColor: 'rgba(0,200,0,0.47)',
        }),
        Oil: style({
            backgroundColor: 'rgba(20,20,20,0.47)',
        }),
        Woods: style({
            backgroundColor: 'rgba(140,80,0,0.47)',
        }),
        Swamp: style({
            backgroundColor: 'rgba(0,0,80,0.47)',
        }),
        Scrub: style({
            backgroundColor: 'rgba(100,80,80,0.47)',
        }),
    },
    Cell: {
        Level: style({
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            fontSize: '80%',
        }),
    },
};

type ViewBaseProps = RouteComponentProps<{ baseId?: string }>;

export class ViewBase extends React.Component<ViewBaseProps> {
    base: Base;

    constructor(props: ViewBaseProps) {
        super(props);
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
                <div className={BaseCss.Title}>
                    <div>{this.base.name} </div>
                    <div>{this.base.x > 0 ? `@ ${this.base.x}, ${this.base.y}` : ''}</div>
                    <div>{this.base.owner}</div>
                </div>
                <ViewBaseStats base={this.base} />
                <ViewBaseMain base={this.base} size={32} />
                <ViewBaseDef base={this.base} size={32} />
                <ViewBaseOff base={this.base} size={32} />
            </div>
        );
    }
}
