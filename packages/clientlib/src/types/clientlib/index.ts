import { ClientLibSingleton } from './util';
import { ClientLibVis, VisObjectType } from './vis';
import { ClientLibMathUtil } from './math';
import { ClientLibMainData } from './main.data';

export enum PlayerAreaViewMode {
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
    Base: { MathUtil: ClientLibMathUtil };
    Config: {};
    Data: {
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
        SelectionChange: Function;
        VisMain: ClientLibSingleton<ClientLibVis>;
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
