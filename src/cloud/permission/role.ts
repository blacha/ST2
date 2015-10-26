import {ACL} from './acl';

export class ParseRole {

    static getOrCreate(name) {
        return ParseRole.get(name).then(function(role) {
            if (role) {
                return role;
            }

            return ParseRole.create(name);
        })
    }

    static get(name) {
        var query = new Parse.Query(Parse.Role);
        query.equalTo('name', name);
        return query.first();
    }

    static create(name) {
        var acl = ACL.create();
        var role = new Parse.Role(name, acl);
        return role.save();
    }
}