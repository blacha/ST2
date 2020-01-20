import { GameWorldCommand } from './command';

export interface CommandIgmBulkSendMsg extends GameWorldCommand {
    command: 'IGMBulkSendMsg';
    request: {
        alliances: string;
        body: string;
        players: string;
        subject: string;
        session: string;
    };
    response: [number, number];
}
