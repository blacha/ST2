import React = require('react');
import { style } from 'typestyle';

const BaseRowCss = style({ display: 'flex' });

export function viewRow(x: number, rows: any[]) {
    return (
        <div className={BaseRowCss + ` BaseRow-${x}`} key={`row-${x}`}>
            {...rows}
        </div>
    );
}
