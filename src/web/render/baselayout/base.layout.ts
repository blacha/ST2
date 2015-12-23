import {ParseWebUtil} from '../parse';
import {Base} from '../../../lib/base';
import {Tile} from '../../../lib/base/tile';
import {Log} from "../../../lib/log/log";

var $log = Log.child({route: 'BaseLayout'});

export class BaseLayoutRender {
    private worldID;
    private world;
    private layouts;

    constructor() {
        this.worldID = m.prop(parseInt(m.route.param('world'), 10));
        this.world = m.prop();
        this.layouts = m.prop([]);

        ParseWebUtil.query('World', {world: this.worldID()}, $log).then((result) => {
            console.log('World', result.results);
            this.world(result.results[0]);
        });

        ParseWebUtil.query('Layout', {world: this.worldID()}, $log).then((result) => {
            console.log('Layout', result.results);
            var layout = result.results;
            this.layouts(layout.map(function (layout) {
                return Base.load(layout);
            }));
        })
    }

    static controller() {
        return new BaseLayoutRender();
    }

    static view(ctrl:BaseLayoutRender) {
        return ctrl.view();
    }

    view() {
        console.log('RenderBase');
        return m('div', [
            this.world().name,
            this.renderLayouts()
        ]);
    }

    renderLayouts() {
        var layouts = this.layouts();
        var output = m('div.BaseLayouts');

        output.children = layouts.map((layout:Base) => {
            var location = layout.getLocation()
            return m(`div.BaseLayout.BaseLayout-${location.x}-${location.y}`, BaseLayoutRender.renderLayout(layout));
        });

        return output;
    }

    static renderLayout(layout:Base) {
        var output = [];
        layout.baseForEach((x, y, building, tile, base) => {
            output.push(m(`div.BaseTile.BaseTile-`));
            console.log(x, y, tile)
        });
        return m('div.BaseLayoutGrid', output);
    }
}