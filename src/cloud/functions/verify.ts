import {ACL} from './../util/acl';
import {User} from '../objects/user';
import {World} from '../objects/world';
import {Verify} from '../objects/verify';

import {UUID} from '../../lib/uuid';

export function define() {
    Parse.Cloud.define('verify_create', function (req, res) {
        console.log('req.params:' + req.params);
        if (req.params.player == null) {
            return res.error('PLAYER_INVALID');
        }

        if (req.params.world == null) {
            return res.error('WORLD_INVALID');
        }

        function errorFunc(code?) {
            res.error(code || 'INTERNAL_ERROR');
        }

        console.log(req.params.player + ' ' + req.params.world);
        var worldID = parseInt(req.params.world, 10);
        var player = req.params.player;
        var uuid = UUID.v4();

        User.first(User.schema.PLAYER, req.params.player, true)
            .then(errorFunc.bind('PLAYER_EXISTS'), World.first.bind(World, World.schema.WORLD, worldID))
            .then(function (world) {
                console.log('world:' + JSON.stringify(world));
            }, errorFunc.bind('WORLD_NOT_FOUND'))

            .then(function PlayerExists() {
                return Verify.first(Verify.schema.PLAYER, player, true)
            })

            .then(function (verify) {
                console.log('verify-update' + verify);
                verify.set(Verify.schema.WORLD, worldID);
                return verify.save();
            }, function () {
                console.log('verify-create');
                return Verify.create({
                    player: player,
                    world: worldID,
                    uuid: uuid
                }, true)
            })
            .then(function (verifyObj) {
                res.success({id: verifyObj.id});
            }, function (err) {
                console.log(err);
                errorFunc();
            })
    });
}
