import {
    Point,
    WorldObjectType,
    PollWorldData,
    AllianceId,
    AllianceName,
    PlayerNameDisplay,
    PlayerId,
    PlayerScore,
} from '@cncta/clientlib';
import { Base91, BaseLocationPacker, InvalidAllianceId } from '@cncta/util';
import { WorldData, WorldSectorAlliance, WorldSectorPlayer } from './world.data';
import { DecodeWorldNpcBase } from './decode.world.npc.base';
import { DecodeWorldCity } from './decode.world.city';
import { DecodeWorldPoi } from './decode.world.poi';

export class WorldSectorDecoder {
    players: WorldSectorPlayer[] = [];
    alliances: WorldSectorAlliance[] = [];
    offset: Point;
    world: WorldData;

    constructor(world: WorldData, data: PollWorldData) {
        this.world = world;
        const x = data.i & 0xff;
        const y = data.i >> 8;
        this.offset = { x: x * WorldData.SectorSize, y: y * WorldData.SectorSize };

        if (data.a) this.decodeAlliances(data.a);
        if (data.p) this.decodePlayers(data.p);
        if (data.d) this.decodeObjects(data.d);
    }

    static decode(world: WorldData, data: PollWorldData) {
        new WorldSectorDecoder(world, data);
    }

    decodeAlliances(a: string[]) {
        for (const alliance of a) {
            const ctx = { data: alliance, offset: 0 };
            const sectorId = Base91.dec(ctx, 2);

            const allianceId = Base91.dec(ctx) as AllianceId;
            let existing = this.world.alliances.get(allianceId);
            if (existing == null) {
                existing = {
                    id: allianceId,
                    points: Base91.dec(ctx),
                    name: alliance.substr(ctx.offset) as AllianceName,
                    players: [],
                };
            }
            this.alliances[sectorId] = existing;
            this.world.alliances.set(existing.id, existing);
        }
    }

    decodePlayers(p: string[]) {
        for (const player of p) {
            const ctx = { data: player, offset: 0 };
            const sectorId = Base91.dec(ctx, 2);
            const id = Base91.dec(ctx) as PlayerId;
            const points = Base91.dec(ctx) as PlayerScore;
            const header = Base91.dec(ctx, 2);
            const name = player.substr(ctx.offset) as PlayerNameDisplay;

            const faction = (header >> 1) & 3;
            const localAllianceId = header >> 3;
            let allianceId: AllianceId = InvalidAllianceId as AllianceId;
            if (localAllianceId > 0 && this.alliances[localAllianceId]) {
                const alliance = this.alliances[localAllianceId];
                alliance.players.push(id);
                allianceId = this.alliances[localAllianceId].id;
            }

            const obj: WorldSectorPlayer = {
                id,
                points,
                faction,
                allianceId,
                name,
            };

            this.players[sectorId] = obj;
            this.world.players.set(obj.id, obj);
            this.world.cities.set(obj.id, this.world.cities.get(obj.id) ?? new Map());
        }
    }

    decodeObjectByType(type: WorldObjectType, obj: string) {
        switch (type) {
            case WorldObjectType.NPCCamp:
                break;
            case WorldObjectType.NPCBase:
                return DecodeWorldNpcBase.decode(this, obj);
            case WorldObjectType.City:
                return DecodeWorldCity.decode(this, obj);
            case WorldObjectType.PointOfInterest:
                return DecodeWorldPoi.decode(this, obj);
        }
        return null;
    }

    decodeObjects(o: string[]) {
        for (const obj of o) {
            const headData = Base91.decode(obj, 0, 2);
            const type = headData.value >> 10;
            const output = this.decodeObjectByType(type, obj);
            if (output == null) {
                continue;
            }
            if (output.type == 'city') {
                const playerCities = this.world.cities.get(output.ownerId);
                if (playerCities == null) {
                    throw new Error('Adding city to unknown player');
                }
                playerCities.set(output.id, output);
                continue;
            }
            this.world.objects.set(BaseLocationPacker.pack(output.x, output.y), output);
        }
    }
}
