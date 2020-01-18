import { GameWorldRequest } from './game';

export interface SendMessageRequest extends GameWorldRequest {
    path: 'IGMBulkSendMsg';
    request: {
        alliances: string;
        body: string;
        players: string;
        subject: string;
        session: string;
    };
    /** Successful send is [1,1] */
    response: [number, number];
}
