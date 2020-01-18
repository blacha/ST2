import { FactionType } from '@cncta/clientlib';
import { PollWorldData } from '../requests/poll';
import { WorldSectorObjectCity } from './decode.world.city';
import { WorldSectorObjectBase } from './decode.world.npc.base';
import { WorldSectorObjectPoi } from './decode.world.poi';
import { WorldSectorDecoder } from './decode.world.sector';

export interface WorldSectorPlayer {
    id: number;
    points: number;
    faction: FactionType.Nod | FactionType.Gdi;
    allianceId: number;
    name: string;
}
export interface WorldSectorAlliance {
    id: number;
    points: number;
    name: string;
}
export type WorldSectorObject = WorldSectorObjectCity | WorldSectorObjectBase | WorldSectorObjectPoi;

export class WorldDecoder {
    static SectorSize = 32;

    players: WorldSectorPlayer[] = [];
    cities: Record<number, WorldSectorObjectCity>[] = [];
    alliances: WorldSectorAlliance[] = [];
    sectors: WorldSectorDecoder[] = [];
    objects: WorldSectorObject[] = [];

    add(sector: PollWorldData) {
        this.sectors[sector.i] = new WorldSectorDecoder(this, sector);
    }
}
