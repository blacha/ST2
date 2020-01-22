import { PlayerName, WorldId } from '@cncta/clientlib/src';
import { InstallId, Model, ModelUtil, TimeStamp } from './model';

export interface ModelInstallPlayer {
    player: PlayerName;
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

    touch(player: PlayerName, worldId: WorldId) {
        const existing = this.players.find(f => f.player == player && f.worldId == worldId);
        if (existing) {
            existing.updatedAt = ModelUtil.TimeStamp();
        } else {
            this.players.push({
                player,
                worldId,
                updatedAt: ModelUtil.TimeStamp(),
            });
        }
    }
}
