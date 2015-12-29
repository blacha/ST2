import {ParsePlayerObject} from "../../../lib/objects/player";
import {PlayerStats} from "../../../lib/objects/player";
import {ParseAllianceObject} from "../../../lib/objects/alliance";

export function getStats(alliance:ParseAllianceObject, player:ParsePlayerObject):PlayerStats {
    if (player.$stats) {
        return player.$stats;
    }

    var maxO = 0;
    var totalProduction = {
        power: 0,
        tiberium: 0,
        crystal: 0,
        credits: 0
    };

    var totalResources = {
        power: 0,
        tiberium: 0,
        crystal: 0,
        credits: 0
    };

    var mainBase = null;
    player.cities.forEach(function (city) {
        if (city.offense > maxO) {
            mainBase = city;
        }
        totalProduction.power += city.production.power + alliance.bonus.power;
        totalProduction.tiberium += city.production.tiberium + alliance.bonus.tiberium;
        totalProduction.crystal += city.production.crystal + alliance.bonus.crystal;
        totalProduction.credits += city.production.credits;

        totalResources.power += city.current.power;
        totalResources.tiberium += city.current.tiberium;
        totalResources.crystal += city.current.crystal;
    });

    player.$stats = {
        main: mainBase,
        total: {
            production: totalProduction,
            resources: totalResources
        }
    };

    console.log(player.research);
    return player.$stats;
}