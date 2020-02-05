import {
    AllianceId,
    AllianceName,
    FactionType,
    PlayerId,
    PlayerNameDisplay,
    PollWorldData,
    PlayerScore,
} from '@cncta/clientlib';
import { WorldSectorObjectCity } from './decode.world.city';
import { WorldSectorObjectBase } from './decode.world.npc.base';
import { WorldSectorObjectPoi } from './decode.world.poi';
import { WorldSectorDecoder } from './decode.world.sector';

export interface WorldSectorPlayer {
    id: PlayerId;
    points: PlayerScore;
    faction: FactionType.Nod | FactionType.Gdi;
    allianceId: AllianceId;
    name: PlayerNameDisplay;
}
export interface WorldSectorAlliance {
    id: AllianceId;
    points: number;
    name: AllianceName;
    players: PlayerId[];
}
export type WorldSectorObject = WorldSectorObjectCity | WorldSectorObjectBase | WorldSectorObjectPoi;

export class WorldData {
    static SectorSize = 32;

    players: Map<PlayerId, WorldSectorPlayer> = new Map();
    cities: Map<number, Map<number, WorldSectorObjectCity>> = new Map();
    alliances: Map<AllianceId, WorldSectorAlliance> = new Map();
    objects: Map<number, WorldSectorObject> = new Map();

    add(sector: PollWorldData) {
        WorldSectorDecoder.decode(this, sector);
    }
}
