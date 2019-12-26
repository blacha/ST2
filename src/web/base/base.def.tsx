import React = require('react');
import { Base } from '../../lib/base/base';
import { BaseCss } from './base';
import { ViewBaseItem } from './base.tile';
import { style } from 'typestyle';
import { viewRow } from './base.row';

export class ViewBaseDef extends React.Component<{ base: Base; size: number }> {
    render() {
        const output = [];
        for (let y = Base.MaxBaseY; y < Base.MaxDefY; y++) {
            const row = [];
            for (let x = 0; x < Base.MaxX; x++) {
                row.push(<ViewBaseItem x={x} y={y} base={this.props.base} size={this.props.size} key={`${x}-${y}`} />);
            }
            output.push(viewRow(y, row));
        }

        return <div className={BaseCss.BaseDef}>{output}</div>;
    }
}
