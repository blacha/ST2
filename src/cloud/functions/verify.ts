import {ACL} from './../util/acl';
import {User} from '../objects/user';
import {World} from '../objects/world';

export function define() {
    Parse.Cloud.define('verify_create', function (req, res) {
        console.log('req.params:' + req.params);
        if (req.params.player == null) {
            return res.error('PLAYER_INVALID');
        }

        if (req.params.world == null) {
            return res.error('WORLD_INVALID');
        }

        function errorFunc(code) {
            res.error({code: code || 'INTERNAL_ERROR'});
        }

        console.log(req.params.player + ' ' + req.params.world);
        var worldID = parseInt(req.params.world, 10);
        User.fetchByPlayer(req.params.player, true)
            .then(errorFunc.bind('PLAYER_EXISTS'), World.fetch.bind(null, worldID))
            .then(function (world) {
                console.log('world:' + JSON.stringify(world));
            }, errorFunc.bind('WORLD_NOT_FOUND'))
            .then(function () {
                res.success('done');
            })
    });
}
