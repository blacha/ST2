import { PlayerNameDisplay, WorldId, TimeStamp, PlayerNameId } from '@cncta/clientlib';
import { InstallId, Model, ModelUtil } from './model';

export interface ModelInstallPlayer {
    player: PlayerNameId;
    updatedAt: TimeStamp;
    worldId: WorldId;
}

export class ModelInstall extends Model<ModelInstall> {
    id: InstallId;
    players: ModelInstallPlayer[] = [];

    constructor(data?: ModelInstall) {
        super(data);
        this.players = data?.players ?? [];
    }

    touch(player: PlayerNameDisplay, worldId: WorldId) {
        const playerNameId = ModelUtil.toPlayerNameId(player);
        const existing = this.players.find(f => f.player == playerNameId && f.worldId == worldId);
        if (existing) {
            existing.updatedAt = ModelUtil.TimeStamp();
        } else {
            this.players.push({
                player: playerNameId,
                worldId,
                updatedAt: ModelUtil.TimeStamp(),
            });
        }
    }
}
