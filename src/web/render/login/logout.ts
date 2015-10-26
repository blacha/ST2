import {ParseUtil} from '../parse';

export class LogoutRender {

    static controller() {
        ParseUtil.logout();
        return null;
    }

    static view() {
         return null;
    }

}