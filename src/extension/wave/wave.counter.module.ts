import {WaveCounter} from './wave.counter';
import {Log} from '../../lib/log/log';
import {WaveCount} from "./wave.counter";

declare var webfrontend:any;
declare var phe:any;

var WaveCounterUI = {move: null, region: null};
var WaveCounterCache:{[key:string] : WaveCount} = {};

export class WaveCounterModule {
    static listeners = [];
    static log:Log;
    static BINDINGS = [
        webfrontend.gui.region.RegionCityStatusInfoOwn,
        webfrontend.gui.region.RegionCityStatusInfoAlliance,
        webfrontend.gui.region.RegionCityStatusInfoEnemy,
        webfrontend.gui.region.RegionNPCBaseStatusInfo,
        webfrontend.gui.region.RegionNPCCampStatusInfo,
        webfrontend.gui.region.RegionRuinStatusInfo,
        webfrontend.gui.region.RegionPointOfInterestStatusInfo
    ];


    static lastBase;
    static selectedBase;

    static start() {
        WaveCounterModule.log = Log.child({module: 'WaveCounter'});
        WaveCounterModule.log.info('Starting...')

        WaveCounterModule.listeners = [];
        for (var i = 0; i < WaveCounterModule.BINDINGS.length; i++) {
            var bind = WaveCounterModule.BINDINGS[i];
            var bindID = bind.getInstance().addListener('appear', WaveCounterModule.onRegionShow);
            WaveCounterModule.listeners[i] = bindID;
        }

        var mouseTool = ClientLib.Vis.VisMain.GetInstance().GetMouseTool(ClientLib.Vis.MouseTool.EMouseTool.MoveBase);
        phe.cnc.Util.attachNetEvent(mouseTool, 'OnCellChange', ClientLib.Vis.MouseTool.OnCellChange, WaveCounterModule, WaveCounterModule.onBaseMoveChange);
        phe.cnc.Util.attachNetEvent(mouseTool, 'OnDeactivate', ClientLib.Vis.MouseTool.OnDeactivate, WaveCounterModule, WaveCounterModule.onBaseMoveDeActivate);
        phe.cnc.Util.attachNetEvent(mouseTool, 'OnActivate', ClientLib.Vis.MouseTool.OnActivate, WaveCounterModule, WaveCounterModule.onBaseMoveActivate);

        WaveCounterModule.buildRegionUI();
        WaveCounterModule.buildMoveUI();
        WaveCounterModule.registerButton();
    }

    static stop() {
        for (var i = 0; i < WaveCounterModule.BINDINGS.length; i++) {
            var bindID = WaveCounterModule.listeners[i];
            if (bindID !== undefined) {
                WaveCounterModule.BINDINGS[i].getInstance().removeListenerById(bindID);
            }
        }
        WaveCounterModule.listeners = [];

        var mouseTool = ClientLib.Vis.VisMain.GetInstance().GetMouseTool(ClientLib.Vis.MouseTool.EMouseTool.MoveBase);
        phe.cnc.Util.detachNetEvent(mouseTool, 'OnCellChange', ClientLib.Vis.MouseTool.OnCellChange, WaveCounterModule, WaveCounterModule.onBaseMoveChange);
        phe.cnc.Util.detachNetEvent(mouseTool, 'OnDeactivate', ClientLib.Vis.MouseTool.OnDeactivate, WaveCounterModule, WaveCounterModule.onBaseMoveDeActivate);
        phe.cnc.Util.detachNetEvent(mouseTool, 'OnActivate', ClientLib.Vis.MouseTool.OnActivate, WaveCounterModule, WaveCounterModule.onBaseMoveActivate);

        webfrontend.gui.region.RegionCityMoveInfo.getInstance().removeAt(3);
    }

    static getXY() {
        if (WaveCounterModule.selectedBase == null || WaveCounterModule.selectedBase == undefined) {
            return null;
        }
        return {
            x: WaveCounterModule.selectedBase.get_RawX(),
            y: WaveCounterModule.selectedBase.get_RawY()
        }
    }

    static count() {
        var XY = WaveCounterModule.getXY();

        if (XY == null) {
            return;
        }
        return WaveCounter.count(XY.x, XY.y);
    }

    static paste() {
        var XY = WaveCounterModule.getXY();

        if (XY == null) {
            return;
        }
        return WaveCounter.paste(XY.x, XY.y);
    }


