import {AllianceTableCol} from "./alliance.table.col";
import {ParsePlayerObject} from "../../../lib/objects/player";
import {AlliancePlayers} from "./alliance.players";
import {OUnitType} from "../../../lib/unit/ounittype";
import {DUnitType} from "../../../lib/unit/dunittype";
import {Faction} from "../../../lib/data/faction";
import {CityInfoData} from "../../../api/player.info";
import * as Format from '../format';

export class AlliancePlayer {
    private ctrl:AlliancePlayers;

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
                    m('th', 'Base'),
                    m('th', 'Level'),
                    m('th', 'Tib/h'),
                    m('th', 'Cry/h'),
                    m('th', 'Pow/h'),
                    m('th', '$/h'),
                    m('th', 'Off'),
                    m('th', 'Def'),
                ]),
                m('tbody', player.cities.map(this.viewPlayerBase.bind(this)))
            ])
        ])
    }

    viewPlayerBase(city:CityInfoData) {
        var alliance = this.ctrl.getCurrentAlliance();
        return m('tr.PlayerBase', [
            m('td', city.name),
            m('td', this.viewPlayerBaseLayout(city)),
            m('td', Format.formatNumber(city.level)),
            m('td', Format.formatNumber(city.production.tiberium + alliance.bonus.tiberium)),
            m('td', Format.formatNumber(city.production.crystal + alliance.bonus.crystal)),
            m('td', Format.formatNumber(city.production.power + alliance.bonus.power)),
            m('td', Format.formatNumber(city.production.credits)),
            m('td', Format.formatNumber(city.offense)),
            m('td', Format.formatNumber(city.defense)),
        ])
    }

    viewPlayerBaseLayout(city:CityInfoData) {
        return '';
    }

    viewPlayerResearch(player:ParsePlayerObject) {
        var playerFaction = Faction.fromID(player.faction);
        var ounits = OUnitType[playerFaction.getName()];
        var dunits = DUnitType[playerFaction.getName()];
        var offenseResearch = [];
        var defenseResearch = [];

        Object.keys(ounits).forEach(function (key) {
            var ounit:OUnitType = ounits[key];
            var researchCount = player.research[ounit.getID()];

            offenseResearch.push(m('div',
                AlliancePlayer.playerResearchObj(researchCount),
                ounit.getName()));
        });

        Object.keys(dunits).forEach(function (key) {
            var dunit:DUnitType = dunits[key];
            if (dunit === DUnitType.GDI.Wall || dunit == DUnitType.NOD.Wall) {
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


