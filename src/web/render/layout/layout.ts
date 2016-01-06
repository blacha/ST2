var LAYOUT_ICON = m('div.', m('i.icon-logo'));
import {ParseWebUtil} from '../parse';
export var LOADING = m.prop();

export function LayoutHeader(config) {

    return m('header.Wrapper.Grid.LayoutHeader', [
        LAYOUT_ICON,
        LayoutNavigation(config),
        LayoutUser(config)
    ]);
}
function LayoutUser(config) {
    return m('div.UserGroup', [
        m('div.UserGroup-Item.UserGroup-Username', ParseWebUtil.user()),
        m('a.UserGroup-Item.UserGroup-Logout', {
            href: '#',
            onclick: m.route.bind(m.route, '/logout', null)
        }, 'logout')
    ]);
}

function LayoutNavLink(config, link) {
    var selected = '';
    if (config.page == link) {
        selected = 'NavGroup-Link--selected';
    }
    return m('div', {
        onclick: function () {
            if (selected != '') {
                return;
            }
            m.route(link.toLowerCase());
        },
        className: `NavGroup-Link ${selected}`
    }, link);

}

function LayoutNavigation(config) {
    //return null;
    return m('nav.NavGroup', [
        //LayoutNavLink(config, 'Base'),
        //LayoutNavLink(config, 'Layout'),
        LayoutNavLink(config, 'Alliance'),
    ]);
}

export function createLayout(config, content) {
    config = config || {page: 'Base'};
    if (LOADING() === true) {
        return [
            LayoutHeader(config)
        ]
    }
    return [
        LayoutHeader(config),
        m('div', {className: 'Content Wrapper Grid'}, content)
    ];
}