    static registerButton() {
        if (!webfrontend.gui.region.RegionCityMenu.prototype.__waveCounter_show_menu) {
            webfrontend.gui.region.RegionCityMenu.prototype.__waveCounter_show_menu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;

            webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selectedVisObject) {
                WaveCounterModule.selectedBase = selectedVisObject;
                if (this.__baseCounterButton_initialized !== true) {
                    this.__baseCounterButton_initialized = true;

                    this.__baseCountButton = new qx.ui.form.Button('Paste BaseCount');
                    this.__baseCountButton.addListener('execute', function () {
                        WaveCounterModule.paste();
                    });
                }


                if (WaveCounterModule.lastBase !== WaveCounterModule.selectedBase) {
                    var count = WaveCounterModule.count();
                    this.__baseCountButton.setLabel('Bases: ' + count.total + ' [' + count.waves + ']');
                    WaveCounterModule.lastBase = WaveCounterModule.selectedBase;
                }
                // console.log(children);
                this.__waveCounter_show_menu(selectedVisObject);
                switch (selectedVisObject.get_VisObjectType()) {
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                    case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                    case ClientLib.Vis.VisObject.EObjectType.RegionRuin:
                    case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
                    case ClientLib.Vis.VisObject.EObjectType.RegionHubServer:
                    case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                        this.add(this.__baseCountButton);
                        break;
                    default:
                        console.log(selectedVisObject.get_VisObjectType());
                }
            };
        }
    }

    static buildMoveUI() {
        WaveCounterUI.move = {total: null, waves: null, levels: null, container: null};

        var a = new qx.ui.container.Composite(new qx.ui.layout.HBox(6));
        a.add(new qx.ui.basic.Label('# Forgotten bases:').set({
            alignY: 'middle'
        }));
        WaveCounterUI.move.total = new qx.ui.basic.Label().set({
            alignY: 'middle',
            font: 'bold',
            textColor: 'text-region-value'
        });
        a.add(WaveCounterUI.move.total);

        WaveCounterUI.move.waves = new qx.ui.basic.Label().set({
            textColor: 'text-region-value'
        });
        a.add(WaveCounterUI.move.waves);

        var b = new qx.ui.container.Composite(new qx.ui.layout.HBox(6));
        b.add(new qx.ui.basic.Label('Levels:').set({
            alignY: 'middle'
        }));
        WaveCounterUI.move.levels = new qx.ui.basic.Label().set({
            alignY: 'middle',
            font: 'bold',
            textColor: 'text-region-value'
        });
        b.add(WaveCounterUI.move.levels);


        WaveCounterUI.move.container = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
            textColor: 'text-region-tooltip'
        });

        WaveCounterUI.move.container.add(a);
        WaveCounterUI.move.container.add(b);
        webfrontend.gui.region.RegionCityMoveInfo.getInstance().addAt(WaveCounterUI.move.container, 3);
    }

    static buildRegionUI() {
        WaveCounterUI.region = {total: null, waves: null, container: null};

        var a = new qx.ui.container.Composite(new qx.ui.layout.HBox(4));
        a.add(new qx.ui.basic.Label('# Forgotten bases:'));
        WaveCounterUI.region.total = new qx.ui.basic.Label().set({
            textColor: 'text-region-value'
        });
        a.add(WaveCounterUI.region.total);

        WaveCounterUI.region.waves = new qx.ui.basic.Label().set({
            textColor: 'text-region-value'
        });
        a.add(WaveCounterUI.region.waves);

        var b = new qx.ui.container.Composite(new qx.ui.layout.HBox(4));
        b.add(new qx.ui.basic.Label('Levels:'));
        WaveCounterUI.region.levels = new qx.ui.basic.Label().set({
            textColor: 'text-region-value'
        });
        b.add(WaveCounterUI.region.levels);

        WaveCounterUI.region.container = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
            marginTop: 6,
            textColor: 'text-region-tooltip'
        });

        WaveCounterUI.region.container.add(a);
        WaveCounterUI.region.container.add(b);
    }

    static getInstance() {
        return WaveCounter;
    }


    static onRegionShow(c) {
        var target = c.getTarget();
        var object = target.getLayoutParent().$get_Object();

        var count = WaveCounter.count(object.get_RawX(), object.get_RawY());

        WaveCounterUI.region.total.setValue(count.total);
        WaveCounterUI.region.levels.setValue(count.formatted);
        WaveCounterUI.region.waves.setValue(' [ ' + count.waves + ' waves ]');

        target.add(WaveCounterUI.region.container);
    }

    static onBaseMoveChange(x, y) {
        var coord = ClientLib.Base.MathUtil.EncodeCoordId(x, y);
        var count = WaveCounterCache[coord];

        if (count === undefined) {
            count = WaveCounter.count(x, y);
            WaveCounterCache[coord] = count;
        }

        WaveCounterUI.move.total.setValue(count.total);
        WaveCounterUI.move.levels.setValue(count.formatted);
        WaveCounterUI.move.waves.setValue(' [ ' + count.waves + ' waves ]');
    }

    static onBaseMoveDeActivate() {
        WaveCounterCache = {};
    }

    static onBaseMoveActivate() {
        WaveCounterCache = {};
    }
}