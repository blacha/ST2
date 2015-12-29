import {ParseAllianceObject} from "../../../lib/objects/alliance";
import {ParsePlayerObject} from "../../../lib/objects/player";

import {ParseWebUtil} from '../parse';
import {Log} from "../../../lib/log/log";
import {ParseWorldObject} from "../../../lib/objects/world";
import {buildTable, ScoreCol} from  './alliance.table';
import {AllianceTableCol} from "./alliance.table.col";
import * as Layout from '../layout/layout';
import * as PlayerUtil from './player.util';
import * as Format from '../format';

var $log = Log.child({route: 'AlliancePlayers'});

export class AlliancePlayers {
    private alliance:_mithril.MithrilProperty<ParseAllianceObject>;
    private players:_mithril.MithrilProperty<ParsePlayerObject[]>;
    private world:_mithril.MithrilProperty<ParseWorldObject>;
    private worldID:number;

    public currentSort:AllianceTableCol;

    constructor() {
        console.log('controller start');
        this.currentSort = ScoreCol;
        this.alliance = <any>m.prop();
        this.world = <any>m.prop();
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

            return ParseWebUtil.query('Player', {world: this.worldID}, $log).then((data) => {
                data.results.forEach(PlayerUtil.getStats.bind(null, this.alliance()));

                this.players(data.results.sort(this.sortPlayers.bind(this)));
            });
        });


        ParseWebUtil.query('World', {world: this.worldID}, $log).then((data) => {
            this.world(data.results[0]);
        })
    }

    view() {
        if (this.alliance() == null) {
            return;
        }
        if (this.players().length === 0) {
            return;
        }
        $log.info('render');

        return Layout.createLayout({
            page: 'Alliance'
        }, [
            m('div.AllianceInfo', this.viewAllianceTitle()),
            m('div.AlliancePlayer',
                buildTable(this.players(), this)
            )
        ]);
    }

    viewAllianceTitle() {
        return [
            m('div.AllianceInfo-Title', [
                    m('div.AllianceInfo-Name', this.alliance().name),
                    m('a.AllianceInfo-World', {
                        href: '#',
                        onclick: m.route.bind(m.route, '/alliance'),
                        title: 'Change world'
                    }, this.world().name),
                ]
            ),
            m('div.AllianceInfo-Stats.AllianceStats', this.viewAllianceStats())
        ]
    }

    viewAllianceStats() {
        var alliance = this.alliance();
        console.log(alliance);
        return [
            m('div.AllianceStats-Production', [
                m('div.AllianceStats-Stat.AllianceStats-Tib',
                    AlliancePlayers.viewAllianceStat('Tib', Format.formatNumber(alliance.bonus.tiberium))
                ),
                m('div.AllianceStats-Stat.AllianceStats-Crystal',
                    AlliancePlayers.viewAllianceStat('Cry', Format.formatNumber(alliance.bonus.crystal))
                ),
                m('div.AllianceStats-Stat.AllianceStats-Power',
                    AlliancePlayers.viewAllianceStat('Pow', Format.formatNumber(alliance.bonus.power))
                )
            ]),
            m('div.AllianceStats-Attack', [
                m('div.AllianceStats-Stat.AllianceStats-Def',
                    AlliancePlayers.viewAllianceStat('Def', Format.formatPercent(alliance.bonus.def))
                ),
                m('div.AllianceStats-Stat.AllianceStats-Inf',
                    AlliancePlayers.viewAllianceStat('Inf', Format.formatPercent(alliance.bonus.inf))
                ),
                m('div.AllianceStats-Stat.AllianceStats-Air',
                    AlliancePlayers.viewAllianceStat('Air', Format.formatPercent(alliance.bonus.air))
                ),
                m('div.AllianceStats-Stat.AllianceStats-Vec',
                    AlliancePlayers.viewAllianceStat('Veh', Format.formatPercent(alliance.bonus.vec))
                )
            ])
        ]
    }

    static viewAllianceStat(stat, value) {
        return [
            m('span.AllianceStats-Key', stat),
            m('span.AllianceStats-Value', value)
        ]
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