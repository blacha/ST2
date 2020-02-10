import { ClientLibEventEmitter } from '../event';
import { ClientLibStatic } from '..';

export interface ClientLibChatEvents {
    NewMessage: ClientLibStatic['Data']['ChatMessage'];
}
export declare class ClientLibChat implements ClientLibEventEmitter<ClientLibChatEvents> {
    __events: ClientLibChatEvents;
}
