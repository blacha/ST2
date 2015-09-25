/// <reference path="../parse.d.ts" />

export class ACL {

    create() {
        var acl = new Parse.ACL();

        acl.setPublicReadAccess(false);
        acl.setPublicWriteAccess(false);

        return acl;
    }
}