import React = require('react');
import { AllianceId, GameDataResearchLevel, GameDataUnitId, WorldId, CompositeId } from '@cncta/clientlib';
import { Duration } from '@cncta/util';
import { Stores } from '@st/model';
import { Base, BaseBuilder, formatNumber, GameResources, Id, mergeBaseUpgrade, WorldAllianceId } from '@st/shared';
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
export interface PlayerStats {
    id: string;
    name: string;
    bases: Base[];
    production: GameResources;
    main: Base;
    updatedAt: number;
    upgrades: Partial<Record<GameDataUnitId, GameDataResearchLevel>>;
}

type AllianceProps = RouteComponentProps<{ worldId: string; allianceId: string }>;
interface AllianceState {
    info: PlayerStats[];
    worldId: number;
    alliance: IdName;
    state: ComponentLoading;
}

export const AllianceColumns = [
    {
        title: '#',
        key: 'index',
        render: (main: Base, record: any, index: number) => index + 1,
        width: 45,
    },
    {
        title: 'Player',
        dataIndex: 'main',
        key: 'name',
        render: (main: Base) => <Link to={`/world/${main.worldId}/player/${main.owner?.id}`}>{main.owner?.name}</Link>,
        sorter: (a: PlayerStats, b: PlayerStats) => a.name.localeCompare(b.name),
    },
    {
        title: 'F',
        dataIndex: 'main',
        key: 'faction',
        width: 50,
        render: (main: Base) => <FactionIcon faction={main.faction} />,
        sorter: (a: PlayerStats, b: PlayerStats) => a.main.faction.name.localeCompare(b.main.faction.name),
    },
    {
        title: 'B#',
        dataIndex: 'bases',
        key: 'bases',
        render: (bases: Base[]) => bases.length,
        sorter: (a: PlayerStats, b: PlayerStats) => a.bases.length - b.bases.length,
        width: 70,
    },
    {
        title: 'Production',
        key: 'production',
        children: [
            {
                title: 'Tiberium',
                dataIndex: 'production',
                key: 'tiberium',
                render: (production: GameResources) => formatNumber(production.tiberium),
                sorter: (a: PlayerStats, b: PlayerStats) => a.production.tiberium - b.production.tiberium,
            },
            {
                title: 'Crystal',
                dataIndex: 'production',
                key: 'crystal',
                render: (production: GameResources) => formatNumber(production.crystal),
                sorter: (a: PlayerStats, b: PlayerStats) => a.production.crystal - b.production.crystal,
            },
            {
                title: 'Credits',
                dataIndex: 'production',
                key: 'credits',
                render: (production: GameResources) => formatNumber(production.credits),
                sorter: (a: PlayerStats, b: PlayerStats) => a.production.credits - b.production.credits,
            },
        ],
    },
    {
        title: 'Main',
        key: 'main',
        children: [
            {
                title: 'Name',
                dataIndex: 'main',
                key: 'mainName',
                render: (main: Base) => (
                    <Link to={`/world/${main.worldId}/player/${main.owner?.id}/base/${main.cityId}`}>{main.name}</Link>
                ),
            },
            {
                title: 'Level',
                dataIndex: 'main',
                key: 'level',
                render: (main: Base) => formatNumber(main.level),
                sorter: (a: PlayerStats, b: PlayerStats) => a.main.level - b.main.level,
            },
            {
                title: 'CC',
                dataIndex: 'main',
                key: 'command',
                defaultSortOrder: 'descend' as const,
                render: (main: Base) => Math.floor(main.buildings.commandCenter?.level ?? 0) || '',
                sorter: (a: PlayerStats, b: PlayerStats) =>
                    (a.main.buildings.commandCenter?.level || 0) - (b.main.buildings.commandCenter?.level || 0),
            },
            {
                title: 'Off',
                dataIndex: 'main',
                key: 'off',
                defaultSortOrder: 'descend' as const,
                render: (main: Base) => formatNumber(main.levelOffense),
                sorter: (a: PlayerStats, b: PlayerStats) => a.main.levelOffense - b.main.levelOffense,
            },
            {
                title: 'Def',
                dataIndex: 'main',
                key: 'def',
                render: (main: Base) => formatNumber(main.levelDefense),
                sorter: (a: PlayerStats, b: PlayerStats) => a.main.levelDefense - b.main.levelDefense,
            },
            {
                title: 'Power',
                dataIndex: 'main',
                key: 'power',
                render: (main: Base) => formatNumber(main.info.production.total.power),
                sorter: (a: PlayerStats, b: PlayerStats) =>
                    a.main.info.production.total.power - b.main.info.production.total.power,
            },
            {
                title: 'Cost',
                dataIndex: 'main',
                key: 'mainCost',
                render: (main: Base) => formatNumber(main.info.cost.total.total),
                sorter: (a: PlayerStats, b: PlayerStats) => a.main.info.cost.total.total - b.main.info.cost.total.total,
            },
        ],
    },
    {
        title: 'Research',
        key: 'research',
        render: (stats: PlayerStats) => (
            <ViewResearch faction={stats.main.faction} upgrades={stats.upgrades} style="square" />
        ),
    },
    {
        title: 'Updated',
        key: 'updated',
        render: (s: PlayerStats) => timeSince(s.updatedAt),
        sorter: (a: PlayerStats, b: PlayerStats) => a.updatedAt - b.updatedAt,
    },
];
export class ViewAlliance extends React.Component<AllianceProps, AllianceState> {
    state: AllianceState = { info: [], state: ComponentLoading.Ready, alliance: { id: -1, name: '' }, worldId: -1 };
    static tableCss = style({ width: '100%' });

    componentDidMount() {
        const { worldId, allianceId } = this.props.match.params;
        this.loadAlliance(Number(worldId) as WorldId, Number(allianceId) as AllianceId);
    }

    async loadAlliance(worldId: WorldId, allianceId: AllianceId) {
        const docId = WorldAllianceId.pack({ worldId, allianceId }) as CompositeId<[WorldId, AllianceId]>;
        this.setState({ info: [], state: ComponentLoading.Loading });

        const results = await Stores.Player.getAllBy({ allianceKey: docId }, 60);

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
        this.setState({ info: Array.from(playerSet.values()), state: ComponentLoading.Done, alliance, worldId });
    }

    get isLoading() {
        return this.state.state == ComponentLoading.Loading;
    }

    render() {
        if (this.state == null || this.isLoading) {
            return (
                <Table
                    className={ViewAlliance.tableCss}
                    rowKey="id"
                    dataSource={this.state.info}
                    columns={AllianceColumns}
                    pagination={false}
                    bordered
                    loading={this.isLoading}
                    size="small"
                />
            );
        }
        return (
            <React.Fragment>
                <StBreadCrumb worldId={this.state.worldId} alliance={this.state.alliance} />
                <Table
                    className={ViewAlliance.tableCss}
                    rowKey="id"
                    dataSource={this.state.info}
                    columns={AllianceColumns}
                    pagination={false}
                    bordered
                    loading={this.isLoading}
                    size="small"
                />
                <BackTop></BackTop>
            </React.Fragment>
        );
    }
}
