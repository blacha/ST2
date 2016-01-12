import {ParseWebUtil} from '../parse';
import {Base} from '../../../lib/base';
import {Tile} from '../../../lib/base/tile';
import {Log} from "../../../lib/log/log";
import {ParseJSONWorldObject} from "../../../lib/objects/world";
import {ParseJSONLayoutObject} from "../../../lib/objects/layout";

import * as Layout from '../layout/layout';
import * as Format from '../format';
import {RenderBuildingTile} from "../base/tile";

var $log = Log.child({route: 'BaseLayout'});
import {TableController, renderTable} from '../ui/table/table';
import {TableCol} from '../ui/table/table.col';

import {COLS} from './base.layout.cols';

export class BaseLayoutRender implements TableController {
    private worldID;
    private world:_mithril.MithrilProperty<ParseJSONWorldObject>;
    private layouts:_mithril.MithrilProperty<ParseJSONLayoutObject[]>;
    public currentSort:TableCol = COLS[0];

    constructor() {
        this.worldID = m.prop(parseInt(m.route.param('world'), 10));
        this.world = <any>m.prop({});
        this.layouts = <any>m.prop([]);

        ParseWebUtil.query('World', {world: this.worldID()}, $log).then((result) => {
            this.world(result.results[0]);
        });

        ParseWebUtil.query('Layout', {world: this.worldID()}, $log).then((result) => {
            var layouts = result.results;
            layouts.forEach((layout:ParseJSONLayoutObject) => {
                layout.$base = Base.load(layout);
            });

            this.layouts(layouts.sort(this.sortLayouts.bind(this)));
        })
    }

    static controller() {
        return new BaseLayoutRender();
    }

    static view(ctrl:BaseLayoutRender) {
        return ctrl.view();
    }

    view() {
        return Layout.createLayout({
            page: 'Layout'
        }, [
            m('div.LayoutInfo', this.viewLayoutTitle()),
            m('div.Layouts',
                this.renderLayouts()
            )
        ]);
    }

    viewLayoutTitle() {
        var breadCrumb = [];

        breadCrumb.push(
            m('button.LayoutInfo-World.Button', {
                onclick: null
            }, this.world().name)
        );

        var output =  [
            m('div.LayoutInfo-Title', breadCrumb)
        ];

        return output;
    }

    renderLayouts() {
        return renderTable(COLS, this.layouts(), this);
    }

    isBiggestValue(key:string, value:number) {
        return false;
    }

    setSortCol(col:TableCol) {
        if (this.currentSort === col) {
            this.currentSort.swapSortOrder();
        } else {
            this.currentSort = col;
            this.currentSort.resetSortOrder();
        }

        var sorted = this.layouts().sort(this.sortLayouts.bind(this));
        this.layouts(sorted);
    }

    sortLayouts(a, b) {
        var valA = this.currentSort.getSortValue(a, this);
        var valB = this.currentSort.getSortValue(b, this);

        if (valA === valB) {
            return 0;
        }

        if (valA > valB) {
            return this.currentSort.order;
        }

        return -1 * this.currentSort.order;
    }
}

