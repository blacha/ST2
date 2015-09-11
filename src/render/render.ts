/// <reference path="../../typings/tsd.d.ts" />

import {BaseRender} from './base';

export var Render = {
    start: function () {
        (<any>m.route).mode = 'hash';
        m.route(document.body, '/base/TKqExd6pdo', {
            '/base/:baseID': BaseRender
        });
    }
};