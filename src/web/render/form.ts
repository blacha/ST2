/// <reference path="../../../typings/mithril/mithril.d.ts" />

export class FormInputState {
    public focused:_mithril.MithrilProperty<boolean>;
    public error:_mithril.MithrilProperty<string>;
    public value:_mithril.MithrilProperty<string>;
    public type:_mithril.MithrilProperty<string>;
    public disabled:_mithril.MithrilProperty<boolean>;

    constructor() {
        this.focused = m.prop(false);
        this.error = m.prop('');
        this.value = m.prop('');
        this.disabled = m.prop(false);

        this.type = m.prop('text');
    }
}

export interface SelectOptions {
    key: string;
    value: string;
}
export class SelectFormInputState extends FormInputState {
    public options:_mithril.MithrilProperty<Array<SelectOptions>>;
    public open:_mithril.MithrilProperty<boolean>;

    constructor() {
        super();
        this.options = m.prop([]);
        this.open = m.prop(false);
    }
}
export var FormUtil = {

    CSS: {
        IS_DIRTY: 'is-dirty',
        IS_FOCUSED: 'is-focused',
        IS_DISABLED: 'is-disabled',
        IS_INVALID: 'is-invalid',
        IS_UPGRADED: 'is-upgraded'
    },

    _stateClassList: (state:FormInputState, classList:string[]) => {
        if (state.focused()) {
            classList.push(FormUtil.CSS.IS_FOCUSED);
        }

        if (state.value()) {
            classList.push(FormUtil.CSS.IS_DIRTY);
        }

        if (state.error()) {
            classList.push(FormUtil.CSS.IS_INVALID);
        }
    },

    _textInputClassList: (state:FormInputState) => {
        var classList = ['TextInput', 'TextInput--floating-label'];
        FormUtil._stateClassList(state, classList);

        if (state.type() === 'password') {
            classList.push('Input--Password');
        }

        return classList.join(' ');
    },
    input: (label:string, state:FormInputState) => {
        return m('div', {
            className: FormUtil._textInputClassList(state)
        }, [
            m('input.TextInput-Input', {
                onkeyup: m.withAttr('value', state.value),
                onchange: m.withAttr('value', state.value),
                value: state.value(),
                onfocus: state.focused.bind(null, true),
                onblur: state.focused.bind(null, false),
                type: state.type()
            }),
            m('label.TextInput-Label', label),
            m('span.TextInput-Error', state.error())
        ]);
    },

    selectList: (label:string, state:SelectFormInputState) => {
        var classList = ['SelectInput', 'SelectInput--floating-label'];
        FormUtil._stateClassList(state, classList);
        if (state.open()) {
            classList.push('Menu--Visible');
        }

        var current = '';
        var currentValue = state.value();
        var options = state.options().map(function (option) {
            if (option.value === currentValue) {
                current = option.key;
            }
            return m('li.Menu-Item', {
                value: option.value,
                onclick: function () {
                    state.value(option.value);
                    state.open(false);
                }
            }, option.key);
        });

        if (current === '' && options.length > 0) {
            current = state.options()[0].key;
            state.value(state.options()[0].value);
        }

        return m('div', {
            className: classList.join(' ')
        }, [
            m('button.SelectInput-Input', {
                name: label,
                onchange: m.withAttr('value', state.value),
                value: state.value(),
                onfocus: state.focused.bind(null, true),
                onblur: state.focused.bind(null, false),
                onclick: state.open.bind(null, true),
                type: 'button'
            }, [
                current,
                m('i.material-icons', 'arrow_drop_down')
            ]),
            m('ul.Menu.BoxShadow', options),
            m('label.SelectInput-Label', label),
            m('span.SelectInput-Error', state.error())
        ])
    }
}
