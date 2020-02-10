import { ClientLibEvent } from './event';
import {
    AllianceDiplomacyStatus,
    ClientLibCityUnits,
    ClientLibMainData,
    ClientLibTechType,
    ClientLibWorldObject,
} from './main.data';
import { ClientLibBaseColor } from './main.data/color';
import { ClientLibMathUtil } from './math';
import { ClientLibCommunicationManager } from './net';
import { ClientLibVisMain, RegionCity, RegionCityType, RegionNpcBase, RegionNpcCamp, VisObjectType } from './vis';

export const enum PlayerAreaViewMode {
    pavmNone = 0,
    pavmPlayerBase = 1,
    pavmPlayerDefense = 2,
    pavmPlayerOffense = 3,
    pavmCombatSetupBase = 4,
    pavmCombatSetupDefense = 5,
    pavmCombatAttacker = 6,
    pavmCombatDefender = 7,
    pavmCombatViewerAttacker = 8,
    pavmCombatViewerDefender = 9,
    pavmCombatReplay = 10,
    pavmCombatSimulation = 11,
    pavmWorldMap = 12,
    pavmAllianceBase = 13,
    pavmAllianceBaseDefense = 14,
}

export interface ClientLibStatic {
    API: {};
    Base: { MathUtil: ClientLibMathUtil; ETechType: typeof ClientLibTechType };
    Config: {};
    Data: {
        MailFetched: ClientLibEvent;
        MailDataChange: ClientLibEvent;
        CitiesChange: ClientLibEvent;
        CurrentCityChange: ClientLibEvent;
        CurrentOwnCityChange: ClientLibEvent;
        GhostModeChanged: ClientLibEvent;
        ChatMessage: ClientLibEvent;
        AllianceChange: ClientLibEvent;
        CityUnits: typeof ClientLibCityUnits;
        BaseColors: typeof ClientLibBaseColor;
        EAllianceDiplomacyStatus: typeof AllianceDiplomacyStatus;
        PlayerAreaViewMode: typeof PlayerAreaViewMode;
        MainData: typeof ClientLibMainData;
        WorldSector: {
            WorldObjectNPCCamp: typeof ClientLibWorldObject;
            WorldObjectNPCBase: typeof ClientLibWorldObject;
            WorldObjectCity: typeof ClientLibWorldObject;
        };
    };
    Draw: {};
    Effect: {};
    File: {};
    Host: {};
    Net: {
        CommandResult: ClientLibEvent;
        CommunicationManager: typeof ClientLibCommunicationManager;
    };
    Res: {};
    Sound: {};
    Vis: {
        Region: {
            SectorUpdated: ClientLibEvent;
            ERegionCityType: typeof RegionCityType;
            RegionNPCCamp: typeof RegionNpcCamp;
            RegionNPCBase: typeof RegionNpcBase;
            RegionCity: typeof RegionCity;
        };
        PositionChange: ClientLibEvent;
        SelectionChange: ClientLibEvent;
        ZoomFactorChange: ClientLibEvent;
        ViewModeChange: ClientLibEvent;
        VisMain: typeof ClientLibVisMain;
        VisObject: {
            EObjectType: typeof VisObjectType;
        };
    };
}

export * from './event';
export * from './main.data';
export * from './math';
export * from './util';
export * from './vis';
export * from './commands';
export * from './net';
