/* eslint-disable @typescript-eslint/camelcase */
import { ClientLibMap } from '../util';
import { GameDataTechId } from '../../game/tech.id';

export interface ClientLibSupportBase {
    /** Base Location X */
    get_X(): number;
    /** Base Location Y */
    get_Y(): number;
    /** Tech type, @see GAMEDATA.supportTechs */
    get_Type(): GameDataTechId;
    get_StartStep(): unknown;
    /** Support building level */
    get_Level(): number;
    get_Magnitude(): unknown;
    get_PlayerId(): number;
}

export interface ClientLibAllianceSupport {
    get_Bases(): ClientLibMap<ClientLibSupportBase>;
    GetSupportWeaponCount(): unknown;
}
