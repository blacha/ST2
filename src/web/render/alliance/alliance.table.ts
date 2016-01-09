import {AllianceTableCol} from "./alliance.table.col";
import {ParseJSONPlayerObject} from "../../../lib/objects/player";
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
            onclick: function () {
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
var MainCost = new AllianceTableCol('Base Cost', '$stats.main.$cost', {
    formatter: Format.formatTotalResources,
    sorter: function(data:ParseJSONPlayerObject) {
        return data.$stats.main.$cost.total();
    }
});

var RPCol = new AllianceTableCol('RP', 'rp', {formatter: Format.formatNumber});
var ResearchCol = new AllianceTableCol('Research', 'research', {
    formatter: Format.formatResearch,
    sorter: Format.sumResearch
});

export var BIGGEST_COLS = [
    ScoreCol,
    TibProCol,
    CryProCol,
    CreProCol,
    MainOCol,
    MainDCol,
    MainPowCol,
    MainRTCol,
    MainCost,
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
    //MainRTCol,
    //CommandCol,
    MainCost,
    RPCol,
    ResearchCol,
    SubCol,
    UpdatedAt
];


export class AllianceTable {

    private ctrl:AlliancePlayers;

    constructor(ctrl:AlliancePlayers) {
        this.ctrl = ctrl;
    }

    view(data:ParseJSONPlayerObject[]) {
        return m('table.Table', [
            m('thead.Table-Head', this.viewHeader()),
            m('tbody', data.map(this.viewRow.bind(this)))
        ]);
    }

    viewHeader() {
        var cells = [];
        TABLE_COLS.forEach((col) => {
            if (col.enabled == false) {
                return;
            }
            var className = ['TableHead-Cell'];
            className.push(`Table-Cell--${col.key}`);
            var output = [];
            output.push(m('span.TableCell-Text', col.header));

            if (this.ctrl.currentSort === col) {
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
                    this.ctrl.setSortCol(col)
                }
            }, output));
        });

        return cells;
    }

    viewRow(data:ParseJSONPlayerObject) {
        var cells = [];
        TABLE_COLS.forEach((col) => {
            if (col.enabled == false) {
                return;
            }

            var classNames = ['Table-Cell', `Table-Cell--${col.key}`];
            var value = col.getValue(data);

            if (this.ctrl.isBiggestValue(col.key, parseFloat(col.getSortValue(data)))) {
                classNames.push('Table-Cell--Biggest');
            }
            cells.push(m('td', {className: classNames.join(' ')}, [value]))
        });

        return m(`tr.Table-Row.Table-Row--${data.player}`, cells);
    }


}