/// <reference path="../../../typings/tsd.d.ts" />
import {ParseUtil} from './parse';
import {BaseRender} from './base';
import {AuthWrapper} from './login/auth';
import {LoginRender} from './login/login';
import {LogoutRender} from './login/logout';
import {BaseLayoutRender} from './baselayout/base.layout';
import {RegisterRender} from './register/register';
import {RegistrationCompleteRender} from './register/complete';


export var Render = {
    start: function () {
        m.route.mode = 'hash';
        m.route(document.body, '/b/74yQsZtTL2', {
            '/b/:baseID': BaseRender,
            '/layout/:world/:player': BaseLayoutRender,
            '/layout/:world':  AuthWrapper.wrap(BaseLayoutRender),
            //'/alliance/:world':AllianceRender
            '/login': LoginRender,
            '/login/:username': LoginRender,
            '/logout': LogoutRender,

            // Registration
            '/register': RegisterRender,
            '/register/:id': RegisterRender,
            '/register/:id/:uuid': RegistrationCompleteRender
        });
    }
};
