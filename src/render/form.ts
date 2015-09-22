/// <reference path="../../typings/mithril/mithril.d.ts" />

export var FormUtil = {
    input: (label:string, prop, error) => {
        var base = m('div.Input', [
            m('input', {onchange: m.withAttr('value', prop), value: prop()}),
            m('label', {id: `Input-Label`}, label)
        ]);
        var errorMessage = error();
        if (errorMessage && errorMessage.length > 0) {
            base.children.push(m('span.Input-Error', errorMessage));
            base.attrs.className += ' Input--Error'
        }
        return base;
    },
    password: (label:string, prop:_mithril.MithrilProperty<String>, error:_mithril.MithrilProperty<String>) => {
        var base = m('div.Input.Input-Password', [
            m('label', {id: `Input-Label`}, label),
            m('input', {onchange: m.withAttr('value', prop), value: prop(), type:'password'})
        ]);
        var errorMessage = error();
        if (errorMessage && errorMessage.length > 0) {
            base.children.push(m('span.Input-Error', errorMessage));
            base.attrs.className += ' Input--Error'
        }
        return base;
    }
}
