import { QxComposite } from '../qx';
import { RegionObject } from '../clientlib';

export declare class WebFrontEndRegionMenu extends QxComposite {
    showMenu: (selectedObject: RegionObject) => void;
}

export declare class WebFrontEndRegionInfo extends QxComposite {
    onCitiesChange: Function;
}

export const enum ChatWidgetChannel {
    all = 1,
    alliance = 2,
    officers = 4,
    whisper = 8,
    global = 16,
    allflags = 31,
}
export type ValueOf<T> = T[keyof T];
export interface ChatWidgetSender {
    system: 'SYSTEM';
}

export interface WebFrontEndStatic {
    gui: {
        util: {
            BBCode: {
                /** color of links */
                clrLink: string;
            };
        };
        chat: {
            ChatWidget: {
                channel: typeof ChatWidgetChannel;
                sender: ChatWidgetSender;
            };
        };
        region: {
            RegionInfoAllianceMarker: unknown;
            RegionCityFoundInfo: unknown;
            RegionCitySupportInfo: unknown;
            RegionCityInfo: unknown;
            RegionCityStatusInfo: typeof WebFrontEndRegionInfo;
            RegionCityStatusInfoOwn: typeof WebFrontEndRegionInfo;
            RegionCityStatusInfoAlliance: typeof WebFrontEndRegionInfo;
            RegionCityStatusInfoEnemy: typeof WebFrontEndRegionInfo;
            RegionGhostStatusInfo: unknown;
            RegionRuinStatusInfo: unknown;
            RegionNPCBaseStatusInfo: typeof WebFrontEndRegionInfo;
            RegionNPCCampStatusInfo: typeof WebFrontEndRegionInfo;
            RegionPointOfInterestStatusInfo: typeof WebFrontEndRegionInfo;
            RegionNewPlayerSpotStatusInfo: typeof WebFrontEndRegionInfo;
            RegionHubStatusInfo: unknown;
            RegionHubServerStatusInfo: unknown;
            RegionHubRespawnInfo: unknown;
            RegionHubCenterStatusInfo: unknown;
            RegionHubCenterAttackableStatusInfo: unknown;
            RegionCityMenu: typeof WebFrontEndRegionMenu;
            RegionCityMoveInfo: unknown;
            RegionCityList: unknown;
            RegionInfoAllianceMarkerTooltip: unknown;
        };
    };
}
