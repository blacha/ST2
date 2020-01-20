import { GameWorldCommand } from './command';

export interface CommandPoll extends GameWorldCommand {
    path: 'Poll';
    request: {
        requestid: number;
        sequenceid: number;
        requests: string;
    };
    response: PollResults[];
}

export type PollResults = PollResultTime | PollResultEndGame | PollResultPlayer | PollResultWorld;

export interface PollResult<T extends string, K> {
    d: { __type: T } & K;
    t: T;
}

export type PollResultTime = PollResult<'TIME', { d: number; o: number; r: number; s: number }>;
export type PollResultEndGame = PollResult<'ENDGAME', {}>;
export type PollResultPlayer = PollResult<'PLAYER', {}>;
export type PollResultWorld = PollResult<'WORLD', { s: PollWorldData[] }>;
export type PollResultVersion = PollResult<'VERSION', { t: number; v: string }>;
export type PollResultServer = PollResult<'SERVER', {}>;

export interface PollWorldData {
    /** Alliances */
    a?: string[];
    /** Objects */
    d?: string[];
    /** Players */
    p?: string[];
    /** Terrain */
    t?: string;
    /** Terrain details */
    u?: string;

    // Changes?
    c?: string[];
    i: number;
    v: number;
}
