import { Constants } from './constants';
import { GameDataJson } from './data/game.data';
import { PartialResourceMap } from './game.resources';
import { ResourceType, ModifierType } from '@cncta/clientlib';

export class GrowthCalculator {
    /**
     * Calculate the value after growth
     *
     * @param values map of values to use
     * @param key key to extract
     * @param level level to calculate for
     * @param growth growth rate
     */
    static getGrowthValue<T>(
        values: Partial<Record<keyof T, number>>,
        key: keyof T,
        level: number,
        growth: number,
    ): number {
        const value = values[key] ?? 0;
        if (level <= Constants.GrowthLevel) {
            return value;
        }

        return value * Math.pow(growth, level - Constants.GrowthLevel);
    }

    static getLinkValue(values: number[], level: number, growth = Constants.ResourceProductionGrowth): number {
        const resourceValue = values[level] ?? values[Constants.GrowthLevel];
        if (level <= Constants.GrowthLevel) {
            return resourceValue;
        }
        if (growth === 1) {
            return resourceValue;
        }

        return resourceValue * Math.pow(Constants.ResourceProductionGrowth, level - Constants.GrowthLevel);
    }

    /**
     * Calculate all the resources required at the specified level
     * @param resources base resource list
     * @param level level to calculate at
     * @param growth growth rate after Constants.GrowthLevel
     */
    static getResourceValues(resources: PartialResourceMap[], level: number, growth = Constants.ResourceCostGrowth) {
        const resourceLevel = resources[level] ?? resources[Constants.GrowthLevel];
        const keys = Object.keys(resourceLevel) as Array<keyof typeof ResourceType>;
        const output: PartialResourceMap = {};
        for (const key of keys) {
            output[key] = GrowthCalculator.getGrowthValue<typeof ResourceType>(resourceLevel, key, level, growth);
        }
        return output;
    }

    static getModifierValue(
        gdo: GameDataJson,
        modifier: ModifierType,
        level: number,
        growth = Constants.ResourceProductionGrowth,
    ): number {
        if (gdo.modifiers == null) {
            throw new Error('Missing gdo: ' + gdo.id);
        }

        const modifierKey = ModifierType[modifier] as keyof typeof ModifierType;
        if (modifierKey == null) {
            throw new Error('Invalid modifier :' + modifier);
        }

        const levelValues = gdo.modifiers[level] ?? gdo.modifiers[Constants.GrowthLevel];
        return GrowthCalculator.getGrowthValue<typeof ModifierType>(levelValues, modifierKey, level, growth);
    }
}
