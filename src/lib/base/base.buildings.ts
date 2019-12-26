import { Buildable } from './buildable';
import { Building } from '../building/building';
import { BuildingType } from '../building/building.type';
import { Base } from './base';

export class BaseBuildings {
    base: Base;

    constructor(base: Base) {
        this.base = base;
    }

    get support(): Building | null {
        const supportIds = [
            BuildingType.NOD.EyeOfKane.id,
            BuildingType.NOD.FistOfKane.id,
            BuildingType.NOD.BladeOfKane.id,
            BuildingType.GDI.FalconSupport.id,
            BuildingType.GDI.IonCannonSupport.id,
            BuildingType.GDI.SkyStrikeSupport.id,
        ];

        return this.base.findBuilding(supportIds);
    }

    get commandCenter(): Buildable | null {
        return this.base.findBuilding([BuildingType.GDI.CommandCenter.id, BuildingType.NOD.CommandCenter.id]);
    }
}
