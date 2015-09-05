/// <reference path="../../typings/tsd.d.ts" />

import {BaseRender} from './base';

export var Render = {
    start: function() {
        var root = document.body;
        console.log(document.body);
        m.render(root, BaseRender);
    }
};