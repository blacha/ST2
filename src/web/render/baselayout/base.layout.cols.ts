import {TableCol} from "../ui/table/table.col";
import {ParseJSONLayoutObject} from "../../../lib/objects/layout";

import * as Format from '../format';
import {RenderBuildingTile} from "../base/tile";

function getData(data) {
    return data;
}

var LocationCol = new TableCol('Base', getData, {
    formatter: (data) => {
        return m('a', {
            href: '/b/' + data.id
        }, data.x + ':' + data.y);
    },
    sorter: (data) => {
        return data.x;
    }
});

var LayoutCol = new TableCol('Layout', getData, {
    formatter: (data) => {
        return m('div.BuildingTiles.BuildingTiles--Small', data.$base.buildingsForEach(RenderBuildingTile.bind(null, false)))
    },
    sorter: (data) => {
        return data.x;
    }
});


var LastUpdatedCol = new TableCol('Last Seen', 'updatedAt', {
    formatter: Format.formatTimeAgo
});

var LastSeenCol = new TableCol('Found by', 'player', {
    formatter: (str) => {
        return m('a', {
                href: `#/layout/${m.route.param('world')}/${str}`
            }, str);
    }
});

export var COLS = [
    LocationCol,
    LayoutCol,
    LastUpdatedCol,
    LastSeenCol
];