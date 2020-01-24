import { GameWorldCommand } from './command';
import { AllianceId, AllianceName, PlayerNameDisplay } from '../../../id';
import { FactionType } from '../../game';

export interface CommandRankingGetCount extends GameWorldCommand {
    command: 'RankingGetCount';
    request: { view: number; rankingType: number };
    /** Count of results*/
    response: string;
}

export interface RankingGetDataResult {
    /** Alliance Id */
    a: AllianceId;
    /** Alliance name */
    an: AllianceName;
    aw: boolean;
    /** Base Count */
    bc: number;
    er: number;
    es: number;
    ewf: number;
    /** Faction */
    f: FactionType;
    /** Player name */
    pn: PlayerNameDisplay;
    r: number;
    s: number;
    vwr: number;
    w: boolean;
}

export const enum RankingViewType {
    Alliance = 1,
    Player = 0,
}

export const enum RankingType {
    Score = 0,
    KillsBasePve = 1,
    KillsBasePvp = 2,
    DistanceToCenter = 3,
    BonusTiberium = 4,
    BonusCrystal = 5,
    BonusPower = 6,
    BonusInfantry = 7,
    BonusVehicles = 8,
    BonusAircraft = 9,
    BonusDefense = 10,
    EndgameProgress = 11,
    HallOfFame = 12,
    Event = 13,
    SeasonOverview = 14,
    MostValuableAlliance = 15,
}

export interface CommandRankingGetData extends GameWorldCommand {
    command: 'RankingGetData';
    request: {
        firstIndex: number;
        lastIndex: number;
        view: RankingViewType;
        rankingType: RankingType;
        sortColumn: number;
        ascending: boolean;
    };
    /** Count of results*/
    response: {
        results: RankingGetDataResult[];
        r: number;
    };
}
