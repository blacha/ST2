import React = require('react');
import { AllianceId, GameDataResearchLevel, GameDataUnitId, WorldId, CompositeId } from '@cncta/clientlib';
import { Duration, BaseLocationPacker } from '@cncta/util';
import { Stores, ModelLayout } from '@st/model';
import {
    Base,
    BaseBuilder,
    formatNumber,
    GameResources,
    Id,
    mergeBaseUpgrade,
    WorldAllianceId,
    NumberPacker,
} from '@st/shared';
import 'antd/dist/antd.css';
import BackTop from 'antd/es/back-top';
import Table from 'antd/es/table';
import { Link, RouteComponentProps } from 'react-router-dom';
import { style } from 'typestyle';
import { ComponentLoading } from '../base/base';
import { timeSince } from '../time.util';
import { IdName, StBreadCrumb } from '../util/breacrumb';
import { FactionIcon } from '../util/faction';
import { ViewResearch } from '../util/research';
import Spin from 'antd/es/spin';
import Divider from 'antd/es/divider';
import { PlayerStats, AllianceColumns } from './alliance.table';
import Button from 'antd/es/button';
import { unpackLayouts } from '../layout/layout.util';
import { LayoutView } from '../layout/layout';

export const AllianceCss = {
    Table: style({
        width: '100%',
    }),
    Base: style({
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 10%)',
    }),
    TableHeader: style({
        fontWeight: 'bold',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 10%)',
    }),
};

type AllianceProps = RouteComponentProps<{ worldId: string; allianceId: string }>;
interface AllianceState {
    info: PlayerStats[];
    worldId: number;
    alliance: IdName;
    state: ComponentLoading;
    layouts?: Base[];
    isExpanded?: boolean;
}

const PageSize = 10;

export class ViewAlliance extends React.Component<AllianceProps, AllianceState> {
    state: AllianceState = { info: [], state: ComponentLoading.Init, alliance: { id: -1, name: '' }, worldId: -1 };
    static tableCss = style({ width: '100%', marginBottom: 12 });
    static layoutCss = style({ display: 'flex', width: '100%', flexWrap: 'wrap' });

    componentDidMount() {
        const { worldId, allianceId } = this.props.match.params;
        this.loadAlliance(Number(worldId) as WorldId, Number(allianceId) as AllianceId);
    }

    async loadAlliance(worldId: WorldId, allianceId: AllianceId) {
        const docId = WorldAllianceId.pack({ worldId, allianceId }) as CompositeId<[WorldId, AllianceId]>;
        this.setState({ info: [], state: ComponentLoading.Loading });

        const [results, layoutData] = await Promise.all([
            Stores.Player.getAllBy({ allianceKey: docId }, 60),
            Stores.Layout.get(docId),
        ]);
        if (results == null || layoutData == null) {
            this.setState({ info: [], state: ComponentLoading.Failed });
            return;
        }

        const alliance = { id: allianceId, name: '' };
        const playerSet = new Map<number, PlayerStats>();
        // Grab at most the 50 most recently updated
        const docs = results
            .sort((a, b) => a.updatedAt - b.updatedAt)
            .filter(f => Date.now() - f.updatedAt < Duration.days(2))
            .slice(0, 55);

        for (const doc of docs) {
            const cities = doc.cities;
            const bases = Object.values(cities).map(c => BaseBuilder.load(c));
            for (const base of bases) {
                if (base.owner == null) {
                    continue;
                }
                let current = playerSet.get(base.owner.id);
                if (current == null) {
                    current = {
                        id: Id.generate(),
                        name: base.owner.name,
                        bases: [],
                        production: new GameResources(),
                        main: base,
                        updatedAt: base.updatedAt,
                        upgrades: {},
                    };
                    playerSet.set(base.owner.id, current);
                }
                if (current.main.levelOffense < base.levelOffense) {
                    current.main = base;
                }
                current.bases.push(base);
                current.production.add(base.info.production.total);
                if (base.alliance) {
                    alliance.name = base.alliance.name;
                }
                if (base.updatedAt < current.updatedAt) {
                    current.updatedAt = base.updatedAt;
                }
                mergeBaseUpgrade(base.upgrades, current.upgrades);
            }
        }
        this.setState({
            info: Array.from(playerSet.values()),
            state: ComponentLoading.Done,
            alliance,
            worldId,
            layouts: unpackLayouts(layoutData),
        });
    }

    get isLoading() {
        return this.state.state == ComponentLoading.Loading || this.state.state == ComponentLoading.Init;
    }

    toggleExpand = () => {
        this.setState({ ...this.state, isExpanded: !this.state.isExpanded });
    };

    render() {
        if (this.isLoading) {
            return <Spin></Spin>;
        }
        const { worldId, alliance } = this.state;
        return (
            <React.Fragment>
                <StBreadCrumb worldId={worldId} alliance={alliance} />
                <Divider>
                    <a onClick={this.toggleExpand}>{this.state.alliance.name}</a>
                </Divider>
                {this.renderPlayerInfo()}

                <Divider>
                    <Link to={`/world/${worldId}/alliance/${alliance.id}/layouts`}>Layouts</Link>
                </Divider>
                {this.renderLayouts()}
            </React.Fragment>
        );
    }

    get isPaginatingTable() {
        return this.state.isExpanded != true && this.state.info.length > PageSize;
    }
    renderLayouts() {
        if (this.state.layouts == null) {
            return null;
        }

        return (
            <div className={ViewAlliance.layoutCss}>
                {this.state.layouts.slice(0, 12).map(c => (
                    <LayoutView key={c.cityId} base={c} />
                ))}
            </div>
        );
    }

    renderPlayerInfo() {
        return (
            <React.Fragment>
                <Table
                    className={ViewAlliance.tableCss}
                    rowKey="id"
                    dataSource={this.state.info}
                    columns={AllianceColumns}
                    pagination={this.isPaginatingTable ? { position: 'bottom', pageSize: PageSize } : false}
                    bordered
                    loading={this.isLoading}
                    sortDirections={['descend', 'ascend']}
                    size="small"
                />
                <BackTop></BackTop>
            </React.Fragment>
        );
    }
}
