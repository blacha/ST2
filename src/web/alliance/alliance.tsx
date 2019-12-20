import React = require("react");
import { style } from "typestyle";
import { Base } from "../../lib/base";
import { GameResources } from "../../lib/game.resources";
import { formatNumber } from "../../lib/util";

export const AllianceCss = {
    Table: style({
        width: '100%'
    }),
    Base: style({
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 20%)',
    }),
    TableHeader: style({
        fontWeight: 'bold',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 20%)',
    })
}
export interface PlayerStats {
    bases: Base[];
    production: GameResources;
}

export class ViewAlliance extends React.Component<{}> {
    alliance: Base[];
    byPlayer: Record<string, PlayerStats> = {}

    constructor(props: {}) {
        super(props);
        this.alliance = [];
        for (const base of this.alliance) {
            if (base.owner == null) {
                continue;
            }
            const current = this.byPlayer[base.owner] = this.byPlayer[base.owner] || { bases: [], production: new GameResources() };
            current.bases.push(base);
            current.production.add(base.production.total);
        }
    }

    render() {
        const output = [];
        for (const playerName of Object.keys(this.byPlayer)) {
            const baseInfo = this.byPlayer[playerName];

            output.push(
                <div className={AllianceCss.Base} key={playerName}>
                    <div>{playerName}</div>
                    <div>{formatNumber(baseInfo.production.tiberium)}</div>
                    <div>{formatNumber(baseInfo.production.crystal)}</div>
                    <div>{formatNumber(baseInfo.production.power)}</div>
                    <div>{formatNumber(baseInfo.production.credits)}</div>
                </div>
            )
        }

        return <div className={AllianceCss.Table}>
            <div  className={AllianceCss.TableHeader}>
                    <div>Owner</div>
                    <div>Tiberium</div>
                    <div>Crystal</div>
                    <div>Power</div>
                    <div>Credits</div>
            </div>
            {output}
        </div>;

    }
}