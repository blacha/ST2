import { ClientLibClass, ClientLibStatic, NpcCampType, Point, RegionNpcCamp } from '@cncta/clientlib';
import { BaseLocationPacker, CityUtil, PatchWorldObjectNPCCamp } from '@cncta/util';
import { StModuleState } from '../module';
import { StModuleBase } from '../module.base';

declare const ClientLib: ClientLibStatic;

function replaceBaseLevel(t: ClientLibClass<RegionNpcCamp | RegionNpcCamp>) {
    // eslint-disable-next-line @typescript-eslint/camelcase
    t.prototype.get_BaseLevel = t.prototype.get_BaseLevelFloat;
}

export class CampTracker extends StModuleBase {
    name = 'CampTracker';
    /** Max number to show at one time */

    MaxToShow = 10;
    markers: Map<number, { el: HTMLDivElement; location: Point; index: number }> = new Map();
    updateInterval: number;
    lastUpdatedStep: number;
    updateCb: number | null;
    font: string;
    fontSize: number;
    iconSize: number;
    maxOffDiff = -1;

    async onStart(): Promise<void> {
        this.MaxToShow = this.st.config.get('CampTracker.count') ?? 10;
        const md = ClientLib.Data.MainData.GetInstance();
        const visMain = ClientLib.Vis.VisMain.GetInstance();
        const region = visMain.get_Region();
        this.addEvent(region, 'PositionChange', ClientLib.Vis.PositionChange, this.updatePosition);
        this.addEvent(region, 'ZoomFactorChange', ClientLib.Vis.ZoomFactorChange, this.updatePosition);

        this.addEvent(region, 'SectorUpdated', ClientLib.Vis.Region.SectorUpdated, this.update);
        this.addEvent(md.get_Cities(), 'Change', ClientLib.Data.CitiesChange, this.update);

        // Use floating point base numbers for tool tips
        replaceBaseLevel(ClientLib.Vis.Region.RegionNPCBase);
        replaceBaseLevel(ClientLib.Vis.Region.RegionNPCCamp);

        this.update();
    }

    onConfig() {
        this.MaxToShow = this.st.config.get('CampTracker.count');
        this.maxOffDiff = this.st.config.get('CampTracker.offense');
        this.font = this.st.config.get('CampTracker.icon.font');
        this.fontSize = this.st.config.get('CampTracker.icon.fontSize');
        this.iconSize = this.st.config.get('CampTracker.icon.size');

        this.markers.forEach(e => this.updateStyle(e.el));
        this.doUpdate();
    }

    async onStop(): Promise<void> {
        this.state = StModuleState.Stopping;
        for (const cityId of Array.from(this.markers.keys())) {
            this.destroy(cityId);
        }
        this.markers.clear();
        this.state = StModuleState.Stopped;
    }

    update() {
        // Update already triggering
        if (this.updateCb != null) {
            return;
        }
        const serverStep = ClientLib.Data.MainData.GetInstance()
            .get_Time()
            .GetServerStep();
        if (serverStep == this.lastUpdatedStep) {
            return;
        }
        this.lastUpdatedStep = serverStep;
        this.updateCb = requestAnimationFrame(() => this.doUpdate());
    }

    doUpdate() {
        this.updateCb = null;
        const mainBase = CityUtil.getMainCity();
        // No main base, skip
        if (mainBase == null) {
            return;
        }

        const offLevel = mainBase.get_LvlOffense();
        const minBaseHighlight = offLevel + this.maxOffDiff;
        const nearByCamps = Array.from(CityUtil.getObjectsNearCity(mainBase).values()).filter(f => {
            // All outposts are camps
            if (!PatchWorldObjectNPCCamp.isPatched(f.object)) {
                return false;
            }

            if (f.object.$CampType === NpcCampType.Destroyed) {
                return false;
            }

            // Ignore low level camps/outposts
            if (f.object.$Level < minBaseHighlight) {
                return false;
            }

            return true;
        });
        const newestCamps = nearByCamps.sort((a, b) => b.id - a.id).slice(0, this.MaxToShow);

        const existingMarkers = new Set(this.markers.keys());
        newestCamps.forEach((camp, index) => {
            const existing = this.markers.get(camp.id);
            if (existing != null) {
                existing.index = index;
                existingMarkers.delete(camp.id);
            } else {
                const location = BaseLocationPacker.unpack(camp.location);
                this.addMarker(camp.id, location, index);
            }
        });

        for (const cityId of existingMarkers.values()) {
            this.destroy(cityId);
        }

        this.updatePosition();
        return newestCamps;
    }

    updateElement(el: HTMLDivElement, location: Point, index: number) {
        const visMain = ClientLib.Vis.VisMain.GetInstance();
        const region = visMain.get_Region();
        const gridWidth = region.get_GridWidth();
        const gridHeight = region.get_GridHeight();

        const top = visMain.ScreenPosFromWorldPosY((location.y + 0.1) * gridHeight);
        const left = visMain.ScreenPosFromWorldPosX((location.x + 0.1) * gridWidth);
        const bottom = region.get_ViewHeight();
        const right = region.get_ViewWidth();

        // Out of bounds disable
        if (top < 0 || left < 0 || top > bottom || left > right) {
            el.remove();
            return;
        }

        el.style.top = top + 'px';
        el.style.left = left + 'px';
        if (el.getAttribute('st-last-index') != String(index)) {
            el.innerHTML = '#' + (index + 1);
            if (index < 3) {
                el.style.backgroundColor = `rgba(0,240,0,0.9)`;
            } else {
                el.style.backgroundColor = `rgba(200,240,0,0.9)`;
            }
            el.setAttribute('st-last-index', String(index));
        }

        if (el.parentElement == null) {
            this.addMarkerToDom(el);
        }
    }

    updatePosition() {
        this.markers.forEach(({ el, location, index }) => this.updateElement(el, location, index));
    }

    destroy(cityId: number) {
        const marker = this.markers.get(cityId);
        if (marker == null) {
            return;
        }

        marker.el.remove();
        this.markers.delete(cityId);
    }

    updateStyle(el: HTMLDivElement) {
        el.style.position = 'absolute';
        el.style.pointerEvents = 'none';

        el.style.fontFamily = this.font;
        el.style.fontWeight = 'bold';
        el.style.fontSize = this.fontSize + 'px';

        el.style.zIndex = '10';
        el.style.borderRadius = '50%';

        el.style.width = `${this.iconSize}px`;
        el.style.height = `${this.iconSize}px`;

        el.style.padding = '2px';
        el.style.display = 'flex';
        el.style.justifyContent = 'center';
        el.style.alignItems = 'center';

        el.style.border = '2px solid rgba(0,0,0,0.87)';
    }

    addMarker(cityId: number, location: Point, index: number) {
        const el = document.createElement('div');

        el.title = `Object #${cityId}`;
        this.updateStyle(el);
        this.updateElement(el, location, index);
        this.markers.set(cityId, { el, location, index });
        this.addMarkerToDom(el);
    }

    addMarkerToDom(el: HTMLDivElement) {
        document.querySelector('canvas')?.parentElement?.appendChild(el);
    }
}
