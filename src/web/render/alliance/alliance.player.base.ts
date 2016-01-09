import {Faction} from "../../../lib/data/faction";
import {CityInfoData} from "../../../api/player.info";
import {RenderBuildingTile} from "../base/tile";
import {AlliancePlayers} from "./alliance.players";
import {BaseProduction} from "../../../lib/production";
import * as Format from '../format';
import {GameResources} from "../../../lib/game.resources";

var ORDER = [GameResources.TIBERIUM, GameResources.CRYSTAL, GameResources.POWER, GameResources.CREDIT];

export class AlliancePlayerBase {


    static view(ctrl:AlliancePlayers) {
        var currentCity = ctrl.getCurrentCity();
        if (currentCity == null) {
            return null;
        }

        return [
            AlliancePlayerBase.viewCityProduction(ctrl, currentCity),
            AlliancePlayerBase.viewCityTiles(currentCity),
        ]
    }

    static viewCityTiles(city:CityInfoData) {
        var renderTile = RenderBuildingTile.bind(null, true);

        return m('div', {
            className: 'BaseTiles BaseTiles--OffInline'
        }, [
            m('div.BuildingTiles', city.$base.buildingsForEach(renderTile)),
            m('div.DefTiles', city.$base.defForEach(renderTile)),
            m('div.OffTiles', city.$base.offForEach(renderTile))
        ]);
    }

    static viewCityProduction(ctrl:AlliancePlayers, city:CityInfoData) {
        var alliance = ctrl.getCurrentAlliance();
        var production = BaseProduction.getOutput(city.$base);

        var productionLists = ORDER.map(function (key) {
            return m('div', {
                className: 'BaseProduction BaseProduction--' + key
            }, [
                m('i.icon-' + key),
                m('span.BaseProduction-Value', Format.formatNumber(production.cont[key] + production.pkg[key] + (alliance.bonus[key] ||0)) + '/h')
            ]);
        });

        return m('div', {
            className: 'BaseProduction--Group'
        }, [
            productionLists
        ]);
    }
}

