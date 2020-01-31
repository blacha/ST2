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
import Spin from 'antd/es/spin';
import Divider from 'antd/es/divider';

export interface PlayerStats {
    id: string;
    name: string;
    bases: Base[];
    production: GameResources;
    main: Base;
    updatedAt: number;
    upgrades: Partial<Record<GameDataUnitId, GameDataResearchLevel>>;
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
