import React = require('react');
import { GameDataResearchLevel, GameDataUnitId } from '@cncta/clientlib';
import { Duration } from '@cncta/util';
import { Base, formatNumber, GameResources } from '@st/shared';
import 'antd/dist/antd.css';
import Icon from 'antd/es/icon';
import { Link } from 'react-router-dom';
import { timeSince } from '../time.util';
import { FactionIcon } from '../util/faction';
import { ViewResearch } from '../util/research';
import Tooltip from 'antd/es/tooltip';

export interface PlayerStats {
    id: string;
    name: string;
    bases: Base[];
    production: GameResources;
    main: Base;
    updatedAt: number;
    cost: GameResources;
    upgrades: Partial<Record<GameDataUnitId, GameDataResearchLevel>>;
}

export function getDiffIcon(updatedAt: number) {
    const dateDiff = Date.now() - updatedAt;

    if (dateDiff > Duration.hours(6)) {
        return <Icon type="exclamation-circle" theme="twoTone" twoToneColor="#eb2f96" />;
    }
    if (dateDiff > Duration.OneHour) {
        return <Icon type="info-circle" theme="twoTone" />;
    }

    return <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />;
}

function allianceSorter(cb: (a: PlayerStats, b: PlayerStats) => number) {
    return function sortMe(a: PlayerStats, b: PlayerStats): number {
        const res = cb(a, b);
        if (res == 0) {
            return a.cost.total - b.cost.total;
        }
        return res;
    };
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
        sorter: allianceSorter((a: PlayerStats, b: PlayerStats) => a.name.localeCompare(b.name)),
        ellipsis: true,
        width: 150,
    },
    {
        title: 'F',
        dataIndex: 'main',
        key: 'faction',
        width: 50,
        render: (main: Base) => <FactionIcon faction={main.faction} />,
        sorter: allianceSorter((a: PlayerStats, b: PlayerStats) =>
            a.main.faction.name.localeCompare(b.main.faction.name),
        ),
    },
    {
        title: 'B#',
        dataIndex: 'bases',
        key: 'bases',
        render: (bases: Base[]) => bases.length,
        sorter: allianceSorter((a: PlayerStats, b: PlayerStats) => a.bases.length - b.bases.length),
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
                sorter: allianceSorter(
                    (a: PlayerStats, b: PlayerStats) => a.production.tiberium - b.production.tiberium,
                ),
            },
            {
                title: 'Crystal',
                dataIndex: 'production',
                key: 'crystal',
                render: (production: GameResources) => formatNumber(production.crystal),
                sorter: allianceSorter((a: PlayerStats, b: PlayerStats) => a.production.crystal - b.production.crystal),
            },
            {
                title: 'Credits',
                dataIndex: 'production',
                key: 'credits',
                render: (production: GameResources) => formatNumber(production.credits),
                sorter: allianceSorter((a: PlayerStats, b: PlayerStats) => a.production.credits - b.production.credits),
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
                    <Link to={`/world/${main.worldId}/player/${main.owner?.id}/city/${main.cityId}`}>{main.name}</Link>
                ),
                width: 150,
                ellipsis: true,
            },
            {
                title: 'Level',
                dataIndex: 'main',
                key: 'level',
                render: (main: Base) => formatNumber(main.level),
                sorter: allianceSorter((a: PlayerStats, b: PlayerStats) => a.main.level - b.main.level),
                width: 85,
            },
            {
                title: 'CC',
                dataIndex: 'main',
                key: 'command',
                defaultSortOrder: 'descend' as const,
                render: (main: Base) => Math.floor(main.buildings.commandCenter?.level ?? 0) || '',
                sorter: allianceSorter(
                    (a: PlayerStats, b: PlayerStats) =>
                        (a.main.buildings.commandCenter?.level || 0) - (b.main.buildings.commandCenter?.level || 0),
                ),
                width: 70,
            },
            {
                title: 'Off',
                dataIndex: 'main',
                key: 'off',
                defaultSortOrder: 'descend' as const,
                render: (main: Base) => formatNumber(main.levelOffense),
                sorter: allianceSorter((a: PlayerStats, b: PlayerStats) => a.main.levelOffense - b.main.levelOffense),
            },
            {
                title: 'Def',
                dataIndex: 'main',
                key: 'def',
                render: (main: Base) => formatNumber(main.levelDefense),
                sorter: allianceSorter((a: PlayerStats, b: PlayerStats) => a.main.levelDefense - b.main.levelDefense),
            },
            {
                title: 'Power',
                dataIndex: 'main',
                key: 'power',
                render: (main: Base) => formatNumber(main.info.production.total.power),
                sorter: allianceSorter(
                    (a: PlayerStats, b: PlayerStats) =>
                        a.main.info.production.total.power - b.main.info.production.total.power,
                ),
            },
            {
                title: 'Cost',
                dataIndex: 'main',
                key: 'mainCost',
                render: (main: Base) => formatNumber(main.info.cost.total.total),
                sorter: allianceSorter(
                    (a: PlayerStats, b: PlayerStats) => a.main.info.cost.total.total - b.main.info.cost.total.total,
                ),
            },
        ],
    },
    {
        title: 'Research',
        key: 'research',
        render: (stats: PlayerStats) => (
            <ViewResearch faction={stats.main.faction} upgrades={stats.upgrades} style="square" />
        ),
        width: 180,
    },
    {
        title: '',
        key: 'updated',
        render: (s: PlayerStats) => {
            const title = 'Last updated ' + timeSince(s.updatedAt) + ' ago';

            return <Tooltip title={title}>{getDiffIcon(s.updatedAt)}</Tooltip>;
        },
        sorter: allianceSorter((a: PlayerStats, b: PlayerStats) => a.updatedAt - b.updatedAt),
        width: 32,
    },
];
