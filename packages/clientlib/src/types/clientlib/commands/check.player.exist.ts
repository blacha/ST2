import { GameWorldCommand } from './command';
import { PlayerNameDisplay, PlayerNameId } from 'packages/clientlib/src/id';

export interface CommandCheckPlayerExist extends GameWorldCommand {
    command: 'CheckPlayerExist';
    request: { name: PlayerNameDisplay | PlayerNameId };
    response: 'true' | 'false';
}
