import {
    ClientLibStatic,
    PlayerAreaViewMode,
    QxComposite,
    QxFormButton,
    QxStatic,
    RegionObject,
    VisObjectType,
    WebFrontEndStatic,
} from '@cncta/clientlib';
import { CityScannerUtil, CityUtil, Duration } from '@cncta/util';
import { Config } from '@st/shared/build/config';
import { StPlugin } from '../../st.plugin';
import { CityCache } from '../../city.cache';

// Visit base can be used on anything in range
// qx.core.Init.getApplication().getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmAllianceBase, cities.get_CurrentCityId(),0,0)

declare const ClientLib: ClientLibStatic;
declare const webfrontend: WebFrontEndStatic;
declare const qx: QxStatic;

function isQxComposite(x: any): x is QxComposite {
    return x != null && x.basename == 'Composite';
}

export class Button extends StPlugin {
    name = 'Button';
    priority = 100;
    oldFunction?: (o: RegionObject) => void;

    isButtonsAdded = false;
    buttons: QxFormButton[] = [];
    composite: QxComposite | null = null;
    lastBaseId: number | null = null;
    lastBaseLinkId: Promise<string> | null = null;

    async onStart(): Promise<void> {
        const regionCity = webfrontend.gui.region.RegionCityMenu.prototype;
        const oldFunction = (this.oldFunction = regionCity.showMenu);
        /* eslint-disable @typescript-eslint/no-this-alias */
        const self = this;
        regionCity.showMenu = function(selectedBase: RegionObject) {
            if (!self.isButtonsAdded) {
                self.registerButtons(this);
            }

            const currentId = selectedBase.get_Id?.();
            if (currentId == null) {
                self.buttons.forEach(b => b.exclude());
                self.lastBaseId = null;
                oldFunction.call(this, selectedBase);
                return;
            }

            if (currentId == self.lastBaseId) {
                oldFunction.call(this, selectedBase);
                return;
            }

            self.buttons.forEach(b => b.exclude());
            self.lastBaseId = currentId;
            self.lastBaseLinkId = null;

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

        const res = CityCache.get(waitId, Duration.minutes(5));
        if (res && res.stId) {
            this.lastBaseLinkId = Promise.resolve(res.stId);
            this.buttons.forEach(b => b.show());
            return;
        }

        const city = await CityUtil.waitForCity(waitId);
        if (city == null) {
            return;
        }

        const cityObj = CityScannerUtil.get(city);
        if (cityObj == null) {
            return;
        }

        const stId = this.st.api.base(cityObj);
        if (waitId != this.lastBaseId) {
            return;
        }

        this.lastBaseLinkId = stId;
        this.buttons.forEach(b => b.show());
    }

    registerButtons(obj: any) {
        this.isButtonsAdded = true;
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
                this.st.api.flush();
                const linkId = await this.lastBaseLinkId;
                qx.core.Init.getApplication()
                    ?.getPlayArea()
                    ?.setView(PlayerAreaViewMode.pavmAllianceBase, this.lastBaseId, 0, 0);
                window.open(`${Config.api.url}/base/${linkId}`, '_blank');
            });
            composite.add(button);
            this.buttons.push(button);
        }
    }

    async onStop(): Promise<void> {
        if (this.oldFunction) {
            webfrontend.gui.region.RegionCityMenu.prototype.showMenu = this.oldFunction;
            delete this.oldFunction;
        }

        for (const button of this.buttons) {
            button.destroy();
        }
        this.buttons = [];
    }
}
