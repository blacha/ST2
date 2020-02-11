/* eslint-disable @typescript-eslint/camelcase */
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

export declare class ClientLibCommunicationManager {
    static GetInstance(): ClientLibCommunicationManager;
    SendSimpleCommand<T extends GameWorldCommand>(
        commandName: T['command'],
        args: T['request'],
        delegate: ClientLibEventDelegate<T['response']>,
    ): void;

    /** @example Presentation/Service.svc/ajaxEndpoint/ */
    get_ServerUrl(): string;
    get_SessionId(): string | null;
    get_ClientVersion(): number | -1;
    get_PlatformId(): number;
    get_ReferenceId(): number;
    get_InstanceId(): string | undefined;
    /** Is polling active, generally always true even when offline */
    get_PollActive(): boolean;
    get_TimeoutFactor(): number;

    /** Is polling active, generally always true even when offline */

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
