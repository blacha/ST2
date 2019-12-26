import React = require('react');
import { Base } from '../../lib/base';
import { BaseCss } from './base';
import { ViewBaseItem } from './base.tile';
import { style } from 'typestyle';
import { viewRow } from './base.row';

const BaseRowCss = style({ display: 'flex' });

export class ViewBaseDef extends React.Component<{ base: Base; size: number }> {
    render() {
        const output = [];
        for (let x = 0; x < Base.MaxX; x++) {
            const row = [];
            for (let y = Base.MaxBaseY; y < Base.MaxDefY; y++) {
                row.push(<ViewBaseItem x={x} y={y} base={this.props.base} size={this.props.size} key={`${x}-${y}`} />);
            }
            output.push(viewRow(x, row));
        }

        return <div className={BaseCss.BaseDef}>{output}</div>;
    }
}
