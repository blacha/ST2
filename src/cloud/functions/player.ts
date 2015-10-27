import {ACL} from './../permission/acl';
import {User} from '../objects/user';
import {World} from '../objects/world';
import {Alliance} from '../objects/alliance';
import {Player} from '../objects/player';

import {PlayerData} from '../../api/player.info';

function PlayerInfo(req, res) {
    var playerData = <PlayerData>req.params;
    var worldInfo = playerData.world;
    var allianceInfo = playerData.alliance;
    var playerInfo = playerData.player;

    playerInfo.world = worldInfo.world;
    allianceInfo.world = worldInfo.world;

    var worldObj, playerObj, allianceObj;

    return World.first(World.schema.WORLD, worldInfo.world)
        // check if world exists
        .then(function (world) {
            if (world == null) {
                return World.create(worldInfo, true);
            }
            return world;
        })

        // Check to see if the alliance exists
        .then(function (world) {
            worldObj = world;
            return Alliance.firstQuery({
                world: allianceInfo.world,
                alliance: allianceInfo.alliance
            }, true);
        })

        // create the alliance if it doesnt exist
        .then(function (alliance) {
            if (alliance == null) {
                return Alliance.create(allianceInfo, true);
            }
            return alliance.update(alliance, allianceInfo, true);
        })

        // Update the alliance ACL so the players can see it
        .then(function (alliance) {
            allianceObj = alliance;
            return Alliance.updateACL(alliance);
        })

        // find the player
        .then(function (alliance) {
            return Player.firstQuery({
                world: playerInfo.world,
                player: playerInfo.player
            }, true);
        })

        .then(function (player) {
            if (player == null) {
                return Player.create(playerInfo, true)
            }

            return Player.update(player, playerInfo, true);

        })

        .then(function (player) {
            playerObj = player;

            return Player.updateACL(playerObj, allianceObj);
        })

        .then(function () {
            res.success('Player Updated');
        }, function (err) {
            res.error(err);
        })
}

export function define() {
    Parse.Cloud.define('player_info', PlayerInfo);
}

