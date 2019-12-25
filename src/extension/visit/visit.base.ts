import { ShockrTools } from '..';
import { BasePacker } from '../../lib/base.packer';
import { ClientLibStatic, RegionObject } from '../@types/client.lib';
import { VisObjectType } from '../@types/client.lib.const';
import { CityData } from '../city/city.scan';
import { StModule } from '../module';

// Visit base can be used on anything in range
// qx.core.Init.getApplication().getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmAllianceBase, cities.get_CurrentCityId(),0,0)

declare const ClientLib: ClientLibStatic;
declare const webfrontend: any;
declare const qx: any;

interface QxButton extends QxAtom {
    addListener(evt: 'execute', cb: Function): void;
    setEnabled(enabled: boolean): void;
    getChildControl(atom: string): QxAtom;
}
interface QxAtom {
    hide(): void;
    show(): void;
    exclude(): void;
    destroy(): void;
    set(obj: any): void;
}
interface QxComposite extends QxAtom {
    basename: 'Composite';
    add(obj: QxButton): void;
}

function isQxComposite(x: any): x is QxComposite {
    return x != null && x.basename == 'Composite';
}

export class VisitBaseButton implements StModule {
    name = 'VisitBase';
    oldFunction: Function | null = null;

    isStarted = false;
    buttons: QxButton[] = [];
    composite: QxComposite | null = null;
    lastBase: RegionObject | null = null;
    stId: string | null = null;
    st: ShockrTools | null = null;

    async start(st: ShockrTools): Promise<void> {
        this.st = st;
        const regionCity = webfrontend.gui.region.RegionCityMenu.prototype;
        const oldFunction = (this.oldFunction = regionCity.showMenu);
        /* eslint-disable @typescript-eslint/no-this-alias */
        const self = this;
        regionCity.showMenu = function(selectedBase: RegionObject) {
            if (!self.isStarted) {
                self.registerButtons(this);
            }
            self.buttons.forEach(b => b.exclude());

            self.lastBase = selectedBase;

            switch (selectedBase.get_VisObjectType()) {
                case VisObjectType.RegionNPCBase:
                case VisObjectType.RegionNPCCamp:
                case VisObjectType.RegionCityType:
                    self.waitForBaseReady();
            }
            oldFunction.call(this, selectedBase);
        };
    }

    /** Enable the button if/when it can be enabled. */
    private async waitForBaseReady() {
        const waitId = this.lastBase?.get_Id();
        if (waitId == null) {
            return;
        }
        const city = await CityData.waitForCityReady(waitId);
        if (city == null) {
            return;
        }

        if (waitId == this.lastBase?.get_Id()) {
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

            const button = new qx.ui.form.Button(
                'ST',
                'https://shockrtools.web.app/128_transparent.0012b310.png',
            ) as QxButton;

            button.getChildControl('icon').set({ width: 16, height: 16, scale: true }); // Force icon to be 16x16 px
            button.addListener('execute', async () => {
                if (this.lastBase == null) {
                    return;
                }
                const cityId = this.lastBase.get_Id();
                const city = await CityData.waitForCityReady(cityId);
                if (city == null) {
                    return;
                }
                const worldId = ClientLib.Data.MainData.GetInstance()
                    .get_Server()
                    .get_WorldId();
                const baseId = BasePacker.id.pack(worldId, cityId);
                window.open(`https://shockrtools.web.app/base/${baseId}`, '_blank');
                qx.core.Init.getApplication()
                    .getPlayArea()
                    .setView(13, cityId, 0, 0);
            });
            composite.add(button);
            this.buttons.push(button);
        }
    }

    async stop(): Promise<void> {
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
