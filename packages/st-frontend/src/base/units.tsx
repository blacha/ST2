import React = require('react');
import { GameDataUnitId } from '@cncta/clientlib';
import { style } from 'typestyle';
import * as images from '../../static/images/*.png';
import { FlexCenter } from '../css.util';
import * as IconStar from '../../static/icon/IconStar.png';

export interface UnitIconProps {
    unitId: GameDataUnitId;
}

export class UnitIcon extends React.Component<UnitIconProps> {
    render() {
        const { unitId } = this.props;
        const imageName = images[unitId];

        if (imageName == null) {
            console.error('Missing unit id:' + unitId);
        }
        return <img src={imageName} />;
    }
}

export interface UnitUpgradeIconProps {
    isUpgraded: boolean;
}

export class UnitUpgradeIcon extends React.Component<UnitUpgradeIconProps> {
    cssContainer = style({
        position: 'absolute',
        bottom: '2px',
        right: '2px',
        ...FlexCenter,
        minWidth: '16px',
        minHeight: '16px',
        height: '16px',
        width: '16px',
        borderRadius: '16px',
        backgroundColor: 'rgba(225, 170, 78, 0.25)',
    });
    render() {
        if (!this.props.isUpgraded) {
            return null;
        }

        return (
            <div className={this.cssContainer}>
                <img src={IconStar} width="16px" height="16px" />
            </div>
        );
    }
}
