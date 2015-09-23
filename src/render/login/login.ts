/// <reference path="../../../typings/mithril/mithril.d.ts" />

import {ParseUtil} from '../parse';
import {FormUtil} from '../form';

interface LoginErrors {
    password : _mithril.MithrilProperty<string>,
    username : _mithril.MithrilProperty<string>,
    general : _mithril.MithrilProperty<string>
}

export class LoginRender {
    static LOGO = m('div.LoginForm-Logo');
    static CSS = {
        ERROR: 'LoginForm--Error',
        LOADING: 'LoginForm--Loading'
    };

    private username:_mithril.MithrilProperty<string>;
    private password:_mithril.MithrilProperty<string>;
    private loading:_mithril.MithrilProperty<boolean>;

    private error:_mithril.MithrilProperty<boolean>;
    private errors:LoginErrors;

    constructor() {
        this.username = m.prop('');
        this.password = m.prop('');

        this.loading = m.prop(false);

        this.error = m.prop(false);
        this.errors = {
            general: m.prop(''),
            username: m.prop(''),
            password: m.prop('')
        };
    }

    view() {
        console.log('login:view');

        var loginClass = ['LoginForm'];
        if (this.error()) {
            loginClass.push(LoginRender.CSS.ERROR);
        }
        if (this.loading()) {
            loginClass.push(LoginRender.CSS.LOADING);
        }
        var boundLogin = this.login.bind(this);

        return m('div', {
            className: loginClass.join(' ')
        }, [
            LoginRender.LOGO,
            m('div.Card.BoxShadow', [
                m('form', {
                    onsubmit: boundLogin
                }, [
                    m('div.Login-ErrorMessage', this.errors.general()),
                    FormUtil.input('Username', this.username, this.errors.username),
                    FormUtil.password('Password', this.password, this.errors.password),
                    m('button', {
                        className: 'Input-Button',
                        disabled: this.loading(),
                        type: 'submit',
                        onclick: boundLogin
                    }, 'Login')
                ])
            ])
        ])
    }

    login() {
        this.clearErrors();
        this.loading(true);
        if (this.username().trim() === '') {
            this.setError('username', 'Username is required');
            return;
        }

        if (this.password().trim() === '') {
            this.setError('password', 'Password is required');
            return;
        }

        ParseUtil.login(this.username(), this.password()).then(function loginGood(data) {
            console.log('login-good', data);
            m.route('/');
        }, () => {
            this.clearErrors();
            this.setError('general', 'Invalid Username or Password.');
        });

        m.redraw();
        return false;
    }

    setError(field, text) {
        this.error(true);
        this.loading(false);
        this.errors[field](text);
    }

    clearErrors() {
        this.error(false);
        this.loading(false);
        this.errors.username('');
        this.errors.password('');
        this.errors.general('');
    }

    static controller() {
        return new LoginRender();
    }

    static view(ctrl:LoginRender) {
        return ctrl.view();
    }

    static wrap(ctrl) {
        return {
            controller() {
                return new ctrl.controller()
            },
            view(ctrl) {
                return ctrl.view(ctrl)
            }
        }
    }
}
