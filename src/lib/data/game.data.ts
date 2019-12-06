import { MovementType, PartialModifierMap, PartialResourceMap } from '../../extension/@types/client.lib.const';

export interface GameDataJson {
    /** Unit Id */
    id: number;
    /** Unit name */
    name: string;
    /** Display name */
    display: string;
    /** Starting health points (Level 1) */
    health: number;
    /** TechId */
    tech: number;
    /** Resources required to upgrade */
    resources?: PartialResourceMap[];
    /** Repair requirements */
    repair?: PartialResourceMap[];
    /** Faction */
    faction: string;
    /** Movement speed */
    speed: number;
    /** Type of movement */
    movement: MovementType;
    /** Modifiers */
    modifiers?: PartialModifierMap[];
}
