import {ParseWebUtil} from '../parse';
import {Log} from "../../../lib/log/log";
import {ParseWorldObject} from "../../../lib/objects/world";
import {ParseAllianceObject} from "../../../lib/objects/alliance";
import * as Layout from '../layout/layout';
import {RegisterRender} from "../register/register";

var $log = Log.child({route: 'Install'});

export class InstallExtension {


    constructor() {
    }


    openChromeExtensionWindow() {
        return window.open('https://chrome.google.com/webstore/detail/shockrtools/mbefcddbnincfckgaibjofepdhcgdhol');
    }

    openUserScriptWindow() {
        return window.open('http://chard.nz/st2/client/st2.user.js');
    }

    view() {
        return  m('div.LoginForm', [
            RegisterRender.LOGO,
            m('div.Card.BoxShadow', [
                m('div.Card-SupportingText', 'To install the shockr tools extension please click the install button for your browser'),
                m('div.Card-SupportingText', 'Chrome'),
                m('div.Card-SupportingText', [
                    m('button', { className: 'Button Button--secondary', disabled: true, onclick: this.openChromeExtensionWindow }, 'Extension'),
                    m('button', {
                        className: 'Button Button--secondary',
                        onclick: this.openUserScriptWindow
                    }, 'UserScript')
                ]),
                m('div.Card-SupportingText',  'Firefox'),
                m('div.Card-SupportingText',  m('button', {
                    className: 'Button Button--secondary',
                    onclick: this.openUserScriptWindow
                }, 'UserScript')
                ),
            ])
        ]);
    }


    static controller() {
        return new InstallExtension();
    }

    static view(ctrl:InstallExtension) {
        return ctrl.view();
    }
}