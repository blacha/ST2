import { ClientLibServer } from './server';
import { ClientLibPlayer } from './player';
import { ClientLibCities } from './cities';
import { ClientLibWorld } from './world';
import { ClientLibAlliance } from './alliance';
import { ClientLibBaseColor } from './color';
import { ClientLibChat } from './chat';

/* eslint-disable @typescript-eslint/camelcase */
export interface ClientLibMainData {
    get_Time(): unknown;
    get_Chat(): ClientLibChat;
    get_Server(): ClientLibServer;
    get_World(): ClientLibWorld;
    get_Player(): ClientLibPlayer;
    get_Alliance(): ClientLibAlliance;
    get_Cities(): ClientLibCities;
    get_CitiesSupport(): unknown;
    get_Mail(): unknown;
    get_Reports(): unknown;
    get_Missions(): unknown;
    get_BaseColors(): ClientLibBaseColor;
    get_Gift(): unknown;
    get_Forum(): unknown;
    get_Notifications(): unknown;
    get_Combat(): unknown;
    get_AllianceCombatState(): unknown;
    get_AllianceSupportState(): unknown;
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
export * from './world';
export * from './alliance';
