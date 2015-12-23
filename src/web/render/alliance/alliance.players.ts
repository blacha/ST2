import {ParseAllianceObject} from "../../../lib/objects/alliance";
import {ParsePlayerObject} from "../../../lib/objects/player";

import {ParseWebUtil} from '../parse';
import {Log} from "../../../lib/log/log";
import {ParseWorldObject} from "../../../lib/objects/world";
import {buildTable, ScoreCol} from  './alliance.table';
import {AllianceTableCol} from "./alliance.table.col";
import * as Layout from '../layout/layout';
import * as PlayerUtil from './player.util';

var $log = Log.child({route: 'AlliancePlayers'});

export class AlliancePlayers {
    private alliance:_mithril.MithrilProperty<ParseAllianceObject>;
    private players:_mithril.MithrilProperty<ParsePlayerObject[]>;
    private worldID:number;

    public currentSort:AllianceTableCol;

    constructor() {
        this.currentSort = ScoreCol;
        this.alliance = <any>m.prop();
        this.players = m.prop([]);
        this.worldID = parseInt(m.route.param('world'), 10);
        $log.info({world: this.worldID, param: m.route.param('world')}, 'invalid worldID');

        if (this.worldID == null || isNaN(this.worldID)) {
            $log.info({world: this.worldID, param: m.route.param('world')}, 'invalid worldID');
        }

        ParseWebUtil.query('Alliance', {world: this.worldID}, $log).then((data) => {

            this.alliance(data.results[0]);
            if (this.alliance() == null) {
                $log.info(data, 'Alliance not found');
            }
        });

        ParseWebUtil.query('Player', {world: this.worldID}, $log).then((data) => {
            data.results.forEach(PlayerUtil.getStats);

            this.players(data.results.sort(this.sortPlayers.bind(this)));
        });
    }

    view() {
        if (this.alliance() == null) {
            return;
        }
        if (this.players().length === 0) {
            return;
        }
        $log.info('render');
        //$log.info({alliance: this.alliance(), players: this.players()});

        return Layout.createLayout(null, [
            m('div.AlliancePlayer',
                buildTable(this.players(), this)
            )
        ]);
    }

    setSortCol(col) {
        console.log('set-sort', col, this.currentSort);
        if (this.currentSort === col) {
            this.currentSort.swapSortOrder();
        } else {
            this.currentSort = col;
            this.currentSort.resetSortOrder();
        }

        var sorted = this.players().sort(this.sortPlayers.bind(this));
        this.players(sorted);
    }

    sortPlayers(a:ParsePlayerObject, b:ParsePlayerObject) {
        var valA = this.currentSort.getSortValue(a);
        var valB = this.currentSort.getSortValue(b);

        console.log('sort', valA, valB);
        if (valA === valB) {
            return 0;
        }

        if (valA > valB) {
            return this.currentSort.order;
        }

        return -1 * this.currentSort.order;
    }

    static controller() {
        return new AlliancePlayers();
    }

    static view(ctrl:AlliancePlayers) {
        return ctrl.view();
    }
}