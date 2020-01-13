import { ClientLibClass } from '../clientlib/util';
import { QxComposite } from '../qx';
import { RegionObject } from '../clientlib';

export interface WebFrontEndRegionMenu extends QxComposite {
    showMenu: (selectedObject: RegionObject) => void;
}

export interface WebFrontEndRegionInfo extends QxComposite {
    onCitiesChange: Function;
}

export interface ClientLibSingletonClass<T> extends ClientLibClass<T> {
    getInstance(): T;
}

export interface WebFrontEndStatic {
    gui: {
        region: {
            RegionInfoAllianceMarker: unknown;
            RegionCityFoundInfo: unknown;
            RegionCitySupportInfo: unknown;
            RegionCityInfo: unknown;
            RegionCityStatusInfo: ClientLibSingletonClass<WebFrontEndRegionInfo>;
            RegionCityStatusInfoOwn: ClientLibSingletonClass<WebFrontEndRegionInfo>;
            RegionCityStatusInfoAlliance: ClientLibSingletonClass<WebFrontEndRegionInfo>;
            RegionCityStatusInfoEnemy: ClientLibSingletonClass<WebFrontEndRegionInfo>;
            RegionGhostStatusInfo: unknown;
            RegionRuinStatusInfo: unknown;
            RegionNPCBaseStatusInfo: ClientLibSingletonClass<WebFrontEndRegionInfo>;
            RegionNPCCampStatusInfo: ClientLibSingletonClass<WebFrontEndRegionInfo>;
            RegionPointOfInterestStatusInfo: ClientLibSingletonClass<WebFrontEndRegionInfo>;
            RegionNewPlayerSpotStatusInfo: ClientLibSingletonClass<WebFrontEndRegionInfo>;
            RegionHubStatusInfo: unknown;
            RegionHubServerStatusInfo: unknown;
            RegionHubRespawnInfo: unknown;
            RegionHubCenterStatusInfo: unknown;
            RegionHubCenterAttackableStatusInfo: unknown;
            RegionCityMenu: ClientLibSingletonClass<WebFrontEndRegionMenu>;
            RegionCityMoveInfo: unknown;
            RegionCityList: unknown;
            RegionInfoAllianceMarkerTooltip: unknown;
        };
    };
}
