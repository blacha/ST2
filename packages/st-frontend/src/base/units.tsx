import React = require('react');
import * as images from '../../static/images/*.png';
import { style } from 'typestyle';
import { Buildable } from '@st/shared';

const UnitIconCss = style({ height: '90%', maxWidth: '95%' });

export function viewUnit(unit: Buildable) {
    const imageName = images[unit.type.id];

    if (imageName == null) {
        console.error('Missing unit icon:' + unit.type.name + ' id:' + unit.type.id);
    }
    return <img src={imageName} className={UnitIconCss} />;
}
