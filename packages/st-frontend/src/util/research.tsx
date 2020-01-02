import { GameDataUnitId, GameDataUnit } from '@cncta/clientlib';

export interface GameResearch {
    offense: GameDataUnitId[];
    defense: GameDataUnitId[];
}
export const NodResearch: GameResearch = {
    offense: [GameDataUnitId.NodMilitants],
    defense: [],
};
