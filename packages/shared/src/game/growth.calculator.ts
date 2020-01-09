import { Constants } from './constants';
import { GameDataJson } from './data/game.data';
import { PartialResourceMap } from './game.resources';
import { ResourceType, ModifierType } from '@cncta/clientlib';

export enum GrowthModifierType {
    None = -1,
    TiberiumProduction = 1,
    TiberiumStorage = 2,
    CrystalProduction = 4,
    CrystalStorage = 5,
    PowerProduction = 6,
    BuildingSlots = 14,
    HeadCountArmy = 22,
    TiberiumPackageSize = 25,
    CrystalPackageSize = 26,
    PowerPackageSize = 28,
    PowerStorage = 29,
    CreditsProduction = 30,
    HeadCountDefense = 31,
    CreditsPackageSize = 32,
    TiberiumBonusTimeToComplete = 33,
    CrystalBonusTimeToComplete = 34,
    PowerBonusTimeToComplete = 35,
    CreditsBonusTimeToComplete = 36,
    RepairEfficiencyBase = 37,
    RepairChargeBaseStorage = 38,
    RepairEfficiencyAir = 39,
    RepairProductionPerHourBase = 40,
    RepairEfficiencyInf = 41,
    RepairEfficiencyVeh = 43,
    RepairPotentialOffenseStorage = 47,
    RepairProductionPerHourOffense = 48,
    SupportMinPrepTime = 51,
    SupportTimePerField = 52,
    SupportRadius = 53,
    SupportDamageAir = 54,
    SupportDamageInf = 55,
    SupportDamageVehicle = 56,
    FoundBaseTiberium = 57,
    FoundBaseCrystal = 58,
    FoundBasePower = 59,
    PlayerPackageCount = 64,
}

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

        const modifierKey = GrowthModifierType[modifier] as keyof typeof ModifierType;
        if (modifierKey == null) {
            throw new Error('Invalid modifier :' + modifier);
        }

        const levelValues = gdo.modifiers[level] ?? gdo.modifiers[Constants.GrowthLevel];
        return GrowthCalculator.getGrowthValue<typeof ModifierType>(levelValues, modifierKey, level, growth);
    }
}
