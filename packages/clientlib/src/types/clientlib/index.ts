import { ClientLibSingleton, ClientLibClass } from './util';
import { ClientLibVisMain, VisObjectType, RegionNpcCamp, RegionNpcBase, RegionCity, RegionCityType } from './vis';
import { ClientLibMathUtil } from './math';
import { ClientLibMainData, AllianceDiplomacyStatus, ClientLibTechType } from './main.data';
import { ClientLibEvent } from './event';
import { ClientLibBaseColor } from './main.data/color';

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
        ChatMessage: ClientLibEvent;
        AllianceChange: ClientLibEvent;
        BaseColors: ClientLibClass<ClientLibBaseColor>;
        EAllianceDiplomacyStatus: typeof AllianceDiplomacyStatus;
        PlayerAreaViewMode: typeof PlayerAreaViewMode;
        MainData: ClientLibSingleton<ClientLibMainData>;
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

export * from './util';
export * from './math';
export * from './util';
export * from './vis';
export * from './main.data';
export * from './event';
