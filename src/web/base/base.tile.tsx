import React = require('react');
import { style } from 'typestyle';
import { Base } from '../../lib/base';
import { Tile } from '../../lib/base/tile';
import { BaseCss } from './base';

export class ViewBaseItem extends React.Component<{ x: number; y: number; base: Base; size: number }> {
    render() {
        const { x, y, base, size } = this.props;
        const classNames = [BaseCss.Grid.Base];
        const tile = base.getTile(x, y);
        if (tile == Tile.Crystal) {
            classNames.push(BaseCss.Grid.Crystal);
        } else if (tile == Tile.Tiberium) {
            classNames.push(BaseCss.Grid.Tiberium);
        } else if (tile == Tile.Oil) {
            classNames.push(BaseCss.Grid.Oil);
        } else if (tile == Tile.Swamp) {
            classNames.push(BaseCss.Grid.Swamp);
        } else if (tile == Tile.Woods) {
            classNames.push(BaseCss.Grid.Woods);
        } else if (tile == Tile.Scrub) {
            classNames.push(BaseCss.Grid.Scrub);
        }

        if (size !== 32) {
            classNames.push(style({ width: size + 'px', height: size + 'px' }));
        } else {
            classNames.push(BaseCss.Size48);
        }

        const building = base.getBase(x, y);
        if (building == null) {
            return <div className={classNames.join(' ')} title={tile.name} />;
        }

        return (
            <div className={classNames.join(' ')} title={building.type.data.display + ` (${building.level})`}>
                <div className={BaseCss.Cell.Level}>{building.level}</div>
                <div>{building.type.code}</div>
            </div>
        );
    }
}
