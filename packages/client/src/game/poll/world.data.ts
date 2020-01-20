import { FactionType, PollWorldData } from '@cncta/clientlib';
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

export class WorldData {
    static SectorSize = 32;

    players: Record<number, WorldSectorPlayer> = {};
    cities: Record<number, Record<number, WorldSectorObjectCity>> = {};
    alliances: Record<number, WorldSectorAlliance> = {};
    objects: Record<number, WorldSectorObject> = {};

    add(sector: PollWorldData) {
        WorldSectorDecoder.decode(this, sector);
    }
}
