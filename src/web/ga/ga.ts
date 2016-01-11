import MithrilRoutes = _mithril.MithrilRoutes;
declare var ga:any;

var init = false;
function createGA() {
    if (init) {
        return;
    }
    ga('create', 'UA-39641775-3', 'auto');
    init = true;
}

export function TrackGAController(controller) {
    return function () {
        ga('send', 'pageview', {page: m.route()});
        return controller.apply(this, arguments);
    }
};


export function TrackRoutes(routes):MithrilRoutes<any> {
    createGA();
    var map = {};
    for (var key in routes) {
        map[key] = {
            controller: TrackGAController(routes[key].controller),
            view: routes[key].view
        };
    }

    return <MithrilRoutes<any>>(<any>map);
}