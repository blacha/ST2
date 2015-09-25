/// <reference path="../parse.d.ts" />

export class Role {


    static getPlayerRole(player:string) {
        var query = new Parse.Query(Parse.Role);
        query.equalTo('name', `player-${player}`);
        return query.first().then(function(role) {
            if (!role) {
                return Parse.Promise.error('ROLE_NOT_FOUND');
            }
            return role;
        }, function(error) {
            return 'ROLE_NOT_FOUND';
        });
    }

    static getAllianceRole(alliance:number) {
        var query = new Parse.Query(Parse.Role);
        query.equalTo('name', `alliance-${alliance}`);
        return query.first().then(function(role) {
            if (!role) {
                return Parse.Promise.error('ROLE_NOT_FOUND');
            }
            return role;
        }, function(error) {
            return 'ROLE_NOT_FOUND';
        });
    }
}