import {AllianceTableCol} from "./alliance.table.col";
import {ParsePlayerObject} from "../../../lib/objects/player";
import * as Format from '../format';

var RankCol = new AllianceTableCol('Rank', 'rank');
var ScoreCol = new AllianceTableCol('Score', 'score', {formatter: Format.formatNumber});
var NameCol = new AllianceTableCol('Player', 'name');

export var TABLE_COLS = [
    RankCol,
    ScoreCol,
    NameCol
];

export function buildTable(data:ParsePlayerObject[]) {
    return m('table', [
        m('thead', buildHeader()),
        m('tbody', data.map(buildRow))
    ])
}

function buildHeader() {
    var cells = [];
    TABLE_COLS.forEach(function (col) {
        if (col.enabled == false) {
            return;
        }
        var className = ['Table-Head'];
        className.push(`Table-Cell--${col.key}`);


        cells.push(m('th', {
            className: className.join(' ')
        }, [col.header]));
    });

    return cells;
}

function buildRow(data:ParsePlayerObject) {
    var cells = [];
    TABLE_COLS.forEach(function (col) {
        if (col.enabled == false) {
            return;
        }

        var value = col.getValue(data);
        console.log('buildRow', col.key, value);
        cells.push(m(`td.Table-Cell.Table-Cell--${col.key}`, [value]))
    });

    return m(`tr.Table-Row.Table-Row--${data.player}`, cells);
}