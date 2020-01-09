import { ClientLibEventEmitter } from '../event';
import { ClientLibStatic } from '..';

export interface ClientLibChatEvents {
    NewMessage: ClientLibStatic['Data']['ChatMessage'];
}
export interface ClientLibChat extends ClientLibEventEmitter<ClientLibChatEvents> {
    __events: ClientLibChatEvents;
}
