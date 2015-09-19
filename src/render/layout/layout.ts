var LAYOUT_ICON = m('i.icon-logo');

export function LayoutHeader(config) {

    return m('header.LayoutHeader', [
        m('div.row', [
            m('div.col-lg-2'),
            m('div.col-lg-1', LAYOUT_ICON),
            m('div.col-lg-5', LayoutNavigation(config))
        ])
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
    return null;
    //  m('ul.NavLink-Group', [
    //    LayoutNavLink(config, 'Base'),
    //    LayoutNavLink(config, 'Layout'),
    //    LayoutNavLink(config, 'Players')
    //]);
}

export function createLayout(config, content) {
    config = config || {page: 'Base'};
    return [
        LayoutHeader(config),
        m('div.Content', content)
    ];
}