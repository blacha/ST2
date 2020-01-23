import { GameWorldCommand } from './command';
import { PlayerName } from 'packages/clientlib/src/id';

export interface CommandCheckPlayerExist extends GameWorldCommand {
    command: 'CheckPlayerExist';
    request: { name: PlayerName };
    response: 'true' | 'false';
}
