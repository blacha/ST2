import {ParsePlayerObject} from "../../../lib/objects/player";
import {PlayerStats} from "../../../lib/objects/player";
import {ParseAllianceObject} from "../../../lib/objects/alliance";
import {Base} from "../../../lib/base";
import {GameResources} from "../../../lib/game.resources";

export function getStats(alliance:ParseAllianceObject, player:ParsePlayerObject):PlayerStats {
    if (alliance == null || player == null) {
        return;
    }

    if (player.$stats) {
        return player.$stats;
    }

    var maxO = 0;
    var totalProduction = new GameResources();
    var totalResources = new GameResources();
    var totalCost = new GameResources();

    var mainBase = null;
    console.time(player.name + ':loading-bases');
    player.cities.forEach(function (city) {
        if (city.offense > maxO) {
            mainBase = city;
            maxO = city.offense;
        }

        totalProduction.add(city.production);
        totalProduction.add(alliance.bonus);

        totalResources.add(city.current);

        if (city.$base == null) {
            console.time(city.name);
            city.$base = Base.loadFromCity(player, city);
            let cityCost = city.$cost = new GameResources();

            var tiles = city.$base.getBaseTiles();
            for (var i =0;i < tiles.length; i ++) {
                var tile = tiles[i];
                if (tile == null) {
                    continue;
                }

                var cost = tile.getTotalUpgradeCost();
                cityCost.add(cost);
                totalCost.add(cost);
            }

            console.timeEnd(city.name);
        }
    });
    console.timeEnd(player.name + ':loading-bases');


    player.$stats = {
        main: mainBase,
        total: {
            production: totalProduction,
            resources: totalResources,
            cost: totalCost
        }
    };

    return player.$stats;
}