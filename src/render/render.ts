/// <reference path="../../typings/tsd.d.ts" />

import {BaseRender} from './base';
import {LoginRender} from './login/login';
import {RegisterRender} from './register/register';

export var Render = {
    start: function () {
        m.route.mode = 'hash';
        m.route(document.body, '/74yQsZtTL2', {
            '/b/:baseID': BaseRender,
            '/layout': null,
            '/login': LoginRender,
            '/register': RegisterRender
        });
    }
};
