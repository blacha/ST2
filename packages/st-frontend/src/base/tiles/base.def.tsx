import React = require('react');
import { BaseX, BaseY } from '@cncta/clientlib';
import { Base } from '@st/shared';
import { BaseCss } from '../base';
import { viewRow } from './base.row';
import { ViewBaseItem } from './base.tile';

export class ViewBaseDef extends React.Component<{ base: Base; size: number }> {
    render() {
        const output = [];
        for (let y = BaseY.MaxBuilding; y < BaseY.MaxDef; y++) {
            const row = [];
            for (let x = 0; x < BaseX.Max; x++) {
                row.push(<ViewBaseItem x={x} y={y} base={this.props.base} size={this.props.size} key={`${x}-${y}`} />);
            }
            output.push(viewRow(y, row));
        }

        return <div className={BaseCss.BaseDef}>{output}</div>;
    }
}
