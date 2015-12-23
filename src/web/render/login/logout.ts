import {ParseWebUtil} from '../parse';

export class LogoutRender {

    static controller() {
        ParseWebUtil.logout();
        return null;
    }

    static view() {
        return null;
    }

}