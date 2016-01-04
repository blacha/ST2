import {ParseWebUtil} from '../parse';

export function WrapAuth(component) {
    return {
        controller: function() {
            return new AuthWrapper(component);
        },
        view: function(ctrl) {
            return ctrl.view();
        }
    }
}

class AuthWrapper {
    private ctrl;

    private content;

    constructor(ctrl) {
        this.ctrl = ctrl;
        console.log('check auth', ParseWebUtil.token(), ParseWebUtil.token() == null, ParseWebUtil.user());
        if (ParseWebUtil.token() == null) {
            m.route('/login');
            return;
        }
        this.content = new ctrl();
    }

    view(ctrl) {
        if (this.content == null) {
            return [];
        }
        return this.content.view();
    }

}