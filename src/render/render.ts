/// <reference path="../../typings/tsd.d.ts" />

import {BaseRender} from './base';

export var Render = {
    start: function () {
        (<any>m).mount(document.body, BaseRender);
    }
};