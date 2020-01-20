import { GameWorldCommand } from './command';
import { GameDataResearchLevel } from '../../game';

export interface CommandPlayerInfo extends GameWorldCommand {
    command: 'GetPlayerInfo';
    request: {};
    response: CommandPlayerInfoResponse;
}

export interface CommandPlayerInfoResponse {
    AllianceId: number;
    AllianceName: string;
    Cities: CommandPlayerInfoCity[];
    Id: number;
    Name: string;
    Techs: CommandPlayerInfoTech[];
    // Lots more
}

export interface CommandPlayerInfoTech {
    id: number;
    l: GameDataResearchLevel;
    mid: number;
}

export interface CommandPlayerInfoCity {
    h: number;
    i: number;
    n: string;
    r: string;
    w: number;
    x: number;
    y: number;
}
