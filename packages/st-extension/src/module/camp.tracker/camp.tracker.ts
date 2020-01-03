import {
    BaseLocationPacker,
    CityUtil,
    ClientLibStatic,
    NpcCampType,
    Point,
    VisViewMode,
    Patches,
} from '@cncta/clientlib';
import { StModuleState } from '../module';
import { StModuleBase } from '../module.base';

declare const ClientLib: ClientLibStatic;

export class CampTracker extends StModuleBase {
    name = 'CampTracker';
    /** Max number to show at one time */
    MaxToShow = 10;
    /**
     * Max level difference to highlight
     * (MainOffLevel - MaxOffDiff)
     **/
    MaxOffDiff = 1;

    markers: Map<number, { el: HTMLDivElement; location: Point; index: number }> = new Map();
    updateInterval: number;

    async onStart(): Promise<void> {
        const visMain = ClientLib.Vis.VisMain.GetInstance();
        const region = visMain.get_Region();
        this.addEvent(region, 'PositionChange', ClientLib.Vis.PositionChange, this.updatePosition);
        this.addEvent(region, 'ZoomFactorChange', ClientLib.Vis.ZoomFactorChange, this.updatePosition);
        this.addEvent(visMain, 'ViewModeChange', ClientLib.Vis.ViewModeChange, this.updateView);

        this.updateInterval = window.setInterval(() => this.update(), 10 * 1000);

        this.update();
    }

    async onStop(): Promise<void> {
        this.state = StModuleState.Stopping;
        window.clearInterval(this.updateInterval);
        for (const cityId of Array.from(this.markers.keys())) {
            this.destroy(cityId);
        }
        this.markers.clear();
        this.state = StModuleState.Stopped;
    }

    /** Hide and show the markers if the view mode changes  */
    updateView() {
        const visMain = ClientLib.Vis.VisMain.GetInstance();
        if (visMain.get_Mode() == VisViewMode.Region) {
            this.markers.forEach(f => {
                if (f.el.parentElement == null) {
                    this.addMarkerToDom(f.el);
                }
            });
        } else {
            this.markers.forEach(f => f.el.remove());
        }
    }

    update() {
        const mainBase = CityUtil.getMainCity();
        const offLevel = mainBase.get_LvlOffense();
        const minBaseHighlight = offLevel - this.MaxOffDiff;
        const nearByCamps = Array.from(CityUtil.getObjectsNearCity(mainBase).values()).filter(f => {
            // All outposts are camps
            if (!Patches.WorldObjectNPCCamp.isPatched(f.object)) {
                return false;
            }
            if (f.object.$CampType === NpcCampType.Destroyed) {
                return false;
            }

            // Remove low level camps/outposts
            if (f.object.$Level < minBaseHighlight) {
                return false;
            }
            return true;
        });
        const newestCamps = nearByCamps.sort((a, b) => b.id - a.id).slice(0, this.MaxToShow);

        const existingMarkers = new Set(this.markers.keys());
        newestCamps.forEach((camp, index) => {
            const location = BaseLocationPacker.unpack(camp.location);
            const existing = this.markers.get(camp.id);
            if (existing != null) {
                existing.index = index;
                existingMarkers.delete(camp.id);
            } else {
                this.addMarker(camp.id, location, index);
            }
        });

        for (const cityId of existingMarkers.values()) {
            this.destroy(cityId);
        }

        this.updatePosition();
        this.updateView();
        return newestCamps;
    }

    updateElement(el: HTMLDivElement, location: Point, index: number) {
        const visMain = ClientLib.Vis.VisMain.GetInstance();
        const region = visMain.get_Region();
        const gridWidth = region.get_GridWidth();
        const gridHeight = region.get_GridHeight();

        const top = visMain.ScreenPosFromWorldPosY((location.y + 0.1) * gridHeight);
        const left = visMain.ScreenPosFromWorldPosX((location.x + 0.1) * gridWidth);

        el.style.top = top + 'px';
        el.style.left = left + 'px';
        el.innerHTML = '#' + (index + 1);
        if (index < 3) {
            el.style.backgroundColor = `rgba(0,240,0,0.9)`;
        } else {
            el.style.backgroundColor = `rgba(200,240,0,0.9)`;
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

    addMarker(cityId: number, location: Point, index: number) {
        const el = document.createElement('div');
        el.style.position = 'absolute';
        el.style.pointerEvents = 'none';

        el.style.fontFamily = 'Roboto condensed';
        el.style.fontWeight = 'bold';
        el.style.fontSize = '110%';

        el.style.zIndex = '10';

        el.style.borderRadius = '24px';
        el.style.width = '24px';
        el.style.height = '24px';

        el.style.padding = '2px';
        el.style.display = 'flex';
        el.style.justifyContent = 'center';
        el.style.alignItems = 'center';

        el.style.border = '2px solid rgba(0,0,0,0.87)';

        el.title = `Object #${cityId}`;

        this.updateElement(el, location, index);
        this.markers.set(cityId, { el, location, index });
    }

    addMarkerToDom(el: HTMLDivElement) {
        document.querySelector('canvas')?.parentElement?.appendChild(el);
    }
}
