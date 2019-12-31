import {
    CityScannerUtil,
    CityUtil,
    ClientLibStatic,
    QxStatic,
    RegionObject,
    VisObjectType,
    WebFrontEndStatic,
    QxComposite,
    QxButton,
    PlayerAreaViewMode,
} from '@cncta/clientlib';
import { BaseBuilder, BaseExporter, Config } from '@st/shared';
import { St, StState } from '../../st';
import { StModuleBase } from '../module.base';
import { CityCache } from '../city.cache';
import { StModuleState } from '../module';

// Visit base can be used on anything in range
// qx.core.Init.getApplication().getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmAllianceBase, cities.get_CurrentCityId(),0,0)

declare const ClientLib: ClientLibStatic;
declare const webfrontend: WebFrontEndStatic;
declare const qx: QxStatic;

function isQxComposite(x: any): x is QxComposite {
    return x != null && x.basename == 'Composite';
}

export class ButtonScan extends StModuleBase {
    name = 'ButtonScan';
    oldFunction: Function | null = null;

    isStarted = false;
    buttons: QxButton[] = [];
    composite: QxComposite | null = null;
    lastBaseId: number | null = null;

    async start(): Promise<void> {
        this.state = StModuleState.Starting;
        const regionCity = webfrontend.gui.region.RegionCityMenu.prototype;
        const oldFunction = (this.oldFunction = regionCity.showMenu);
        /* eslint-disable @typescript-eslint/no-this-alias */
        const self = this;
        regionCity.showMenu = function(selectedBase: RegionObject) {
            if (!self.isStarted) {
                self.registerButtons(this);
            }

            const currentId = selectedBase.get_Id?.();
            if (currentId == null) {
                self.buttons.forEach(b => b.exclude());
                self.lastBaseId = null;
                return;
            }

            if (currentId == self.lastBaseId) {
                return;
            }

            self.buttons.forEach(b => b.exclude());
            self.lastBaseId = currentId;

            switch (selectedBase.get_VisObjectType()) {
                case VisObjectType.RegionNPCBase:
                case VisObjectType.RegionNPCCamp:
                case VisObjectType.RegionCityType:
                    self.waitForBaseReady();
                    break;
            }
            oldFunction.call(this, selectedBase);
        };
        this.state = StModuleState.Started;
    }

    /** Enable the button if/when it can be enabled. */
    private async waitForBaseReady() {
        const waitId = this.lastBaseId;
        if (waitId == null) {
            return;
        }

        // Accept cached data up to 5 minutes old
        const cached = CityCache.get(waitId, 5 * 60 * 1000);
        if (cached == null) {
            const city = await CityUtil.waitForCity(waitId);
            if (city == null) {
                return;
            }
        }

        if (waitId == this.lastBaseId) {
            this.buttons.forEach(b => b.show());
        }
    }

    registerButtons(obj: any) {
        this.isStarted = true;
        for (const funcName in obj) {
            const composite = obj[funcName];
            if (!isQxComposite(composite)) {
                continue;
            }

            const button = new qx.ui.form.Button('Scan', `${Config.api.url}/${Config.icon}`) as QxButton;

            button.getChildControl('icon').set({ width: 16, height: 16, scale: true }); // Force icon to be 16x16 px
            button.addListener('execute', async () => {
                if (this.lastBaseId == null) {
                    return;
                }
                const city = await CityUtil.waitForCity(this.lastBaseId);
                if (city == null) {
                    return;
                }
                const cityObj = CityScannerUtil.get(city);
                if (cityObj == null) {
                    return;
                }
                CityCache.set(cityObj.cityId, cityObj);
                const base = BaseBuilder.load(cityObj);
                window.open(`${Config.api.url}/base/${BaseExporter.toCncOpt(base)}`, '_blank');
                qx.core.Init.getApplication()
                    ?.getPlayArea()
                    ?.setView(PlayerAreaViewMode.pavmAllianceBase, this.lastBaseId, 0, 0);
            });
            composite.add(button);
            this.buttons.push(button);
        }
    }

    async stop(): Promise<void> {
        this.state = StModuleState.Stopping;
        if (this.oldFunction) {
            webfrontend.gui.region.RegionCityMenu.prototype.showMenu = this.oldFunction;
            this.oldFunction = null;
        }

        for (const button of this.buttons) {
            button.destroy();
        }
        this.buttons = [];
        this.state = StModuleState.Stopped;
    }
}
