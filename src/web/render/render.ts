/// <reference path="../../../typings/tsd.d.ts" />
import {ParseWebUtil} from './parse';
import {BaseRender} from './base';
import {WrapAuth} from './login/auth';
import {LoginRender} from './login/login';
import {LogoutRender} from './login/logout';
import {BaseLayoutRender} from './baselayout/base.layout';
import {RegisterRender} from './register/register';
import {RegistrationCompleteRender} from './register/complete';
import {AllianceWorldSelector} from "./alliance/alliance.world.select";
import {AlliancePlayers} from "./alliance/alliance.players";


export var Render = {
    start: function () {
        m.route.mode = 'hash';
        m.route(document.body, '/alliance', {
            '/b/:baseID': WrapAuth(BaseRender),
            '/layout/:world/:player': WrapAuth(BaseLayoutRender),
            '/layout/:world': WrapAuth(BaseLayoutRender),

            '/alliance': WrapAuth(AllianceWorldSelector),
            '/alliance/:world': WrapAuth(AlliancePlayers),

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
