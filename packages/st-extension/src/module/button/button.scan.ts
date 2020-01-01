import {
    CityScannerUtil,
    CityUtil,
    ClientLibStatic,
    PlayerAreaViewMode,
    QxComposite,
    QxFormButton,
    QxStatic,
    RegionObject,
    VisObjectType,
    WebFrontEndStatic,
} from '@cncta/clientlib';
import { BaseBuilder, BaseExporter, Config } from '@st/shared';
import { CityCache } from '../city.cache';
import { StModuleBase } from '../module.base';

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
    buttons: QxFormButton[] = [];
    composite: QxComposite | null = null;
    lastBaseId: number | null = null;

    async onStart(): Promise<void> {
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

            const button = new qx.ui.form.Button('Scan', `${Config.api.url}/${Config.icon}`) as QxFormButton;

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
                qx.core.Init.getApplication()
                    ?.getPlayArea()
                    ?.setView(PlayerAreaViewMode.pavmAllianceBase, this.lastBaseId, 0, 0);
                const baseId = await CityCache.set(cityObj.cityId, cityObj, true);
                window.open(`${Config.api.url}/base/${baseId}`, '_blank');
            });
            composite.add(button);
            this.buttons.push(button);
        }
    }

    async onStop(): Promise<void> {
        if (this.oldFunction) {
            webfrontend.gui.region.RegionCityMenu.prototype.showMenu = this.oldFunction;
            this.oldFunction = null;
        }

        for (const button of this.buttons) {
            button.destroy();
        }
        this.buttons = [];
    }
}
