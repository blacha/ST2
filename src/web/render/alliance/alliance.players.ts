import {ParseAllianceObject} from "../../../lib/objects/alliance";
import {ParsePlayerObject} from "../../../lib/objects/player";

import {ParseWebUtil} from '../parse';
import {Log} from "../../../lib/log/log";
import {ParseWorldObject} from "../../../lib/objects/world";
import {buildTable} from  './alliance.table';

var $log = Log.child({route: 'AlliancePlayers'});

export class AlliancePlayers {
    private alliance:_mithril.MithrilProperty<ParseAllianceObject>;
    private players:_mithril.MithrilProperty<ParsePlayerObject[]>;
    private worldID:number;

    constructor() {
        this.alliance = <any>m.prop();
        this.players = m.prop([]);
        this.worldID = parseInt(m.route.param('world'), 10);
        $log.info({world: this.worldID, param: m.route.param('world')}, 'invalid worldID');

        if (this.worldID == null || isNaN(this.worldID)) {
            $log.info({world: this.worldID, param: m.route.param('world')}, 'invalid worldID');
            //m.route('/alliance');
        }

        ParseWebUtil.query('Alliance', {world: this.worldID}, $log).then((data) => {
            this.alliance(data.results[0]);
            if (this.alliance() == null) {
                $log.info(data, 'Alliance not found');
            }
        });

        ParseWebUtil.query('Player', {world: this.worldID}, $log).then((data) => {
            this.players(data.results);
        });
    }

    view() {
        if (this.alliance() == null) {
            return;
        }
        if (this.players().length === 0) {
            return;
        }
        $log.info('render');
        $log.info({alliance: this.alliance(), players: this.players()});

        return buildTable(this.players());
    }

    static controller() {
        return new AlliancePlayers();
    }

    static view(ctrl:AlliancePlayers) {
        return ctrl.view();
    }
}