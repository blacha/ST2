import { GameWorldCommand } from './command';

export interface CommandRankingGetData extends GameWorldCommand {
    command: 'RankingGetData';
    request: {
        ascending: boolean;
        firstIndex: number;
        lastIndex: number;
        rankingType: number;
        sortColumn: number;
        view: number;
    };
    response: {};
}
