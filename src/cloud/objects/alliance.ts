import {ParseObject} from './parse.object';
import {ParseRole} from '../permission/role';
import {ACL} from '../permission/acl';
import {Player, PlayerObject} from './player';
import {AllianceInfoData} from '../../api/player.info';

import {Log} from '../../lib/log/log';
import {AlliancePlayerInfoData} from "../../api/player.info";
import {ParseBaseObject} from "./parse.object";
import {ParseJSONAllianceObject} from "../../lib/objects/alliance";

export interface ParseAllianceObject extends ParseBaseObject {
    attrs: ParseJSONAllianceObject
}


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


    create(obj:AllianceInfoData, master:boolean, $log:Log) {
        var allianceObj;
        return super.create(obj, master, $log).then((alliance) => {
            allianceObj = alliance;
            $log.debug('Alliance created');
            return ParseRole.getOrCreate(AllianceObject.RoleName(allianceObj), $log)
        }).then(() => {
            var acl = ACL.create();
            acl.setRoleReadAccess(AllianceObject.RoleName(allianceObj), true);
            allianceObj.setACL(acl);

            return allianceObj.save();
        });
    }

    private needsUpdate(to:ParseAllianceObject, from:AllianceInfoData) {
        // Name change
        if (to.get(AllianceObject.schema.NAME) != from.name) {
            return true;
        }

        // Check bonus numbers
        var bonsuses = to.get(AllianceObject.schema.BONUS);
        var bonusFiltered = Object.keys(from.bonus).filter((key) => {
            return bonsuses[key] !== from.bonus[key];
        });
        if (bonusFiltered.length > 0) {
            return true;
        }

        // Check if new players added or removed
        var playerMap = {};
        var players = to.get(AllianceObject.schema.PLAYERS).forEach((player) => {
            playerMap[player.name] = true;
        });
        var filtered = from.players.filter(function(player) {
            return playerMap[player.name] !== true;
        })
        if (filtered.length > 0) {
            return true;
        }

        return false;
    }

    update(to:ParseAllianceObject, from:AllianceInfoData, master:boolean, $log:Log) {
        if (this.needsUpdate(to, from) === false) {
            $log.info('Skipping update');
            return Parse.Promise.as(to);
        }

        to.set(AllianceObject.schema.BONUS, from.bonus);
        to.set(AllianceObject.schema.PLAYERS, from.players);
        to.set(AllianceObject.schema.NAME, from.name);
        if (master) {
            Parse.Cloud.useMasterKey();
        }
        return to.save();
    }

    updateACL(alliance:ParseAllianceObject, $log:Log) {
        $log = $log.child({
            alliance: alliance.get('name')
        });

        var roleName = AllianceObject.RoleName(alliance);
        var allianceRole;
        return ParseRole.get(roleName).then(function (role) {
            allianceRole = role;
            if (role == null) {
                return Parse.Promise.error('Invalid alliance');
            }

            return allianceRole.getRoles().query().find();
        }).then(function (roleList:any[]) {
            var roleMap = {};
            roleList.forEach(function (role) {
                roleMap[role.get('name')] = role;
            });

            var toAdd = [];

            var playerRoles = alliance.get(Alliance.schema.PLAYERS).map(function (player:AlliancePlayerInfoData) {
                var playerRole = PlayerObject.RoleName(player.name);
                if (roleMap[playerRole] == null) {
                    toAdd.push(playerRole);
                    $log.debug({role: playerRole}, 'Add');
                }

                return playerRole
            });

            roleList.forEach(function (role) {
                var roleName = role.get('name');
                if (roleName.indexOf('player-') != 0) {
                    return;
                }

                if (playerRoles.indexOf(roleName) == -1) {
                    $log.debug({role: roleName}, 'Remove');
                    allianceRole.getRoles().remove(role);
                }
            });

            return Parse.Promise.when(toAdd.map(function (roleName) {
                return ParseRole.getOrCreate(roleName, $log);
            }));

        }).then(function (data) {
            for (var i = 0; i < arguments.length; i++) {
                var role = arguments[i];
                allianceRole.getRoles().add(role);
            }

            return allianceRole.save();
        })
    }

    static RoleName(alliance:ParseAllianceObject) {
        return AllianceObject.RoleNameByData(
            parseInt(alliance.get(AllianceObject.schema.WORLD), 10),
            parseInt(alliance.get(AllianceObject.schema.ALLIANCE), 10)
        );
    }

    static RoleNameByData(world:number, alliance:number) {
        return [
            'alliance',
            world,
            alliance
        ].join('-')
    }
}

export var Alliance = new AllianceObject();
