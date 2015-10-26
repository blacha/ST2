import {ParseObject} from './parse.object';
import {ParseRole} from '../permission/role';
import {ACL} from '../permission/acl';
import {Player, PlayerObject} from './player';

export class AllianceObject extends ParseObject {
    static schema = {
        WORLD: 'world',
        NAME: 'name',
        ALLIANCE: 'alliance',
        BONUS: 'bonus',
        PLAYERS: 'players'
    };

    schema = AllianceObject.schema;

    constructor() {
        super('Alliance');
    }

    getSchema() {
        return this.schema;
    }


    create(obj, master) {
        var allianceObj;
        return super.create(obj, master)
            .then((alliance) => {

            allianceObj = alliance;
            console.log('alliance-created' + alliance.get('name'));

            return ParseRole.getOrCreate(AllianceObject.RoleName(allianceObj))
        }).then(() => {
            var acl = ACL.create();
            acl.setRoleReadAccess(AllianceObject.RoleName(allianceObj), true);
            allianceObj.setACL(acl);

            return allianceObj.save();
        });
    }

    updateACL(alliance) {
        console.log('update-acl: ' + alliance.get('name'));
        var roleName = AllianceObject.RoleName(alliance);
        var allianceRole;
        return ParseRole.get(roleName).then(function(role) {
            allianceRole = role;
            if (role == null) {
                return Parse.Promise.error('Invalid alliance');
            }

            return allianceRole.getRoles().query().find();
        }).then(function(roleList) {
            var roleMap = {};
            roleList.forEach(function(role) {
                roleMap[role.get('name')] = role;
            });

            var toAdd = [];

            var playerRoles = alliance.get(Alliance.schema.PLAYERS).map(function(player) {
                var playerRole = PlayerObject.RoleName(player);
                if (roleMap[playerRole] == null) {
                    toAdd.push(playerRole);
                }

                return playerRole
            });

            roleList.forEach(function(role) {
                var roleName = role.get('name');
                if (roleName.indexOf('player-') != 0) {
                    return;
                }

                if (playerRoles.indexOf(roleName) == -1) {
                    allianceRole.getRoles().remove(role);
                }
            });

            return Parse.Promise.when(toAdd.map(function(roleName) {
                return ParseRole.getOrCreate(roleName);
            }));

        }).then(function(data) {
            for(var i = 0; i < arguments.length; i ++) {
                var role = arguments[i];
                allianceRole.getRoles().add(role);
            }

            return allianceRole.save();
        })
    }

    static RoleName(alliance) {
        return [
            'alliance',
            alliance.get(AllianceObject.schema.WORLD),
            alliance.get(AllianceObject.schema.ALLIANCE)
        ].join('-')
    }
}

export var Alliance = new AllianceObject();
