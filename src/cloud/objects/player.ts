import {ParseObject} from './parse.object';
import {ParseRole} from '../permission/role';
import {ACL} from '../permission/acl';
import {AllianceObject} from './alliance';

import {PlayerInfoData} from '../../api/player.info';

export class PlayerObject extends ParseObject {
    static schema = {
        PLAYER: 'player',
        WORLD: 'world',
        FACTION: 'faction',
        NAME: 'name',
        SCORE: 'score',
        RANK: 'rank',
        SUB: 'sub',
        RP: 'rp',
        CREDIT: 'credit',
        COMMAND: 'command',
        CITIES: 'cities',
        RESEARCH: 'research'
    };

    constructor() {
        super('Player');
    }

    getObject(obj) {
        var output = {};
        Object.keys(PlayerObject.schema).forEach(function(keyID) {
            var key = PlayerObject.schema[keyID];
            output[key] = obj[key];
        });
        return output;
    }

    updateACL(player, alliance) {
        console.log('set-player-acl:' + AllianceObject.RoleName(alliance));
        var acl = ACL.create();
        acl.setRoleReadAccess(AllianceObject.RoleName(alliance), true);
        player.setACL(acl);

        return player.save();
    }

    update(to, from:PlayerInfoData, master = false) {
        if (master) {
            Parse.Cloud.useMasterKey();
        }

        Object.keys(PlayerObject.schema).forEach(function(keyID) {
            var key = PlayerObject.schema[keyID];
            to.set(key, from[key]);
        });

        return to.save();
    }

    static RoleName(playerName:string) {
        return [
            'player',
            playerName.toLowerCase()
        ].join('-')
    }

    getSchema() {
        return PlayerObject.schema;
    }
}

export var Player = new PlayerObject();
