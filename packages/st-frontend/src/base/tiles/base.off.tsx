import React = require('react');
import { BaseCss } from '../base';
import { ViewBaseItem } from './base.tile';
import { viewRow } from './base.row';
import { Base } from '@st/shared';
import { BaseX, BaseY } from '@cncta/clientlib';

export class ViewBaseOff extends React.Component<{ base: Base; size: number }> {
    render() {
        const output = [];
        for (let y = BaseY.MaxDef; y < BaseY.Max; y++) {
            const row = [];
            for (let x = 0; x < BaseX.Max; x++) {
                row.push(<ViewBaseItem x={x} y={y} base={this.props.base} size={this.props.size} key={`${x}-${y}`} />);
            }
            output.push(viewRow(y, row));
        }

        return <div className={BaseCss.Base}>{output}</div>;
    }
}
