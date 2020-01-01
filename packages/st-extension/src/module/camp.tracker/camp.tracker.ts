import {
    BaseLocationPacker,
    CityUtil,
    ClientLibPatcher,
    ClientLibStatic,
    NpcCampType,
    Point,
    VisViewMode,
} from '@cncta/clientlib';
import { StModuleState } from '../module';
import { StModuleBase } from '../module.base';

declare const ClientLib: ClientLibStatic;

export class CampTracker extends StModuleBase {
    name = 'CampTracker';
    /** Max number to show at one time */
    maxToShow = 10;

    markers: Map<number, { el: HTMLDivElement; location: Point; index: number }> = new Map();
    updateInterval: number;

    async onStart(): Promise<void> {
        const visMain = ClientLib.Vis.VisMain.GetInstance();
        const region = visMain.get_Region();
        this.addEvent(region, 'PositionChange', ClientLib.Vis.PositionChange, this.updatePosition);
        this.addEvent(region, 'ZoomFactorChange', ClientLib.Vis.ZoomFactorChange, this.updatePosition);
        this.addEvent(visMain, 'ViewModeChange', ClientLib.Vis.ViewModeChange, this.updateView);

        this.updateInterval = window.setInterval(() => this.update(), 5 * 1000);

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
                    document.body.appendChild(f.el);
                }
            });
        } else {
            this.markers.forEach(f => f.el.remove());
        }
    }

    update() {
        const mainBase = CityUtil.getMainCity();
        const nearByCamps = Array.from(CityUtil.getObjectsNearCity(mainBase).values()).filter(
            f => ClientLibPatcher.hasPatchedCampType(f.object) && f.object.$CampType !== NpcCampType.Destroyed,
        );
        const newestCamps = nearByCamps.sort((a, b) => b.id - a.id).slice(0, this.maxToShow);

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
        el.style.fontFamily = 'm+ 1m';
        el.style.fontWeight = 'bold';
        el.style.zIndex = '10';
        el.style.borderRadius = '8px';
        el.style.padding = '2px';
        el.title = `Object #${cityId}`;

        this.updateElement(el, location, index);

        document.body.appendChild(el);

        this.markers.set(cityId, { el, location, index });
    }
}
