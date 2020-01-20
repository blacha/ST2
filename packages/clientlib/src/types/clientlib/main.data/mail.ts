import { ClientLibEventEmitter } from '../event';
import { ClientLibStatic, ClientLibMap } from '../index';
/* eslint-disable @typescript-eslint/camelcase */

export interface ClientLibMailEvents {
    DataChange: ClientLibStatic['Data']['MailDataChange'];
    Fetched: ClientLibStatic['Data']['MailFetched'];
}

export const enum ClientLibMailBox {
    Inbox = 0,
    Outbox = 1,
}

export const enum ClientLibMailType {}

export interface ClientLibMailMessage {
    Id: number;
    Type: ClientLibMailType;
    Date: number;
    Subject: string;
    From: string;
    To: string[];
    Read: boolean;
    FromId: number;
    ToIds: number[];
    ToAllianceIds?: number[];
    ToAllianceNames?: string[];
    /**
     * Formatted mail body string
     *
     * only exists after being requested
     *
     * @example
     * `<cnc><cncs>SenderName</cncs><cncd>DateTime</cncd><cnct>Body</cnct></cnc>`
     */
    Text?: string;
}

export interface ClientLibMail extends ClientLibEventEmitter<ClientLibMailEvents> {
    __events: ClientLibMailEvents;

    /** Number of unread mail messages */
    get_Count(): number;

    /** Number of unread mail messages */
    GetUnreadCount(): number;

    GetMails(box: ClientLibMailBox): ClientLibMap<ClientLibMailMessage>;

    /** Number of messages (Read + Unread) in each mail box */
    GetMailCount(box: ClientLibMailBox): number;

    /** Send mail */
    SendMail(playerNames: string, allianceNames: string, subject: string, body: string): void;
}
