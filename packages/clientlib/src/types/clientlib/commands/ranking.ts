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

export interface CommandRankingGetData extends GameWorldCommand {
    command: 'RankingGetData';
    request: {
        firstIndex: number;
        lastIndex: number;
        view: number;
        rankingType: number;
        sortColumn: number;
        ascending: boolean;
    };
    /** Count of results*/
    response: {
        results: RankingGetDataResult[];
        r: number;
    };
}
