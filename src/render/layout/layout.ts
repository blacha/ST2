var LAYOUT_ICON = m('div.', m('i.icon-logo'));

export function LayoutHeader(config) {

    return m('header.LayoutHeader.Wrapper.Grid', [
        m('div.Cell--1.Cell--offset-2', LAYOUT_ICON),
        m('div.Cell--9', LayoutNavigation(config)),
        //m('div.Grid-cell.content-1of1'),
        //m('div.Grid-cell.content-1of1'),
        //m('div.Grid-cell.content-1of1')

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
        m('div', {className: 'Wrapper Grid'}, content)
    ];
}