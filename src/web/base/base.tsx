import Divider from 'antd/es/divider';
import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { style } from 'typestyle';
import { Base } from '../../lib/base/base';
import { BaseBuilder } from '../../lib/base/base.builder';
import { FireStoreBases } from '../firebase';
import { ViewBaseStats, ResourceIcon } from './base.stats';
import { ViewBaseDef } from './tiles/base.def';
import { ViewBaseMain } from './tiles/base.main';
import { ViewBaseOff } from './tiles/base.off';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Tag from 'antd/es/tag';
import { GameResource } from '../../lib/game.resources';
const TileSize = 64;

export const BaseCss = {
    Base: style({
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    }),
    BaseDef: style({
        margin: '16px 0',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    }),
    Total: style({ fontWeight: 'bold' }),
    Title: style({ fontWeight: 'bold' }),
};
const ResourceCountsCss = style({ display: 'flex', alignItems: 'center' });
export enum ComponentLoading {
    Ready,
    Loading,
    Failed,
    Done,
}
type ViewBaseProps = RouteComponentProps<{ baseId?: string }>;
function viewBaseAlliance(base: Base) {
    if (base.alliance == null) {
        return '';
    }

    return (
        <Row type="flex" justify="space-between" gutter={[16, 16]}>
            <Col>Alliance</Col>
            <Col>
                <Link to={`/world/${base.worldId}/alliance/${base.alliance.id}`}>{base.alliance.name}</Link>
            </Col>
        </Row>
    );
}

export class SiloTag extends React.Component<{ resource: 'tiberium' | 'crystal' | 'mixed'; base: Base; size: number }> {
    render() {
        const { resource, size, base } = this.props;
        const stats = base.info.stats;
        const count = stats[resource][size];
        if (count == 0) {
            return '';
        }
        let color = 'green';
        if (size == 6 && resource == 'tiberium') {
            color = 'volcano';
        } else if (resource == 'crystal') {
            color = 'blue';
        } else if (resource == 'mixed') {
            color = 'purple';
        }
        return (
            <Tag color={color} title={`${count} silo${count == 1 ? '' : 's'} touching ${size} ${resource} harvesters`}>
                {count} x {size}
            </Tag>
        );
    }
}

function viewBaseLocation(base: Base) {
    if (base.x < 0) {
        return '';
    }
    const silos = base.info.stats;
    return (
        <React.Fragment>
            <Row type="flex" justify="space-between" gutter={[16, 16]}>
                <Col>Owner</Col>
                <Col>{base.owner}</Col>
            </Row>
            {viewBaseAlliance(base)}
            <Row type="flex" justify="space-between" gutter={[16, 16]}>
                <Col>World</Col>
                <Col>{base.worldId}</Col>
            </Row>
            <Row type="flex" justify="space-between" gutter={[16, 16]}>
                <Col>Location</Col>
                <Col>
                    {base.x}:{base.y}
                </Col>
            </Row>
            {/* <Row type="flex" justify="space-between" gutter={[4, 16]}>
                <Col>Resources</Col>
                <Col className={ResourceCountsCss}>
                    {base.info.tiles.tiberium} <ResourceIcon resource="tiberium"></ResourceIcon>
                    {base.info.tiles.crystal} <ResourceIcon resource="crystal"></ResourceIcon>
                </Col>
            </Row> */}
            <Row type="flex" justify="space-between" gutter={[4, 16]}>
                <Col>Silos</Col>
                <Col className={ResourceCountsCss}>
                    <SiloTag resource="tiberium" size={6} base={base} />
                    <SiloTag resource="tiberium" size={5} base={base} />
                    <SiloTag resource="tiberium" size={4} base={base} />
                    <SiloTag resource="crystal" size={6} base={base} />
                    <SiloTag resource="crystal" size={5} base={base} />
                    <SiloTag resource="crystal" size={4} base={base} />
                    <SiloTag resource="mixed" size={6} base={base} />
                    <SiloTag resource="mixed" size={5} base={base} />
                    <SiloTag resource="mixed" size={4} base={base} />
                </Col>
            </Row>
        </React.Fragment>
    );
}

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

        const baseWidth = TileSize * Base.MaxX + 'px';
        return (
            <div className={BaseCss.Base}>
                <Divider>{base.name}</Divider>

                <div style={{ width: baseWidth }}>
                    <div>{viewBaseLocation(base)}</div>
                    <div style={{ width: baseWidth }}>
                        <ViewBaseStats base={base} />
                    </div>
                </div>

                <div style={{ width: baseWidth }}>
                    <ViewBaseMain base={base} size={TileSize} />
                    <ViewBaseDef base={base} size={TileSize} />
                    <ViewBaseOff base={base} size={TileSize} />
                </div>
            </div>
        );
    }
}
