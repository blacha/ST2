/// <reference path="../../typings/tsd.d.ts" />

import {BaseRender} from './base';

export var Render = {
    start: function () {
        m.route.mode = 'hash';
        m.route(document.body, '/base/74yQsZtTL2', {
            '/base/:baseID': BaseRender
        });
    }
};