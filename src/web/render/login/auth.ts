import {ParseUtil} from '../parse';

export class AuthWrapper {
    private ctrl;

    constructor(ctrl) {
        this.ctrl = ctrl;
    }

    controller() {
        console.log('check auth', ParseUtil.token());
        if (ParseUtil.token() == null) {
            m.route('/login');
            return;
        }
        return new this.ctrl();
    }

    view(data) {
        return this.ctrl.view(data);
    }

    static wrap(ctrl) {
        return new AuthWrapper(ctrl);
    }
}