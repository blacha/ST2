//import {Define} from './define';
//
//
//var classNames = ['Form', 'FormData', 'Job', 'Measurement'];
//export class AfterSave {
//
//    static init() {
//        classNames.forEach(function(className) {
//            Define.defineAfterSave(className, AfterSave.hook);
//        });
//    }
//
//    static hook() {
//
//        var currentUser = Parse.User.current();
//
//        if (currentUser == null || currentUser.get('company') == null) {
//            // Only root can see this object
//            request.object.setACL(ACLFactory.createRootRestricted());
//        } else {
//            // Any company user can see this object
//            request.object.setACL(ACLFactory.createCompanyUserRestricted(currentUser.get('company')));
//        }
//
//        // Save the object's new ACL, log on error and try to restrict to root
//        request.object.save().then(null, function(error) {
//            console.error(error);
//            request.object.setACL(ACLFactory.createRootRestricted());
//            request.object.save().then(null, function(error) {
//                console.error(error);
//            });
//        });
//    }
//}