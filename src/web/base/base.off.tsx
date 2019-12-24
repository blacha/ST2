import React = require('react');
import { Base } from '../../lib/base';
import { BaseCss } from './base';
import { ViewBaseItem } from './base.tile';

export class ViewBaseOff extends React.Component<{ base: Base; size: number }> {
    render() {
        const output = [];
        for (let x = 0; x < Base.MaxX; x++) {
            const row = [];
            for (let y = Base.MaxDefY; y < Base.MaxY; y++) {
                row.push(<ViewBaseItem x={x} y={y} base={this.props.base} size={this.props.size} key={`${x}-${y}`} />);
            }
            output.push(
                <div className={`BaseRow-${x}`} key={`row-${x}`}>
                    {...row}
                </div>,
            );
        }

        return <div className={BaseCss.Base}>{output}</div>;
    }
}
