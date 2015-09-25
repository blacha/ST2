/// <reference path="../../../../typings/mithril/mithril.d.ts" />

import {ParseUtil} from '../parse';
import {FormUtil, FormInputState} from '../form';

export class LoginRender {
    static LOGO = m('div.STLogo');
    static CSS = {
        ERROR: 'is-invalid',
        LOADING: 'LoginForm--Loading'
    };

    private username:FormInputState;
    private password:FormInputState;
    private loading:_mithril.MithrilProperty<boolean>;

    private error:_mithril.MithrilProperty<boolean>;
    private errorMessage:_mithril.MithrilProperty<string>;

    constructor() {
        this.username = new FormInputState();
        this.password = new FormInputState();
        this.password.type('password');

        this.loading = m.prop(false);

        this.error = m.prop(false);
        this.errorMessage = m.prop('')
    }

    view() {
        var loginClass = ['LoginForm'];
        if (this.error()) {
            loginClass.push(LoginRender.CSS.ERROR);
        }
        if (this.loading()) {
            loginClass.push(LoginRender.CSS.LOADING);
        }

        var boundLogin = this.login.bind(this);

        var formInput = m('div.Card-SupportingText', [
            m('div.LoginForm-ErrorMessage', this.errorMessage()),
            FormUtil.input('Username', this.username),
            FormUtil.input('Password', this.password)
        ]);

        var formAction = m('div.Card-Actions', [
            m('button', {
                className: 'Button Button--secondary',
                disabled: this.loading(),
                type: 'button',
                onclick: function () {
                    return m.route('/register');
                }
            }, 'Register'),

            m('button', {
                className: 'Button Button--primary',
                disabled: this.loading(),
                type: 'submit',
                onclick: boundLogin
            }, 'Login')
        ]);

        return m('div', {
            className: loginClass.join(' ')
        }, [
            LoginRender.LOGO,
            m('div.Card.BoxShadow', [
                m('form', {
                    onsubmit: boundLogin
                }, [
                    formInput,
                    formAction
                ])
            ])
        ])
    }

    login() {
        this.clearErrors();
        this.loading(true);
        if (this.username.value().trim() === '') {
            this.setError(this.username.error, 'Username is required');
            return;
        }

        if (this.password.value().trim() === '') {
            this.setError(this.password.error, 'Password is required');
            return;
        }

        ParseUtil.login(this.username.value(), this.password.value()).then(function loginGood(data) {
            console.log('login-good', data);
            m.route('/');
        }, () => {
            this.clearErrors();
            this.setError(this.errorMessage, 'Invalid Username or Password.');
        });

        m.redraw();
        return false;
    }

    setError(field:_mithril.MithrilProperty<string>, text) {
        this.error(true);
        this.loading(false);
        field(text);
    }

    clearErrors() {
        this.error(false);
        this.loading(false);
        this.username.error('');
        this.password.error('');
        this.errorMessage('');
    }

    static controller() {
        return new LoginRender();
    }

    static view(ctrl:LoginRender) {
        return ctrl.view();
    }

}
