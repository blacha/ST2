import { ClientLibEventDelegate } from '../phe';
import {
    CommandRankingGetData,
    GameWorldCommand,
    CommandIgmGetMsg,
    CommandIgmGetMsgHeader,
    CommandIgmBulkSendMsg,
    CommandOpenSession,
    CommandPlayerInfo,
    CommandPoll,
    CommandGetServerInfo,
    CommandCheckPlayerExist,
} from './commands';
import { CommandIgmBulkDeleteMsg } from './commands/mail.delete';
import { CommandRankingGetCount } from './commands/ranking';

export interface ClientLibCommunicationManager {
    SendSimpleCommand<T extends GameWorldCommand>(
        commandName: T['command'],
        args: T['request'],
        delegate: ClientLibEventDelegate<T['response']>,
    ): void;
}

export type GameCommands =
    | CommandRankingGetData
    | CommandIgmGetMsg
    | CommandIgmGetMsgHeader
    | CommandIgmBulkSendMsg
    | CommandIgmBulkDeleteMsg
    | CommandOpenSession
    | CommandPlayerInfo
    | CommandPoll
    | CommandRankingGetData
    | CommandRankingGetCount
    | CommandGetServerInfo
    | CommandCheckPlayerExist;
