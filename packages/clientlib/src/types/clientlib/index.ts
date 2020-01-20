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
import { ClientLibClass, ClientLibSingleton } from './util';
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
        CityUnits: ClientLibClass<ClientLibCityUnits>;
        BaseColors: ClientLibClass<ClientLibBaseColor>;
        EAllianceDiplomacyStatus: typeof AllianceDiplomacyStatus;
        PlayerAreaViewMode: typeof PlayerAreaViewMode;
        MainData: ClientLibSingleton<ClientLibMainData>;
        WorldSector: {
            WorldObjectNPCCamp: ClientLibClass<ClientLibWorldObject>;
            WorldObjectNPCBase: ClientLibClass<ClientLibWorldObject>;
            WorldObjectCity: ClientLibClass<ClientLibWorldObject>;
        };
    };
    Draw: {};
    Effect: {};
    File: {};
    Host: {};
    Net: {};
    Res: {};
    Sound: {};
    Vis: {
        Region: {
            SectorUpdated: ClientLibEvent;
            ERegionCityType: typeof RegionCityType;
            RegionNPCCamp: ClientLibClass<RegionNpcCamp>;
            RegionNPCBase: ClientLibClass<RegionNpcBase>;
            RegionCity: ClientLibClass<RegionCity>;
        };
        PositionChange: ClientLibEvent;
        SelectionChange: ClientLibEvent;
        ZoomFactorChange: ClientLibEvent;
        ViewModeChange: ClientLibEvent;
        VisMain: ClientLibSingleton<ClientLibVisMain>;
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
