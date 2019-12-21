import React = require('react');
import { style } from 'typestyle';
import { Base } from '../../lib/base';
import { GameResources } from '../../lib/game.resources';
import { formatNumber } from '../../lib/util';
import { BaseBuilder } from '../../lib/base.builder';

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
    bases: Base[];
    production: GameResources;
    main: Base;
}

export class ViewAlliance extends React.Component<{}> {
    alliance: Base[];
    byPlayer:PlayerStats[] = [];

    constructor(props: {}) {
        super(props);
        this.alliance = []; //AllianceData.map(c => BaseBuilder.load(c as any))
        const playerSet = new Map<string, PlayerStats>();
        for (const base of this.alliance) {
            if (base.owner == null) {
                continue;
            }
            let current = playerSet.get(base.owner);
            if (current == null) {
                current = {
                    bases: [],
                    production: new GameResources(),
                    main: base
                }
                playerSet.set(base.owner, current);
            }
            if (current.main.levelOffense < base.levelOffense) {
                current.main = base;
            }
            current.bases.push(base);
            current.production.add(base.production.total);
        }
        this.byPlayer = Array.from(playerSet.values())
    }

    render() {
        const output = [];
        for (const baseInfo of this.byPlayer) {

            output.push(
                <div className={AllianceCss.Base} key={baseInfo.main.id}>
                    <div>{baseInfo.main.owner}</div>
                    <div>{baseInfo.main.name}</div>
                    <div>{baseInfo.main.levelOffense.toFixed(2)}</div>
                    <div>{baseInfo.main.levelDefense.toFixed(2)}</div>
                    <div>{formatNumber(baseInfo.main.production.total.power)}</div>
                    <div>{formatNumber(baseInfo.production.tiberium)}</div>
                    <div>{formatNumber(baseInfo.production.crystal)}</div>
                    <div>{formatNumber(baseInfo.production.power)}</div>
                    <div>{formatNumber(baseInfo.production.credits)}</div>
                </div>,
            );
        }

        return (
            <div className={AllianceCss.Table}>
                <div className={AllianceCss.TableHeader}>
                    <div>Owner</div>
                    <div>Main Base</div>
                    <div>Main O</div>
                    <div>Main D</div>
                    <div>Main Power</div>

                    <div>Tiberium</div>
                    <div>Crystal</div>
                    <div>Power</div>
                    <div>Credits</div>
                </div>
                {output}
            </div>
        );
    }
}
