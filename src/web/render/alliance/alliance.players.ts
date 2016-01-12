import {ParseJSONAllianceObject} from "../../../lib/objects/alliance";
import {ParseJSONPlayerObject} from "../../../lib/objects/player";

import {ParseWebUtil} from '../parse';
import {Log} from "../../../lib/log/log";
import {ParseJSONWorldObject} from "../../../lib/objects/world";
import {ScoreCol, BIGGEST_COLS} from  './alliance.table';
import {AllianceTableCol} from "./alliance.table.col";
import * as Layout from '../layout/layout';
import * as PlayerUtil from './player.util';
import * as Format from '../format';
import {AllianceTable} from "./alliance.table";
import {AlliancePlayer} from "./alliance.player";
import {AllianceData} from "../data/data";
import {CityInfoData} from "../../../api/player.info";
import {AlliancePlayerInfoData} from "../../../api/player.info";

var $log = Log.child({route: 'AlliancePlayers'});

export class AlliancePlayers {
    private alliance:_mithril.MithrilProperty<ParseJSONAllianceObject>;
    private alliances:_mithril.MithrilProperty<ParseJSONAllianceObject[]>;
    private players:_mithril.MithrilProperty<ParseJSONPlayerObject[]>;
    private currentPlayerName:_mithril.MithrilProperty<string>;
    private currentCityId:_mithril.MithrilProperty<number>;
    private world:_mithril.MithrilProperty<ParseJSONWorldObject>;
    private worldID:number;

    public currentSort:AllianceTableCol;
    private lastUpdate:Date;
    private biggest:{[key: string]: number};
    private destroyed = false;
    static UPDATE_TIME = 30 * 1000;

    private tableCreator:AllianceTable;
    private playerViewer:AlliancePlayer;

    constructor() {
        this.tableCreator = new AllianceTable(this);
        this.playerViewer = new AlliancePlayer(this);
        this.currentSort = ScoreCol;

        this.alliance = <any>m.prop();
        this.alliances = <any>m.prop();
        this.world = <any>m.prop({name: ''});

        var currentPlayer = (m.route.param('player') || '').toLowerCase();
        this.currentPlayerName = m.prop(currentPlayer);

        var currentCity = parseInt(m.route.param('city'), 10);
        this.currentCityId = m.prop(currentCity);

        this.players = m.prop([]);

        this.worldID = parseInt(m.route.param('world'), 10);
        $log.info({world: this.worldID, param: m.route.param('world')}, 'invalid worldID');

        if (this.worldID == null || isNaN(this.worldID)) {
            $log.info({world: this.worldID, param: m.route.param('world')}, 'invalid worldID');
        }


        AllianceData.getInstance().getWorld(this.worldID, $log).then((world) => {
            this.world(world);
        });

        this.update();
    }

    update() {
        if (this.destroyed) {
            return;
        }

        $log.info('Update');
        this.lastUpdate = new Date();
        this.biggest = {};
        var ad = AllianceData.getInstance();

        var getAlliance = ad.getAlliances(this.worldID, $log).then((alliances) => {
            this.alliance(alliances[0]);
            this.alliances(alliances);
            if (this.alliance() == null) {
                $log.error(alliances, 'Alliance not found');
                return m.route('/');
            }
        });


        var getPlayer = ad.getPlayers(this.worldID, $log).then((players) => {
            this.players(players.sort(this.sortPlayers.bind(this)));
        });

        m.sync([getAlliance, getPlayer]).then(() => {
            console.log('player-stats-update');
            this.players().forEach(PlayerUtil.getStats.bind(null, this.alliance()));
            this.updateBiggest(this.players());

            setTimeout(() => {
                this.update();
            }, AlliancePlayers.UPDATE_TIME);

            m.redraw();
        });
    }

    onunload() {
        this.destroyed = true;
        $log.info('Destroy alliance-table');
    }

