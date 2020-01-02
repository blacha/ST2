import React = require('react');
import { Faction } from '@st/shared';
import { style } from 'typestyle';
import { FlexCenter } from '../css.util';

import * as IconNod from '../../static/icon/icon_nod.png';
import * as IconGdi from '../../static/icon/icon_gdi.png';
import * as IconFor from '../../static/icon/icon_gdi.png';

export function getFactionIcon(faction: Faction) {
    if (faction == Faction.Gdi) {
        return IconGdi;
    }
    if (faction == Faction.Nod) {
        return IconNod;
    }
    return IconFor;
}

export interface FactionNameProps {
    faction: Faction;
    name: string;
}
export class FactionName extends React.Component<FactionNameProps> {
    cssContainer = style({ ...FlexCenter });
    cssName = style({ marginLeft: 8 });

    render() {
        return (
            <div className={this.cssContainer}>
                <FactionIcon faction={this.props.faction} />
                <span className={this.cssName}>{this.props.name}</span>
            </div>
        );
    }
}

export interface FactionProps {
    faction: Faction;
    size?: number;
}

export class FactionIcon extends React.Component<FactionProps> {
    render() {
        return <img src={getFactionIcon(this.props.faction)} width={`${this.props.size ?? 24}px`} />;
    }
}
