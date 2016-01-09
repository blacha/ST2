/// <reference path="../../../../typings/mithril/mithril.d.ts" />

import {ParseWebUtil} from '../parse';
import {FormUtil, FormInputState, SelectFormInputState} from '../form';
import {Log} from "../../../lib/log/log";
import {ParseJSONWorldObject} from "../../../lib/objects/world";

var $log = Log.child({route: 'Register'});
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
    private worlds:ParseJSONWorldObject[];

    constructor() {
        if (ParseWebUtil.token()) {
            m.route('/');
            return;
        }
        this.player = new FormInputState();
        this.world = new SelectFormInputState();

        this.loadingWorlds = m.prop(true);
        this.loading = m.prop(false);

        this.error = m.prop(false);
        this.errorMessage = m.prop('');

        ParseWebUtil.query('World', {hasBot: true}, $log).then((result) => {
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
        if (m.route.param('id')) {
            return m('div.LoginForm', [
                RegisterRender.LOGO,
                m('div.Card.BoxShadow', [
                    m('div.Card-SupportingText', 'Thank you for registering, a message containing your login details will be sent to you in CNC:TA.'),
                    m('div.Card-SupportingText', 'This process may take up to a hour.'),
                    m('div.Card-SupportingText', 'Please install the shockrtools extension'),
                    m('div.Card-Actions', [
                        m('button', {
                            className: 'Button Button--secondary',
                            onclick: m.route.bind(null, '/install', null)
                        }, 'Install')
                    ]),

                ])
            ])
        } else {
            return this.viewRegister();
        }
    }

    viewRegister() {
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
                onclick: m.route.bind(null, '/login', null)
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

        ParseWebUtil.func('verify_create', object, $log).then((data) => {
            m.route('/register/' + data.id);
        }, (err) => {
            console.log(err);
            this.clearErrors();
            this.setError(this.player.error, (<any>err).error);
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