    view() {
        if (this.alliance() == null) {
            return;
        }

        if (this.players().length === 0) {
            return;
        }

        var alliance = this.alliance();
        // Render for a specific player
        if (this.currentPlayerName()) {
            var currentPlayer = this.players().filter((player) => {
                return player.name.toLowerCase() === this.currentPlayerName();
            }).pop();

            if (currentPlayer == null) {
                this.currentPlayerName('');
                m.route(`/alliance/${m.route.param('alliance')}`);
                return;
            }

            return Layout.createLayout({
                page: 'Alliance'
            }, [
                m('div.AllianceInfo', this.viewAllianceTitle(false)),
                m('div.AlliancePlayer',
                    this.playerViewer.view(currentPlayer)
                )
            ]);
        }

        var players = this.players().filter(function (player) {
            return player.alliance === alliance.alliance;
        });

        return Layout.createLayout({
            page: 'Alliance'
        }, [
            m('div.AllianceInfo', this.viewAllianceTitle()),
            m('div.AlliancePlayers',
                this.tableCreator.view(players)
            )
        ]);
    }

    private updateBiggest(players:ParseJSONPlayerObject[]) {
        this.biggest = {};
        players.forEach((player) => {
            BIGGEST_COLS.forEach((col:AllianceTableCol) => {
                var oldValue = this.biggest[col.key];
                if (oldValue == null) {
                    oldValue = 0;
                }

                var playerValue = parseFloat(col.getSortValue(player, this));
                if (playerValue > oldValue) {
                    this.biggest[col.key] = playerValue;
                }
            });
        })
    }

    isBiggestValue(key:string, value:number) {
        var bigValue = this.biggest[key];
        if (bigValue == null) {
            return false;
        }
        return value >= this.biggest[key];
    }

    getPlayer(playerName:string):ParseJSONPlayerObject {
        var searchName = playerName.toLowerCase();
        var players = this.players();

        var player = players.filter(function (player:ParseJSONPlayerObject) {
            return player.name.toLowerCase() == searchName;
        });

        return player.pop();
    }

    getPlayerCity(playerName:string, baseId:number):CityInfoData {
        var player = this.getPlayer(playerName);
        if (player == null) {
            return;
        }
        var cities = player.cities.filter(function (city:CityInfoData) {
            return city.id === baseId;
        });

        return cities.pop();
    }

    getCurrentCity() {
        if (!this.currentCityId()) {
            return null;
        }
        if (!this.currentPlayerName()) {
            return null;
        }

        return this.getPlayerCity(this.currentPlayerName(), this.currentCityId());
    }

    viewAllianceTitle(showStats = true) {
        var breadCrumb = [];
        if (this.currentCityId()) {
            var currentBase = this.getPlayerCity(this.currentPlayerName(), this.currentCityId());
            if (currentBase != null) {
                breadCrumb.unshift(m('button.AllianceInfo-Base.Button', {
                    onclick: m.route.bind(m.route, `/alliance/${this.worldID}/${this.currentPlayerName()}/${this.currentCityId()}`, null)
                }, currentBase.name));
            }
        }

        if (this.currentPlayerName()) {
            breadCrumb.unshift(m('button.AllianceInfo-Player.Button', {
                onclick: m.route.bind(m.route, `/alliance/${this.worldID}/${this.currentPlayerName()}`, null)
            }, this.currentPlayerName()));
        }


        breadCrumb.unshift(m('button.AllianceInfo-Name.Button', {
            onclick: () => {
                m.route(`/alliance/${this.worldID}`);
                return false;
            }
        }, this.alliance().name));

        breadCrumb.unshift(m('button.AllianceInfo-World.Button', {
            onclick: m.route.bind(m.route, '/alliance', null),
            title: 'Change world'
        }, this.world().name));

        var lastBreadCrumb = breadCrumb[breadCrumb.length - 1];
        lastBreadCrumb.attrs.className += ' Button--colored';

        var output = [
            m('div.AllianceInfo-Title', breadCrumb)
        ];

        if (showStats) {
            output.push(m('div.AllianceInfo-Stats.AllianceStats', this.viewAllianceStats()))
        }
        return [output];
    }

    viewAllianceStats() {
        var alliance = this.alliance();
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
        if (this.currentSort === col) {
            this.currentSort.swapSortOrder();
        } else {
            this.currentSort = col;
            this.currentSort.resetSortOrder();
        }

        var sorted = this.players().sort(this.sortPlayers.bind(this));
        this.players(sorted);
    }

    sortPlayers(a:ParseJSONPlayerObject, b:ParseJSONPlayerObject) {
        var valA = this.currentSort.getSortValue(a, this);
        var valB = this.currentSort.getSortValue(b, this);

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

    getCurrentAlliance():ParseJSONAllianceObject {
        return this.alliance();
    }
}