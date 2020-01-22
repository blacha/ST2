import { InstallId, ModelUtil, TimeStamp, Model } from './model';

export interface ModelInstallPlayer {
    player: string;
    updatedAt: TimeStamp;
    worldId: number;
}

export class ModelInstall extends Model<ModelInstall> {
    id: InstallId;
    players: ModelInstallPlayer[] = [];

    constructor(data?: ModelInstall) {
        super(data);
        this.players = data?.players ?? [];
    }

    touch(player: string, worldId: number) {
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
