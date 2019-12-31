import { ClientLibMap } from '../util';
import { FactionType } from '../../game/faction';

export type GameStep = number;
/* eslint-disable @typescript-eslint/camelcase */

export interface ClientLibAllianceMemberData {
    ActiveState: number;
    Bases: number;
    Faction: FactionType;
    HasControlHubCode: boolean;
    Id: number;
    JoinStep: GameStep;
    /** Date last seen, timestamp in ms */
    lastSeen: number;
    Points: number;
    Name: string;
    level: number;
    OnlineState: number;
    Rank: number;
    Role: number;
    RoleName: string;
    VeteranPointContribution: number;
}

export interface ClientLibAlliance {
    /**
     * Get alliance Id
     * @returns allianceId or 0 if not part of an alliance
     */
    get_Id(): number | 0;
    /**
     * Get alliance name,
     *
     * @returns allianceName or '' if not part of alliance
     */
    get_Name(): string | '';

    get_MemberData(): ClientLibMap<ClientLibAllianceMemberData>;
}
