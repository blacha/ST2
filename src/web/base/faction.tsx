import { Faction } from '../../lib/data/faction';
import React = require('react');

export function viewFaction(faction: Faction) {
    return <div className={`Faction Faction-${faction.name}`}></div>;
}
