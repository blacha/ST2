import {AllianceTableCol} from "./alliance.table.col";
import {ParsePlayerObject} from "../../../lib/objects/player";
import * as Format from '../format';
import * as TableFormat from './alliance.table.format';
import {AlliancePlayers} from "./alliance.players";

export var ScoreCol = new AllianceTableCol('Score', 'score', {formatter: Format.formatNumber});
var RankCol = new AllianceTableCol('Rank', 'rank');
var NameCol = new AllianceTableCol('Player', 'name');
var CommandCol = new AllianceTableCol('CP', 'command', {formatter: TableFormat.formatCP, sort: 'command.current'});
var SubCol = new AllianceTableCol('Sub', 'sub');
var FactionCol = new AllianceTableCol('F', 'faction', {formatter: TableFormat.formatFaction});
var UpdatedAt = new AllianceTableCol('Updated', 'updatedAt', {formatter: TableFormat.formatTimeAgo});

var TibProCol = new AllianceTableCol('Tib/h', '$stats.total.production.tiberium', {formatter: Format.formatNumber});
var CryProCol = new AllianceTableCol('Cry/h', '$stats.total.production.crystal', {formatter: Format.formatNumber});
var CreProCol = new AllianceTableCol('$/h', '$stats.total.production.credits', {formatter: Format.formatNumber});

var MainOCol = new AllianceTableCol('Off', '$stats.main.offense', {formatter: Format.formatNumber});
var MainDCol = new AllianceTableCol('Def', '$stats.main.defense', {formatter: Format.formatNumber});
var MainPowCol = new AllianceTableCol('Pow/h', '$stats.main.production.power', {formatter: Format.formatNumber});
var MainRTCol = new AllianceTableCol('RT', '$stats.main.repair.time', {formatter: Format.formatHours});


export var TABLE_COLS = [
    ScoreCol,
    FactionCol,
    NameCol,
    TibProCol,
    CryProCol,
    CreProCol,
    MainOCol,
    MainDCol,
    MainPowCol,
    MainRTCol,
    CommandCol,
    SubCol,
    UpdatedAt
];

export function buildTable(data:ParsePlayerObject[], ctrl:AlliancePlayers) {
    return m('table.Table', [
        m('thead.Table-Head', buildHeader(ctrl)),
        m('tbody', data.map(buildRow))
    ])
}

function buildHeader(ctrl:AlliancePlayers) {
    var cells = [];
    TABLE_COLS.forEach(function (col) {
        if (col.enabled == false) {
            return;
        }
        var className = ['TableHead-Cell'];
        className.push(`Table-Cell--${col.key}`);

        if (ctrl.currentSort === col) {
            className.push('Table-Cell--Sort');
            if (col.order > 0) {
                className.push('Table-Cell--Sort-Up');
            } else {
                className.push('Table-Cell--Sort-Down');
            }
        }

        cells.push(m('th', {
            className: className.join(' '),
            onclick: function() {
                ctrl.setSortCol(col)
            }
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
        cells.push(m(`td.Table-Cell.Table-Cell--${col.key}`, [value]))
    });

    return m(`tr.Table-Row.Table-Row--${data.player}`, cells);
}