import { ClientLibServer } from './server';
import { ClientLibPlayer } from './player';
import { ClientLibCities } from './cities';
import { ClientLibWorld } from './world';
import { ClientLibAlliance } from './alliance';
import { ClientLibBaseColor } from './color';
import { ClientLibChat } from './chat';
import { ClientLibTime } from './time';
import { ClientLibAllianceSupport } from './alliance.support';
import { ClientLibMail } from './mail';

/* eslint-disable @typescript-eslint/camelcase */
export interface ClientLibMainData {
    get_Time(): ClientLibTime;
    get_Chat(): ClientLibChat;
    get_Server(): ClientLibServer;
    get_World(): ClientLibWorld;
    get_Player(): ClientLibPlayer;
    get_Alliance(): ClientLibAlliance;
    get_Cities(): ClientLibCities;
    get_CitiesSupport(): unknown;
    get_Mail(): ClientLibMail;
    get_Reports(): unknown;
    get_Missions(): unknown;
    get_BaseColors(): ClientLibBaseColor;
    get_Gift(): unknown;
    get_Forum(): unknown;
    get_Notifications(): unknown;
    get_Combat(): unknown;
    get_AllianceCombatState(): unknown;
    get_AllianceSupportState(): ClientLibAllianceSupport;
    get_AllianceTargetWatcher(): unknown;
    get_Inventory(): unknown;
    get_ShopCatalog(): unknown;
    get_PlayerSubstitution(): unknown;
    get_EndGame(): unknown;
    get_Challenge(): unknown;
    get_ArsenalHandler(): unknown;
}

export * from './server';
export * from './player';
export * from './cities';
export * from './mail';
export * from './world';
export * from './alliance';
export * from './color';
export * from './chat';
export * from './time';
export * from './alliance.support';
