import {AllianceTableCol} from "./alliance.table.col";
import {ParsePlayerObject} from "../../../lib/objects/player";
import * as Format from '../format';
import * as TableFormat from './alliance.table.format';
import {AlliancePlayers} from "./alliance.players";

export var ScoreCol = new AllianceTableCol('Score', 'score', {formatter: Format.formatNumber});
var RankCol = new AllianceTableCol('Rank', 'rank');
var NameCol = new AllianceTableCol('Player', 'name', {
    formatter: function (val) {
        var currentWorld = m.route.param('world');
        var url = `/alliance/${currentWorld}/${val}`;
        return m('a', {
            href: '#',
            onclick: function() {
                m.route(url);
                return false;
            }
        }, val);
    }
});

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

var RPCol = new AllianceTableCol('RP', 'rp', {formatter: Format.formatNumber});
var ResearchCol = new AllianceTableCol('Research', 'research', {formatter: Format.formatResearch, sorter: Format.sumResearch });

export var BIGGEST_COLS = [
    ScoreCol,
    TibProCol,
    CryProCol,
    CreProCol,
    MainOCol,
    MainDCol,
    MainPowCol,
    MainRTCol,
    RPCol,
    CommandCol
];

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
    RPCol,
    ResearchCol,
    SubCol,
    UpdatedAt
];

export function buildTable(data:ParsePlayerObject[], ctrl:AlliancePlayers) {
    return m('table.Table', [
        m('thead.Table-Head', buildHeader(ctrl)),
        m('tbody', data.map(buildRow.bind(null, ctrl)))
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
            onclick: function () {
                ctrl.setSortCol(col)
            }
        }, output));
    });

    return cells;
}

function buildRow(ctrl:AlliancePlayers, data:ParsePlayerObject) {
    var cells = [];
    TABLE_COLS.forEach(function (col) {
        if (col.enabled == false) {
            return;
        }

        var classNames = ['Table-Cell', `Table-Cell--${col.key}`];
        var value = col.getValue(data);

        if(ctrl.isBiggestValue(col.key, parseFloat(col.getSortValue(data))) ) {
            classNames.push('Table-Cell--Biggest');
        }
        cells.push(m('td', { className: classNames.join(' ') }, [value]))
    });

    return m(`tr.Table-Row.Table-Row--${data.player}`, cells);
}