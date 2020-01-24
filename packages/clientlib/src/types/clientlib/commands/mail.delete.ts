import { GameWorldCommand } from './command';
import { MailId } from '../../../id';

export interface CommandIgmBulkDeleteMsg extends GameWorldCommand {
    command: 'IGMBulkDeleteMsg';
    request: {
        ids: MailId[];
        f: number;
        a: boolean;
    };
    response: '0';
}
