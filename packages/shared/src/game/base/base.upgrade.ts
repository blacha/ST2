import { GameDataUnitId, GameDataResearchLevel } from '@cncta/clientlib';

export function mergeBaseUpgrade(
    source: Partial<Record<GameDataUnitId, GameDataResearchLevel>>,
    target: Partial<Record<GameDataUnitId, GameDataResearchLevel>>,
) {
    for (const [key, value] of Object.entries(source)) {
        const unitId = Number(key) as GameDataUnitId;
        if (value == null) {
            continue;
        }
        const oldValue = target[unitId];
        if (oldValue == null || oldValue < value) {
            target[unitId] = value;
        }
    }
}
