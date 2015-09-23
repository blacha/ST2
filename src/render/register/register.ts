/// <reference path="../../../typings/mithril/mithril.d.ts" />

import {ParseUtil} from '../parse';
import {FormUtil, FormInputState} from '../form';

export class RegisterRender {
    static LOGO = m('div.STLogo');
    static CSS = {
        LOADING: 'LoginForm--Loading',
        ERROR: 'is-invalid'
    };

    private username:FormInputState;
    private world:FormInputState;
    private loading:_mithril.MithrilProperty<boolean>;

    private error:_mithril.MithrilProperty<boolean>;
    private errorMessage:_mithril.MithrilProperty<string>;

    constructor() {
        this.username = new FormInputState();
        this.world = new FormInputState();

        this.loading = m.prop(false);

        this.error = m.prop(false);
        this.errorMessage = m.prop('')
    }

    view() {
        var loginClass = ['LoginForm'];
        if (this.error()) {
            loginClass.push(RegisterRender.CSS.ERROR);
        }
        if (this.loading()) {
            loginClass.push(RegisterRender.CSS.LOADING);
        }

        var boundRegister = this.register.bind(this);

        var formInput = m('div.Card-SupportingText', [
            m('div', 'Please enter your CNC:TA player name.'),
            m('div.LoginForm-ErrorMessage', this.errorMessage()),
            FormUtil.input('Player Name', this.username),
            FormUtil.input('World', this.world)
        ]);

        var formAction = m('div.Card-Actions', [
            m('button', {
                className: 'Button Button--secondary',
                disabled: this.loading(),
                type: 'button',
                onclick: function () {
                    return m.route('/login');
                }
            }, 'Login'),

            m('button', {
                className: 'Button Button--primary',
                disabled: this.loading(),
                type: 'submit',
                onclick: boundRegister
            }, 'Register')
        ]);

        return m('div', {
            className: loginClass.join(' ')
        }, [
            RegisterRender.LOGO,
            m('div.Card.BoxShadow', [
                m('form', {
                    onsubmit: boundRegister
                }, [
                    formInput,
                    formAction
                ])
            ])
        ])
    }

    register() {
        this.clearErrors();
        this.loading(true);
        if (this.username.value().trim() === '') {
            this.setError(this.username.error, 'Username is required');
            return;
        }

        if (this.world.value().trim() === '') {
            this.setError(this.world.error, 'Password is required');
            return;
        }

        ParseUtil.login(this.username.value(), this.world.value()).then(function loginGood(data) {
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
        this.world.error('');
        this.errorMessage('');
    }

    static controller() {
        return new RegisterRender();
    }

    static view(ctrl:RegisterRender) {
        return ctrl.view();
    }

}
