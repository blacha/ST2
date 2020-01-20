import { GameWorldCommand } from './command';
import { ClientLibMailBox } from '../main.data/mail';

export interface CommandIgmGetMsgResponse {
    /** Timestamp */
    d: number;
    /** From */
    f: string;
    /** MailId */
    i: number;
    /** Formatted message body */
    m: string;
    /** Subject */
    s: string;
    /** To player names */
    t: string[];
}

export interface CommandIgmGetMsg extends GameWorldCommand {
    command: 'IGMGetMsg';
    request: { mailId: number };
    response: CommandIgmGetMsgResponse;
}

export interface CommandIgmGetMsgHeader extends GameWorldCommand {
    command: 'IGMGetMsgHeader';
    request: { folder: ClientLibMailBox; ascending: boolean; skip: number; take: number; sortColumn: number };
    response: {};
}
