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

    /**
     * Update the timestamp for the last user action
     * Poll requests are slowed if there are no user actions in the last x seconds
     *
     * * < 30 seconds poll every second
     * * < 60 seconds poll every 2 seconds
     * * >=60 seconds poll every 3 seconds
     *
     **/
    UserAction(): void;
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
