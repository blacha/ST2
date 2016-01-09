import {ACL} from './../permission/acl';
import {User} from '../objects/user';
import {World} from '../objects/world';
import {Alliance} from '../objects/alliance';
import {Player} from '../objects/player';

import {PlayerData} from '../../api/player.info';

import {Log} from '../../lib/log/log';
import {ParsePlayerObject} from "../objects/player";
import {ParseAllianceObject} from "../objects/alliance";
import {ParseWorldObject} from "../objects/world";


var PlayerLog = Log.child({
    func: 'player_info'
});

function PlayerInfo(req, res) {
    var playerData = <PlayerData>req.params;
    var worldInfo = playerData.world;
    var allianceInfo = playerData.alliance;
    var playerInfo = playerData.player;

    playerInfo.world = worldInfo.world;
    allianceInfo.world = worldInfo.world;

    var worldObj:ParseWorldObject;
    var playerObj:ParsePlayerObject;
    var allianceObj:ParseAllianceObject;

    var $log = PlayerLog.child({
        player: playerInfo.name,
        world: worldInfo.world,
        alliance: allianceInfo.name
    });

    $log.debug('Player Update');

    return World.first(World.schema.WORLD, worldInfo.world, true, $log)
        // check if world exists
        .then(function (world) {
            if (world == null) {
                $log.info({worldName: worldInfo.name}, 'Create World');
                return World.create(worldInfo, true, $log);
            }
            return world;
        })

        // Check to see if the alliance exists
        .then(function (world:ParseWorldObject) {
            worldObj = world;
            return Alliance.firstQuery({
                world: allianceInfo.world,
                alliance: allianceInfo.alliance
            }, true, $log);
        })

        // create the alliance if it doesnt exist
        .then(function (alliance:ParseAllianceObject) {
            if (alliance == null) {
                $log.info('Create alliance');
                return Alliance.create(allianceInfo, true, $log);
            }
            return Alliance.update(alliance, allianceInfo, true, $log);
        })

        // Update the alliance ACL so the players can see it
        .then(function (alliance:ParseAllianceObject) {
            allianceObj = alliance;
            return Alliance.updateACL(alliance, $log);
        })

        // find the player
        .then(function (alliance:ParseAllianceObject) {
            return Player.firstQuery({
                world: playerInfo.world,
                player: playerInfo.player
            }, true, $log);
        })

        .then(function (player:ParsePlayerObject) {
            if (player == null) {
                $log.info('Create player');
                return Player.create(playerInfo, true, $log)
            }

            return Player.update(player, playerInfo, true, $log);

        })

        .then(function (player:ParsePlayerObject) {
            playerObj = player;

            return Player.updateACL(playerObj, allianceObj, $log);
        })

        .then(function () {
            res.success('Player Updated');
        }, function (err) {
            $log.error({error: err}, 'Error');
            res.error(err);
        })
}

export function define() {
    Parse.Cloud.define('player_info', PlayerInfo);
}

