export class ACL {

    static create() {
        var acl = new Parse.ACL();

        acl.setPublicReadAccess(false);
        acl.setPublicWriteAccess(false);

        return acl;
    }
}