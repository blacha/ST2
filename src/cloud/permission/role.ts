import {ACL} from './acl';

import {Log} from '../../lib/log/log';

export class ParseRole {

    static getOrCreate(name, $log:Log) {
        return ParseRole.get(name).then(function (role) {
            if (role) {
                return role;
            }

            return ParseRole.create(name, $log);
        })
    }

    static get(name) {
        var query = new Parse.Query(Parse.Role);
        query.equalTo('name', name);
        return query.first();
    }

    static create(name, $log:Log) {
        var acl = ACL.create();
        var role = new Parse.Role(name, acl);

        $log.trace({action: 'role-create', role: name}, 'Create');
        return role.save();
    }
}