import {ParsePlayerObject} from "../../../lib/objects/player";
import {PlayerStats} from "../../../lib/objects/player";
import {ParseAllianceObject} from "../../../lib/objects/alliance";
import {Base} from "../../../lib/base";

export function getStats(alliance:ParseAllianceObject, player:ParsePlayerObject):PlayerStats {
    if (alliance == null || player == null) {
        return;
    }

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
    console.time(player.name + ':loading-bases');
    player.cities.forEach(function (city) {
        if (city.offense > maxO) {
            mainBase = city;
            maxO = city.offense;
        }
        totalProduction.power += city.production.power + alliance.bonus.power;
        totalProduction.tiberium += city.production.tiberium + alliance.bonus.tiberium;
        totalProduction.crystal += city.production.crystal + alliance.bonus.crystal;
        totalProduction.credits += city.production.credits;

        totalResources.power += city.current.power;
        totalResources.tiberium += city.current.tiberium;
        totalResources.crystal += city.current.crystal;

        if (city.$base == null) {
            console.time(city.name);
            city.$base = Base.loadFromCity(player, city);
            console.timeEnd(city.name);
        }
    });
    console.timeEnd(player.name + ':loading-bases');


    player.$stats = {
        main: mainBase,
        total: {
            production: totalProduction,
            resources: totalResources
        }
    };

    return player.$stats;
}