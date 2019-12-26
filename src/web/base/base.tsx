import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { style } from 'typestyle';
import { Base } from '../../lib/base';
import { BaseBuilder } from '../../lib/base.builder';
import { FireStoreBases } from '../firebase';
import { ViewBaseDef } from './base.def';
import { ViewBaseMain } from './base.main';
import { ViewBaseOff } from './base.off';
import { ViewBaseStats } from './base.stats';
import { viewFaction } from './faction';

const TileSize = 48;

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
        Crystal: style({ backgroundColor: 'rgba(0,0,150,0.47)' }),
        Tiberium: style({ backgroundColor: 'rgba(0,200,0,0.47)' }),
        Oil: style({ backgroundColor: 'rgba(20,20,20,0.47)' }),
        Woods: style({ backgroundColor: 'rgba(140,80,0,0.47)' }),
        Swamp: style({ backgroundColor: 'rgba(0,0,80,0.47)' }),
        Scrub: style({ backgroundColor: 'rgba(100,80,80,0.47)' }),
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
export enum ComponentLoading {
    Ready,
    Loading,
    Failed,
    Done,
}
type ViewBaseProps = RouteComponentProps<{ baseId?: string }>;

export class ViewBase extends React.Component<ViewBaseProps> {
    state = { base: new Base(), state: ComponentLoading.Ready };

    componentDidMount() {
        const { baseId } = this.props.match.params;
        if (baseId == null) {
            return;
        }

        if (baseId.indexOf('|') > -1) {
            this.setState({ base: BaseBuilder.fromCnCOpt(baseId), state: ComponentLoading.Done });
        } else {
            this.setState({ base: new Base(), state: ComponentLoading.Loading });
            this.loadBase(baseId);
        }
    }

    async loadBase(baseId: string) {
        console.log('LoadBase', baseId);
        const doc = await FireStoreBases.doc(baseId).get();
        console.log('Loaded', doc, doc.exists, doc.data());
        if (!doc.exists) {
            this.setState({ base: this.state.base, state: ComponentLoading.Failed });
            return;
        }
        const data = doc.data();
        if (data == null) {
            this.setState({ base: this.state.base, state: ComponentLoading.Failed });
            return;
        }
        const base = BaseBuilder.load(data);
        this.setState({ base, state: ComponentLoading.Done });
    }

    render() {
        const { base, state } = this.state;
        if (state == ComponentLoading.Loading) {
            return <div>Loading...</div>;
        }
        if (state == ComponentLoading.Failed) {
            return <div>Could not find base</div>;
        }

        return (
            <div className="Base">
                <div className={BaseCss.Title}>
                    {viewFaction(base.faction)}
                    <div>{base.name} </div>
                    <div>{base.x > 0 ? `@ ${base.x}, ${base.y}` : ''}</div>
                    <div>{base.owner}</div>
                </div>
                <ViewBaseStats base={base} />
                <ViewBaseMain base={base} size={TileSize} />
                <ViewBaseDef base={base} size={TileSize} />
                <ViewBaseOff base={base} size={TileSize} />
            </div>
        );
    }
}
