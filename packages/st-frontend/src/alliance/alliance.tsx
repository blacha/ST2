import React = require('react');
import { AllianceId, CompositeId, WorldId } from '@cncta/clientlib';
import { Duration } from '@cncta/util';
import { Stores } from '@st/model';
import { Base, BaseBuilder, BaseOptimizer, GameResources, Id, mergeBaseUpgrade, WorldAllianceId } from '@st/shared';
import 'antd/dist/antd.css';
import BackTop from 'antd/es/back-top';
import Button from 'antd/es/button';
import Divider from 'antd/es/divider';
import Spin from 'antd/es/spin';
import Table from 'antd/es/table';
import { Link, RouteComponentProps } from 'react-router-dom';
import { style } from 'typestyle';
import { Cs } from '../base/base';
import { LayoutView } from '../layout/layout';
import { unpackLayouts } from '../layout/layout.util';
import { IdName, StBreadCrumb } from '../util/breacrumb';
import { AllianceColumns, PlayerStats } from './alliance.table';

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
    state: Cs;
    layouts?: Base[];
    isExpanded?: boolean;
}

const PageSize = 20;

export class ViewAlliance extends React.Component<AllianceProps, AllianceState> {
    state: AllianceState = { info: [], state: Cs.Init, alliance: { id: -1, name: '' }, worldId: -1 };
    worldId: WorldId;
    allianceId: AllianceId;

    static refreshCss = style({ alignSelf: 'flex-end', marginBottom: 8, marginTop: -12 });
    static tableCss = style({ width: '100%', marginBottom: 12 });
    static layoutCss = style({ display: 'flex', width: '100%', flexWrap: 'wrap' });

    componentDidMount() {
        const { worldId, allianceId } = this.props.match.params;
        (this.worldId = Number(worldId) as WorldId), (this.allianceId = Number(allianceId) as AllianceId);
        this.loadAlliance();
    }

    async loadAlliance() {
        const currentState = this.state.state;
        if (currentState == Cs.Loading || currentState == Cs.Refreshing) {
            return;
        }
        console.log('Load alliance');
        const { worldId, allianceId } = this;
        const loadingState = currentState == Cs.Init ? Cs.Loading : Cs.Refreshing;
        const docId = WorldAllianceId.pack({ worldId, allianceId }) as CompositeId<[WorldId, AllianceId]>;
        this.setState({ ...this.state, state: loadingState });

        const [results, layoutData] = await Promise.all([
            Stores.Player.getAllBy({ allianceKey: docId }, 60),
            Stores.Layout.get(docId),
        ]);
        if (results == null || layoutData == null) {
            this.setState({ info: [], state: Cs.Failed });
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

        const layouts = unpackLayouts(layoutData);
        for (const layout of layouts) {
            BaseOptimizer.buildSilos(layout);
        }

        this.setState({
            info: Array.from(playerSet.values()),
            state: Cs.Done,
            alliance,
            worldId,
            layouts,
        });
    }

    get isLoading() {
        return this.state.state == Cs.Loading || this.state.state == Cs.Init;
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
                <Button
                    className={ViewAlliance.refreshCss}
                    type="primary"
                    loading={this.state.state == Cs.Refreshing}
                    onClick={() => this.loadAlliance()}
                >
                    Refresh
                </Button>
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
                    pagination={
                        this.isPaginatingTable
                            ? { position: 'bottom', defaultPageSize: PageSize, showSizeChanger: true }
                            : false
                    }
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
