/// <reference path="../../typings/mithril/mithril.d.ts" />

export var FormUtil = {
    input: (label:string, prop, error) => {
        var base = m('div.TextInput', [
            m('input', {onchange: m.withAttr('value', prop), value: prop()}),
            m('label', {className: `TextInput-Label`}, label)
        ]);
        var errorMessage = error();
        if (errorMessage && errorMessage.length > 0) {
            base.children.push(m('span.TextInput-Error', errorMessage));
            base.attrs.className += ' TextInput--Error'
        }
        return base;
    },
    password: (label:string, prop:_mithril.MithrilProperty<String>, error:_mithril.MithrilProperty<String>) => {
        var base = m('div.TextInput.TextInput-Password', [
            m('input', {onchange: m.withAttr('value', prop), value: prop(), type:'password'}),
            m('label', {className: `TextInput-Label`}, label)
        ]);
        var errorMessage = error();
        if (errorMessage && errorMessage.length > 0) {
            base.children.push(m('span.TextInput-Error', errorMessage));
            base.attrs.className += ' TextInput--Error'
        }
        return base;
    }
}
