import { GameWorldCommand } from './command';
import { GameDataResearchLevel } from '../../game';

export interface CommandPlayerInfo extends GameWorldCommand {
    command: 'GetPlayerInfo';
    request: {
        session: string;
    };
    response: {
        AllianceId: number;
        AllianceName: string;
        Cities: PlayerInfoCity[];
        Id: number;
        Name: string;
        Techs: PlayerInfoTech[];
        // Lots more
    };
}

export interface PlayerInfoTech {
    id: number;
    l: GameDataResearchLevel;
    mid: number;
}

export interface PlayerInfoCity {
    h: number;
    i: number;
    n: string;
    r: string;
    w: number;
    x: number;
    y: number;
}
