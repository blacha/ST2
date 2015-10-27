import {ACL} from './../permission/acl';
import {ParseRole} from './../permission/role';
import {User} from '../objects/user';
import {World} from '../objects/world';
import {Verify} from '../objects/verify';
import {PlayerObject} from '../objects/player';

import {Log} from '../../lib/log/log';
import {UUID} from '../../lib/uuid';


var VerifyExport = {
    verify_done: null,
    verify_get: null,
    verify_create: null
};

VerifyExport.verify_done = function (req, res) {
    if (req.params.uuid == null) {
        return res.error('Invalid UUID');
    }

    if (req.params.username == null) {
        return res.error('Invalid Username');
    }

    if (req.params.password == null) {
        return res.error('Invalid Username');
    }
    var $log = Log.child({func: 'verify_done'});

    var verifyObj = null;
    var userObj = null;
    return Verify.first(Verify.schema.UUID, req.params.uuid, true, $log).then(function (data) {
        if (data == null) {
            return Parse.Promise.error('Invalid UUID');
        }

        verifyObj = data;
        Parse.Cloud.useMasterKey();

        var user = new Parse.User();
        user.setUsername(verifyObj.get(Verify.schema.PLAYER));
        user.setPassword(req.params.password);
        user.setEmail(req.params.username);

        return user.save();
    }).then(function (user) {
        userObj = user;
        var playerName = verifyObj.get(Verify.schema.PLAYER);

        return ParseRole.getOrCreate(PlayerObject.RoleName(playerName), $log);
    }).then(function (role) {
        role.getUsers().add(userObj);
        return role.save();
    }).then(function () {
        return Parse.Object.destroyAll([verifyObj]);
    }).then(function () {
        res.success({
            id: userObj.id
        });
    }, function (err) {
        console.log('Error creating user:' + err);
        res.error(err);
    })
};

VerifyExport.verify_get = function (req, res) {
    if (req.params.uuid == null) {
        return res.error('Invalid UUID');
    }
    var $log = Log.child({func: 'verify_get'});

    return Verify.first(Verify.schema.UUID, req.params.uuid, true, $log).then(function (data) {
        if (data) {
            res.success(data);
            return;
        }

        res.error('Invalid UUID');
    });
};

VerifyExport.verify_create = function (req, res) {
    if (req.params.player == null) {
        return res.error('Invalid player');
    }

    if (req.params.world == null) {
        return res.error('Invalid world');
    }

    var worldID = parseInt(req.params.world, 10);
    var player = req.params.player.toLowerCase();
    var uuid = UUID.v4();
    var $log = Log.child({
        func: 'verify_create',
        world: worldID,
        player: player
    });

    User.first(User.schema.PLAYER, player, true, $log)
        .then(function (player) {
            if (player == null) {
                return World.first(World.schema.WORLD, worldID, true, $log);
            }
            return Parse.Promise.error('Player already exists');
        })
        .then(function (world) {
            if (world == null) {
                return Parse.Promise.error('World not found')
            }
            return Verify.first(Verify.schema.PLAYER, player, true, $log)
        })

        .then(function (verify) {
            if (verify) {
                $log.debug('Update World');
                verify.set(Verify.schema.WORLD, worldID);
                return verify.save();
            }
            return Verify.create({
                player: player,
                world: worldID,
                uuid: uuid
            }, true, $log)

        })
        .then(function (verifyObj) {
            res.success({id: verifyObj.id});
        }, function (err) {
            console.log('Error creating verify:' + err);
            res.error(err);
        })
};

export function define() {
    Parse.Cloud.define('verify_done', VerifyExport.verify_done);
    Parse.Cloud.define('verify_get', VerifyExport.verify_get);
    Parse.Cloud.define('verify_create', VerifyExport.verify_create);
}
