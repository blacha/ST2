import {ParseWebUtil} from '../parse';
import {Log} from "../../../lib/log/log";
import {ParseWorldObject} from "../../../lib/objects/world";
import {ParseAllianceObject} from "../../../lib/objects/alliance";
import * as Layout from '../layout/layout';

var $log = Log.child({route: 'AllianceWorldSelector'});

export class AllianceWorldSelector {

    private loadingAlliances;
    private worlds:_mithril.MithrilProperty<ParseWorldObject[]>;
    private alliances:_mithril.MithrilProperty<ParseAllianceObject[]>;
    private worldMap:{[key:string] : ParseWorldObject};

    constructor() {
        this.loadingAlliances = m.prop(true);
        this.alliances = m.prop([]);
        this.worlds = m.prop([]);
        this.worldMap = {};


        ParseWebUtil.query('Alliance', {}, $log).then((allianceData) => {
            allianceData.results.forEach(function(result) {
                result.createdAt = new Date(result.createdAt);
                result.updatedAt = new Date(result.updatedAt);
            });
            this.alliances(allianceData.results.sort((a, b) => {
                return b.updatedAt - a.updatedAt;
            }));
            this.loadingAlliances(false);
        });

        ParseWebUtil.query('World', {}, $log).then((worldData) => {
            worldData.results.forEach((world:ParseWorldObject) => {
                this.worldMap[world.world] = world;
            });
            this.worlds(worldData.results);
        });

    }

    loading() {
        return this.loadingAlliances() || this.worlds().length === 0
    }

    view() {
        if (this.loading()) {
            $log.info('loading');
            return;
        }

        if (this.alliances().length === 0) {
            $log.info('No alliances found');
            return;
        }

        var alliances = this.alliances().map(this.viewAlliance, this);

        return Layout.createLayout({
                page: 'Alliance'
            }, [m('div.AllianceWorldSelect.BoxShadow', [
                m('div.AllianceWorldSelect-Title', 'Select your world'),
                m('div.AllianceWorldSelect-Alliances', alliances)
            ])
        ]);
    }

    viewAlliance(alliance:ParseAllianceObject) {
        var worldObj:ParseWorldObject = this.worldMap[alliance.world];
        if (worldObj == null) {
            return;
        }
        return m(`div.AllianceWorld AllianceWorld-${alliance.world}`, {
            onclick: () => {
                m.route(`/alliance/${alliance.world}`);
            }
        }, [
            m('div.AllianceWorld-World', worldObj.name),
            m('div.AllianceWorld-Name', alliance.name)
        ])
    }


    static controller() {
        return new AllianceWorldSelector();
    }

    static view(ctrl:AllianceWorldSelector) {
        return ctrl.view();
    }
}