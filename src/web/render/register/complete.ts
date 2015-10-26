/// <reference path="../../../../typings/mithril/mithril.d.ts" />

import {ParseUtil} from '../parse';
import {FormUtil, FormInputState} from '../form';
import {RegisterRender} from './register';

var EMAIL_REGEX = /.+@.+\..+/;

export class RegistrationCompleteRender {

    private email: FormInputState;
    private password: FormInputState;
    private passwordAgain: FormInputState;

    private loading:_mithril.MithrilProperty<boolean>;
    private invalid:_mithril.MithrilProperty<boolean>;
    private registering:_mithril.MithrilProperty<boolean>;

    private error:_mithril.MithrilProperty<boolean>;
    private errorMessage:_mithril.MithrilProperty<string>;
    private verify:_mithril.MithrilProperty<any>;

    constructor() {
        this.password = new FormInputState();
        this.password.type('password');

        this.passwordAgain = new FormInputState();
        this.passwordAgain.type('password');

        this.email = new FormInputState();

        this.loading = m.prop(true);

        this.error = m.prop(false);
        this.errorMessage = m.prop('');
        this.verify = m.prop({});
        this.invalid = m.prop(false);
        this.registering = m.prop(false);

        ParseUtil.func('verify_get', {uuid: m.route.param('uuid') }).then((data) => {
            this.loading(false);
            console.log('verify-data', data);
            this.verify(data);
        }, () => {
            this.invalid(true);
        });
    }

    register() {
        this.clearErrors();

        var email = this.email.value();
        console.log(email);
        if (email == null || email.match(EMAIL_REGEX) == null) {
            this.setError(this.email, 'Invalid email');
            return false;
        }

        var password = this.password.value();
        if (password != this.passwordAgain.value()) {
            this.setError(this.password, 'Passwords do not match');
            return false;
        }
        if (password == null || password == '') {
            this.setError(this.password, 'Password is required');
            return false;
        }

        this.registering(true);
        m.redraw();

        ParseUtil.func('verify_done', {
            uuid: m.route.param('uuid'),
            username: email,
            password: password
        }).then((data) => {
            this.registering(false);
            m.route(`/login/${this.verify().player}`);
        }, (err:any) => {
            this.registering(false);
            try {
                 err = JSON.parse(err.error);
            } catch(e) {

            }
            this.error(true);
            this.errorMessage(err.message);
            console.log('error', err)
        });
        return false;
    }

    view() {
        if (this.loading()) {
            return m('div.LoginForm', [
                RegisterRender.LOGO,
                m('div.Card.BoxShadow', [
                    m('div.Card-SupportingText.TextCenter', 'Loading...')
                ])
            ]);
        }

        if (this.invalid()) {
            return m('div.LoginForm', [
                RegisterRender.LOGO,
                m('div.Card.BoxShadow', [
                    m('div.Card-SupportingText.TextCenter',
                        m('div.LoginForm-ErrorMessage', ['Loading...']))
                ])
            ]);
        }
        var loginClass = ['LoginForm'];
        if (this.error()) {
            loginClass.push(RegisterRender.CSS.ERROR);
        }
        if (this.loading()) {
            loginClass.push(RegisterRender.CSS.LOADING);
        }

        var boundRegister = this.register.bind(this);

        var formInput = m('div.Card-SupportingText', [
            m('div.LoginForm-ErrorMessage', this.errorMessage()),
            FormUtil.input('Email', this.email),
            FormUtil.input('Password', this.password),
            FormUtil.input('Password Again', this.passwordAgain),
        ]);

        var formAction = m('div.Card-Actions', [
            m('button', {
                className: 'Button Button--primary',
                disabled: this.registering(),
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

    setError(field:FormInputState, text) {
        this.error(true);
        this.loading(false);
        field.error(text);
    }

    clearErrors() {
        this.error(false);
        this.loading(false);
        this.password.error('');
        this.email.error('');
        this.errorMessage('');
    }

    static controller() {
        return new RegistrationCompleteRender();
    }

    static view(ctrl:RegistrationCompleteRender) {
        return ctrl.view();
    }
}