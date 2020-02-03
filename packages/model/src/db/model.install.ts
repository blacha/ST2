import { PlayerNameDisplay, WorldId, TimeStamp, PlayerNameId } from '@cncta/clientlib';
import { InstallId, Model, ModelUtil } from './model';

export interface ModelInstallPlayer {
    player: PlayerNameId;
    updatedAt: TimeStamp;
    worldId: WorldId;
    version: string;
    hash: string;
}

export class ModelInstall extends Model<ModelInstall> {
    id: InstallId;
    players: ModelInstallPlayer[] = [];

    constructor(data?: ModelInstall) {
        super(data);
        this.players = data?.players ?? [];
    }

    touch(player: PlayerNameDisplay, worldId: WorldId, version: string, hash: string) {
        const playerNameId = ModelUtil.toPlayerNameId(player);
        const existing = this.players.find(f => f.player == playerNameId && f.worldId == worldId);
        if (existing) {
            existing.updatedAt = ModelUtil.TimeStamp();
            existing.version = version;
            existing.hash = hash;
        } else {
            this.players.push({
                player: playerNameId,
                worldId,
                updatedAt: ModelUtil.TimeStamp(),
                version,
                hash,
            });
        }
    }
}
