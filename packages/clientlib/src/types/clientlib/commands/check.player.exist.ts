import { GameWorldCommand } from './command';
import { PlayerNameDisplay, PlayerNameId } from '../../../id';

export interface CommandCheckPlayerExist extends GameWorldCommand {
    command: 'CheckPlayerExist';
    request: { name: PlayerNameDisplay | PlayerNameId };
    response: 'true' | 'false';
}
