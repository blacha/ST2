import {TableCol} from "./table.col";

export interface TableController {
    currentSort: TableCol;
    isBiggestValue:(key:string, value:number) => boolean;
    setSortCol: (col:TableCol) => void;
}


export function renderTable(cols:TableCol[], data:any[], ctrl:TableController) {
    return m('table.Table', [
        m('thead.Table-Head', viewHeader(cols, data, ctrl)),
        m('tbody', data.map((datum) => {
            return viewRow(cols, datum, ctrl)
        }))
    ]);
}


function viewHeader(cols:TableCol[], data:any[], ctrl:TableController) {
    var cells = [];
    cols.forEach((col) => {
        if (col.enabled == false) {
            return;
        }
        var className = ['TableHead-Cell'];
        className.push(`Table-Cell--${col.key}`);
        var output = [];
        output.push(m('span.TableCell-Text', col.header));

        if (ctrl.currentSort === col) {
            className.push('Table-Cell--Sort');
            if (col.order > 0) {
                output.push(m('i.material-icons', 'keyboard_arrow_up'));
                className.push('Table-Cell--Sort-Up');
            } else {
                output.push(m('i.material-icons', 'keyboard_arrow_down'));
                className.push('Table-Cell--Sort-Down');
            }
        }


        cells.push(m('th', {
            className: className.join(' '),
            onclick: () => {
                ctrl.setSortCol(col)
            }
        }, output));
    });

    return cells;
}


function viewRow(cols:TableCol[], data:any, ctrl:TableController) {
    var cells = [];
    cols.forEach((col) => {
        if (col.enabled == false) {
            return;
        }

        var classNames = ['Table-Cell', `Table-Cell--${col.key}`];
        var value = col.getValue(data, ctrl);

        if (ctrl.isBiggestValue(col.key, parseFloat(col.getSortValue(data, ctrl)))) {
            classNames.push('Table-Cell--Biggest');
        }
        cells.push(m('td', {className: classNames.join(' ')}, [value]))
    });

    return m(`tr.Table-Row.Table-Row--${data.player}`, cells);
}