var LAYOUT_ICON = m('div.', m('i.icon-logo'));

export function LayoutHeader(config) {

    return m('header.Wrapper.Grid.LayoutHeader', [
        m('div.Cell--1.Cell--offset-2', LAYOUT_ICON),
        m('div.Cell--9', LayoutNavigation(config))
    ]);
}

function LayoutNavLink(config, link) {
    var selected = '';
    if (config.page == link) {
        selected = 'NavLink--selected';
    }
    return m('li', {
        className: `NavLink ${selected}`
    }, [
        m('a', {href: `#/${link.toLowerCase()}`}, link)
    ]);
}

function LayoutNavigation(config) {
    //return null;
      return m('ul.NavLink-Group', [
        LayoutNavLink(config, 'Base'),
        LayoutNavLink(config, 'Layout'),
        LayoutNavLink(config, 'Alliance'),
    ]);
}

export function createLayout(config, content) {
    config = config || {page: 'Base'};
    return [
        LayoutHeader(config),
        m('div', {className: 'Content Wrapper Grid'}, content)
    ];
}