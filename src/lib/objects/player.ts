import { AlliancePlayerInfoData, CityInfoData, CommandInfoData, ResearchInfoData } from '../../api/player.info';
import { GameResources } from '../game.resources';
import { JsonBaseObject } from './base.object';

export interface JsonPlayerObject extends JsonBaseObject {
    world: number;
    faction: number;
    player: number;
    rank: number;
    score: number;
    alliance: number;
    name: string;
    sub: string;
    rp: number;
    credit: number;
    command: CommandInfoData;
    research: ResearchInfoData;
    cities: CityInfoData[];
    $stats?: PlayerStats;
    $alliance?: AlliancePlayerInfoData;
}

export interface PlayerStats {
    main: CityInfoData;
    total: {
        production: GameResources;
        resources: GameResources;
        cost: GameResources;
    };
}
