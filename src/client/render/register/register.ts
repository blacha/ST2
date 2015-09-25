/// <reference path="../../../../typings/mithril/mithril.d.ts" />

import {ParseUtil} from '../parse';
import {FormUtil, FormInputState, SelectFormInputState} from '../form';

export interface ParseObject {
    createdAt: string;
    updatedAt: string;
    id: string;
}

export interface WorldObj extends ParseObject {
    world:number;
    name:string;
    hasBot:boolean;
}

export class RegisterRender {
    static LOGO = m('div.STLogo.BoxShadow');
    static CSS = {
        LOADING: 'LoginForm--Loading',
        ERROR: 'is-invalid'
    };

    private player:FormInputState;
    private world:SelectFormInputState;

    private loadingWorlds:_mithril.MithrilProperty<boolean>;
    private loading:_mithril.MithrilProperty<boolean>;

    private error:_mithril.MithrilProperty<boolean>;
    private errorMessage:_mithril.MithrilProperty<string>;
    private worlds:WorldObj[];

    constructor() {
        this.player = new FormInputState();
        this.world = new SelectFormInputState();

        this.loadingWorlds = m.prop(true);
        this.loading = m.prop(false);

        this.error = m.prop(false);
        this.errorMessage = m.prop('');

        ParseUtil.query('World', {hasBot: true}).then((result) => {
            this.loadingWorlds(false);
            this.worlds = result.results;

            this.worlds = this.worlds.sort(function (a, b) {
                return (+new Date(b.createdAt)) - (+new Date(a.createdAt));
            });

            this.world.options(this.worlds.map((world) => {
                return {
                    key: world.name,
                    value: world.world + ''
                }
            }));

            m.redraw();
        });
    }

    view() {
        if (this.loadingWorlds()) {
            return m('div.LoginForm.LoginForm--Loading', [
                RegisterRender.LOGO,
                m('div.Card.BoxShadow')
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
            FormUtil.input('Player Name', this.player),
            FormUtil.selectList('World', this.world)
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
                    m('div.Card-SupportingText', 'Please enter your CNC:TA player name.'),
                    formInput,
                    formAction
                ])
            ])
        ])
    }

    register() {
        this.clearErrors();
        this.loading(true);
        if (this.player.value().trim() === '') {
            this.setError(this.player.error, 'Player name is required');
            return;
        }

        if (this.world.value().trim() === '') {
            this.setError(this.world.error, 'world is required');
            return;
        }

        var object = {
            player: this.player.value(),
            world: this.world.value()
        };

        ParseUtil.create('Verify', object).then(function loginGood(data) {
            console.log('login-good', data);
            m.route('/register/' + data.id);
        }, () => {
            this.clearErrors();
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
        this.player.error('');
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
