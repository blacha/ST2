import { AllianceBonusData, AlliancePlayerInfoData } from '../../api/player.info';
import { JsonBaseObject } from './base.object';

export interface JsonAllianceObject extends JsonBaseObject {
    world: number;
    alliance: number;
    name: string;
    bonus: AllianceBonusData;
    players: AlliancePlayerInfoData[];
}
