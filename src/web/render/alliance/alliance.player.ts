import {AllianceTableCol} from "./alliance.table.col";
import {ParsePlayerObject} from "../../../lib/objects/player";
import {AlliancePlayers} from "./alliance.players";
import {OUnitType} from "../../../lib/unit/ounittype";
import {DUnitType} from "../../../lib/unit/dunittype";
import {Faction} from "../../../lib/data/faction";
import {CityInfoData} from "../../../api/player.info";
import * as Format from '../format';
import {RenderBuildingTile} from "../base/tile";

export class AlliancePlayer {
    private ctrl:AlliancePlayers;
    static NO_UPGRADES = [DUnitType.GDI.Wall, DUnitType.GDI.MGNest, DUnitType.NOD.Wall, DUnitType.NOD.ScorpionTank]
    constructor(ctrl:AlliancePlayers) {
        this.ctrl = ctrl;
    }

    view(player:ParsePlayerObject) {
        return [
            this.viewPlayerInfo(player),
            this.viewPlayerResearch(player),
            this.viewPlayerBases(player)
        ]
    }

    viewPlayerInfo(player:ParsePlayerObject) {
        return m('div.AlliancePlayer-Info', [
            m('div.AlliancePlayer-Name', player.name)
        ])
    }

    viewPlayerBases(player:ParsePlayerObject) {
        return m('div.AlliancePlayer-Base.PlayerBases', [
            m('div.PlayerBases-Title', 'Bases'),
            m('table.Table', [
                m('thead.Table-Head', [
                    m('th', 'Name'),
                    m('th', 'Layout'),
                    m('th', 'Level'),
                    m('th', 'Tib/h'),
                    m('th', 'Cry/h'),
                    m('th', 'Pow/h'),
                    m('th', '$/h'),
                    m('th', 'Off'),
                    m('th', 'Def'),
                    m('th', 'Support'),
                ]),
                m('tbody', player.cities.map(this.viewPlayerBase.bind(this)))
            ])
        ])
    }

    viewPlayerBase(city:CityInfoData) {
        var alliance = this.ctrl.getCurrentAlliance();
        var bonus = alliance.bonus || {tiberium: 0, crystal: 0, power: 0};
        return m('tr.PlayerBase', [
            m('td',
                m('a', {
                    href: `#/alliance/${m.route.param('world')}/${m.route.param('player')}/${city.id}`
                }, city.name)
            ),
            m('td', m('div.BuildingTiles.BuildingTiles--Small', city.$base.buildingsForEach(RenderBuildingTile.bind(null, false)))),
            m('td', Format.formatNumber(city.level)),
            m('td', Format.formatNumber(city.production.tiberium + bonus.tiberium)),
            m('td', Format.formatNumber(city.production.crystal + bonus.crystal)),
            m('td', Format.formatNumber(city.production.power + bonus.power)),
            m('td', Format.formatNumber(city.production.credits)),
            m('td', Format.formatNumber(city.offense)),
            m('td', Format.formatNumber(city.defense)),
            m('td.Support', this.viewSupport(city)),
        ])
    }

    viewSupport(city:CityInfoData) {
        var support = city.$base.getSupport();
        if (support == null) {
            return [];
        }

        return [
            m('div.Support-Text', support.getLevel()),
            m(`i.Support-Icon.Support-${support.getID()}`, { title: support.getGameData().display })
        ];
    }

    viewPlayerResearch(player:ParsePlayerObject) {
        var playerFaction = Faction.fromID(player.faction);
        var ounits = OUnitType[playerFaction.getName()];
        var dunits = DUnitType[playerFaction.getName()];
        var offenseResearch = [];
        var defenseResearch = [];

        Object.keys(ounits).forEach(function (key) {
            var ounit:OUnitType = ounits[key];
            if (AlliancePlayer.NO_UPGRADES.indexOf(ounit) > -1) {
                return;
            }
            var researchCount = player.research[ounit.getID()];

            offenseResearch.push(m('div',
                AlliancePlayer.playerResearchObj(researchCount),
                ounit.getName()));
        });

        Object.keys(dunits).forEach(function (key) {
            var dunit:DUnitType = dunits[key];
            if (AlliancePlayer.NO_UPGRADES.indexOf(dunit) > -1) {
                return;
            }
            var researchCount = player.research[dunit.getID()];

            defenseResearch.push(m('div',
                AlliancePlayer.playerResearchObj(researchCount),
                dunit.getName()));
        });

        return m('div.AlliancePlayer-Research.PlayerResearch', [
            m('div.PlayerResearch-Group', [
                m('div.PlayerResearch-Offense', [
                    m('div.PlayerResearch-Title', 'Offense Research'),
                    m('div.PlayerResearch-Research', offenseResearch),
                ]), m('div.PlayerResearch-Defense', [
                    m('div.PlayerResearch-Title', 'Defense Research'),
                    m('div.PlayerResearch-Research', defenseResearch),
                ])
            ])
        ])
    }

    static playerResearchObj(researchCount:number) {
        var classNames = ['PlayerResearch-ResearchItem'];
        var title = 'Not researched.';

        if (researchCount == 1) {
            classNames.push('PlayerResearch--Researched');
            title = 'Researched';
        } else if (researchCount == 2) {
            classNames.push('PlayerResearch--Upgraded');
            title = 'Researched & Upgraded';
        } else {
            classNames.push('PlayerResearch--Disabled');
        }

        return {
            className: classNames.join(' '),
            title: title
        };
    }
}


