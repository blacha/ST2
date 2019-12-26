import { Faction } from '../../lib/data/faction';
import React = require('react');
import { style } from 'typestyle';
import { BackgroundImage } from '../css.util';

const FactionCss = style({
    width: '32px',
    height: '32px',
    ...BackgroundImage(75),
});

export function viewFaction(faction: Faction) {
    return <div className={`${FactionCss} Faction-${faction.name}`}></div>;
}
