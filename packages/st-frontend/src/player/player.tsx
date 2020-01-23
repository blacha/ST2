import { StCity } from '@cncta/util';
import {
    Base,
    BaseBuilder,
    formatNumber,
    GameResources,
    Id,
    mergeBaseUpgrade,
    NumberPacker,
    CompositeId,
} from '@st/shared';
import BackTop from 'antd/es/back-top';
import Divider from 'antd/es/divider';
import Table from 'antd/es/table';
import { Link, RouteComponentProps } from 'react-router-dom';
import { PlayerStats } from '../alliance/alliance';
import { ComponentLoading } from '../base/base';
// import { FireStorePlayer } from '../firebase';
import { timeSince } from '../time.util';
import { StBreadCrumb } from '../util/breacrumb';
import { FactionName } from '../util/faction';
import { ViewResearch } from '../util/research';
import React = require('react');
import { WorldId, PlayerId } from '@cncta/clientlib/src';
import { Stores } from '@st/model';

type PlayerProps = RouteComponentProps<{ worldId: string; playerId: string }>;

interface PlayerState extends PlayerStats {
    state: ComponentLoading;
}
export const PlayerColumns = [
    {
        title: '#',
        key: 'index',
        render: (main: Base, record: any, index: number) => index + 1,
        width: 35,
    },
    {
        title: 'Name',
        dataIndex: '',
        key: 'name',
        render: (base: Base) => (
            <Link to={`/world/${base.worldId}/player/${base.owner?.id}/base/${base.cityId}`}>{base.name}</Link>
        ),
        sorter: (a: Base, b: Base) => a.name.localeCompare(b.name),
    },
    {
        title: 'Level',
        dataIndex: '',
        key: 'level',
        render: (main: Base) => formatNumber(main.level),
        sorter: (a: Base, b: Base) => a.level - b.level,
    },
    {
        title: 'Production',
        key: 'production',
        children: [
            {
                title: 'Tiberium',
                dataIndex: 'info.production.total',
                key: 'tiberium',
                render: (production: GameResources) => formatNumber(production.tiberium),
                sorter: (a: Base, b: Base) => a.info.production.total.tiberium - b.info.production.total.tiberium,
            },
            {
                title: 'Crystal',
                dataIndex: 'info.production.total',
                key: 'crystal',
                render: (production: GameResources) => formatNumber(production.crystal),
                sorter: (a: Base, b: Base) => a.info.production.total.crystal - b.info.production.total.crystal,
            },
            {
                title: 'Credits',
                dataIndex: 'info.production.total',
                key: 'credits',
                render: (production: GameResources) => formatNumber(production.credits),
                sorter: (a: Base, b: Base) => a.info.production.total.credits - b.info.production.total.credits,
            },
            {
                title: 'Power',
                dataIndex: 'info.production.total',
                key: 'power',
                render: (production: GameResources) => formatNumber(production.power),
                sorter: (a: Base, b: Base) => a.info.production.total.power - b.info.production.total.power,
            },
        ],
    },
    {
        title: 'Army',
        key: 'army',
        children: [
            {
                title: 'CC',
                dataIndex: '',
                key: 'command',
                render: (main: Base) => Math.floor(main.buildings.commandCenter?.level ?? 0) || '',
                sorter: (a: Base, b: Base) =>
                    (a.buildings.commandCenter?.level || 0) - (b.buildings.commandCenter?.level || 0),
            },
            {
                title: 'Off',
                dataIndex: '',
                key: 'off',
                render: (main: Base) => formatNumber(main.levelOffense),
                sorter: (a: Base, b: Base) => a.levelOffense - b.levelOffense,
            },
            {
                title: 'Def',
                dataIndex: '',
                key: 'def',
                render: (main: Base) => formatNumber(main.levelDefense),
                sorter: (a: Base, b: Base) => a.levelDefense - b.levelDefense,
            },
        ],
    },
    {
        title: 'Cost',
        key: 'cost',
        children: [
            {
                title: 'Base',
                dataIndex: '',
                key: 'baseCost',
                defaultSortOrder: 'descend' as const,
                render: (main: Base) => formatNumber(main.info.cost.base.total),
                sorter: (a: Base, b: Base) => a.info.cost.base.total - b.info.cost.base.total,
            },
            {
                title: 'Off',
                dataIndex: '',
                key: 'offCost',
                render: (main: Base) => formatNumber(main.info.cost.off.total),
                sorter: (a: Base, b: Base) => a.info.cost.off.total - b.info.cost.off.total,
            },
            {
                title: 'Def',
                dataIndex: '',
                key: 'defCost',
                render: (main: Base) => formatNumber(main.info.cost.def.total),
                sorter: (a: Base, b: Base) => a.info.cost.def.total - b.info.cost.def.total,
            },
        ],
    },
    {
        title: 'Updated',
        dataIndex: '',
        key: 'updated',
        render: (base: Base) => timeSince(base.updatedAt),
        sorter: (a: Base, b: Base) => a.updatedAt - b.updatedAt,
    },
];

export class ViewPlayer extends React.Component<PlayerProps, PlayerState> {
    state: PlayerState = { state: ComponentLoading.Ready } as any;

    componentDidMount() {
        const { worldId, playerId } = this.props.match.params;
        this.loadPlayer(Number(worldId) as WorldId, Number(playerId) as PlayerId);
    }

    async loadPlayer(worldId: WorldId, playerId: PlayerId) {
        const docId = NumberPacker.pack([worldId, playerId]) as CompositeId<[WorldId, PlayerId]>;
        this.setState({ state: ComponentLoading.Loading });
        const result = await Stores.Player.getOrCreate(docId);
        if (!result.isValid) {
            this.setState({ state: ComponentLoading.Failed });
            return;
        }

        const cities = result.cities;
        const bases = Object.values(cities).map(c => BaseBuilder.load(c));
        const current: PlayerStats = {
            id: Id.generate(),
            name: '',
            bases: [],
            production: new GameResources(),
            main: bases[0],
            updatedAt: bases[0].updatedAt,
            upgrades: {},
        };

        for (const base of bases) {
            if (base.owner == null) {
                continue;
            }
            current.name = base.owner.name;

            if (current.main.levelOffense < base.levelOffense) {
                current.main = base;
            }
            current.bases.push(base);
            current.production.add(base.info.production.total);
            mergeBaseUpgrade(base.upgrades, current.upgrades);
        }

        this.setState({ ...current, state: ComponentLoading.Done });
    }

    get isLoading() {
        return this.state.state == ComponentLoading.Loading;
    }

    render() {
        if (this.state == null || this.isLoading || this.state.main == null) {
            return <div>Loading...</div>;
        }
        const { bases } = this.state;
        return (
            <React.Fragment>
                <StBreadCrumb
                    worldId={this.state.main.worldId}
                    alliance={this.state.main.alliance}
                    player={this.state.main.owner}
                />
                <Divider>
                    <FactionName name={this.state.name} faction={this.state.main.faction} />
                </Divider>
                <Table
                    rowKey="id"
                    dataSource={bases}
                    columns={PlayerColumns}
                    pagination={false}
                    bordered
                    loading={this.isLoading}
                    size="small"
                />
                <Divider>Research</Divider>
                <ViewResearch faction={this.state.main.faction} upgrades={this.state.upgrades} style="icon" />
                <BackTop></BackTop>
            </React.Fragment>
        );
    }
}
