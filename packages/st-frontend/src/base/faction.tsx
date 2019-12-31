import React = require('react');
import { style } from 'typestyle';
import { BackgroundImage } from '../css.util';
import { Faction } from '@st/shared';

const FactionCss = style({
    width: '32px',
    height: '32px',
    ...BackgroundImage(75),
});

export function viewFaction(faction: Faction) {
    return <div className={`${FactionCss} Faction-${faction.name}`}></div>;
}
