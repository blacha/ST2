const CODES: Record<string, string> = {
    /* GDI Buildings */
    GDI_Accumulator: 'a',
    GDI_Refinery: 'r',
    GDI_Trade_Center: 'u',
    GDI_Silo: 's',
    GDI_Power_Plant: 'p',
    GDI_Construction_Yard: 'y',
    GDI_Airport: 'd',
    GDI_Barracks: 'b',
    GDI_Factory: 'f',
    GDI_Defense_HQ: 'q',
    GDI_Defense_Facility: 'w',
    GDI_Command_Center: 'e',
    GDI_Support_Art: 'z',
    GDI_Support_Air: 'x',
    GDI_Support_Ion: 'i',

    /* Forgotten Buildings */
    FOR_Silo: 's',
    FOR_Refinery: 'r',
    FOR_Tiberium_Booster: 'b',
    FOR_Crystal_Booster: 'v',
    FOR_Trade_Center: 'u',
    FOR_Defense_Facility: 'w',
    FOR_Construction_Yard: 'y',
    FOR_Harvester_Tiberium: 'h',
    FOR_Defense_HQ: 'q',
    FOR_Harvester_Crystal: 'n',

    /* Nod Buildings */
    NOD_Refinery: 'r',
    NOD_Power_Plant: 'p',
    NOD_Harvester: 'h',
    NOD_Construction_Yard: 'y',
    NOD_Airport: 'd',
    NOD_Trade_Center: 'u',
    NOD_Defense_HQ: 'q',
    NOD_Barracks: 'b',
    NOD_Silo: 's',
    NOD_Factory: 'f',
    NOD_Harvester_Crystal: 'n',
    NOD_Command_Post: 'e',
    NOD_Support_Art: 'z',
    NOD_Support_Ion: 'i',
    NOD_Accumulator: 'a',
    NOD_Support_Air: 'x',
    NOD_Defense_Facility: 'w',

    /* GDI Defense Units */
    GDI_Wall: 'w',
    GDI_Cannon: 'c',
    GDI_Antitank_Barrier: 't',
    GDI_Barbwire: 'b',
    GDI_Turret: 'm',
    GDI_Flak: 'f',
    GDI_Art_Inf: 'r',
    GDI_Art_Air: 'e',
    GDI_Art_Tank: 'a',
    GDI_Def_APC_Guardian: 'g',
    GDI_Def_Missile_Squad: 'q',
    GDI_Def_Pitbull: 'p',
    GDI_Def_Predator: 'd',
    GDI_Def_Sniper: 's',
    GDI_Def_Zone_Trooper: 'z',

    /* Nod Defense Units */
    NOD_Def_Antitank_Barrier: 't',
    NOD_Def_Art_Air: 'e',
    NOD_Def_Art_Inf: 'r',
    NOD_Def_Art_Tank: 'a',
    NOD_Def_Attack_Bike: 'p',
    NOD_Def_Barbwire: 'b',
    NOD_Def_Black_Hand: 'z',
    NOD_Def_Cannon: 'c',
    NOD_Def_Confessor: 's',
    NOD_Def_Flak: 'f',
    NOD_Def_MG_Nest: 'm',
    NOD_Def_Militant_Rocket_Soldiers: 'q',
    NOD_Def_Reckoner: 'g',
    NOD_Def_Scorpion_Tank: 'd',
    NOD_Def_Wall: 'w',

    /* Forgotten Defense Units */
    FOR_Wall: 'w',
    FOR_Barbwire_VS_Inf: 'b',
    FOR_Barrier_VS_Veh: 't',
    FOR_Inf_VS_Inf: 'g',
    FOR_Inf_VS_Veh: 'r',
    FOR_Inf_VS_Air: 'q',
    FOR_Sniper: 'n',
    FOR_Mammoth: 'y',
    FOR_Veh_VS_Inf: 'o',
    FOR_Veh_VS_Veh: 's',
    FOR_Veh_VS_Air: 'u',
    FOR_Turret_VS_Inf: 'm',
    FOR_Turret_VS_Inf_ranged: 'a',
    FOR_Turret_VS_Veh: 'v',
    FOR_Turret_VS_Veh_ranged: 'd',
    FOR_Turret_VS_Air: 'f',
    FOR_Turret_VS_Air_ranged: 'e',

    /* GDI Offense Units */
    GDI_APC_Guardian: 'g',
    GDI_Commando: 'c',
    GDI_Firehawk: 'f',
    GDI_Juggernaut: 'j',
    GDI_Kodiak: 'k',
    GDI_Mammoth: 'm',
    GDI_Missile_Squad: 'q',
    GDI_Orca: 'o',
    GDI_Paladin: 'a',
    GDI_Pitbull: 'p',
    GDI_Predator: 'd',
    GDI_Riflemen: 'r',
    GDI_Sniper_Team: 's',
    GDI_Zone_Trooper: 'z',

    /* Nod Offense Units */
    NOD_Attack_Bike: 'b',
    NOD_Avatar: 'a',
    NOD_Black_Hand: 'z',
    NOD_Cobra: 'r',
    NOD_Commando: 'c',
    NOD_Confessor: 's',
    NOD_Militant_Rocket_Soldiers: 'q',
    NOD_Militants: 'm',
    NOD_Reckoner: 'k',
    NOD_Salamander: 'l',
    NOD_Scorpion_Tank: 'o',
    NOD_Specter_Artilery: 'p',
    NOD_Venom: 'v',
    NOD_Vertigo: 't',

    '<last>': '.',
};

export var Constants = {
    // level before values increment at growth rate
    GROWTH_LEVEL: 12,

    MAX_BASE_X: 9, // Width of bases.
    MAX_BASE_Y: 8, // Max Y for Base buildings
    MAX_DEF_Y: 16, // Max Y for D units
    MAX_OFF_Y: 20, // Max Y for O units

    MAX_Y: 20,

    TILE_COUNT: -1, // Calculated

    RESOURCE_COST_GROWTH: 1.32,
    RESOURCE_COST_GROWTH_TOTAL: [],
    RESOURCE_PRODUCTION_GROWTH: 1.25,
    RESOURCE_PLUNDER_GROWTH: 1.26,

    RESOURCE_STORAGE_GROWTH: 1.32,
    RESOURCE_VALUE_GROWTH: 1.1,
    RESOURCE_BONUS_GROWTH: 1.25,

    HEALTH_GROWTH: 1.1,

    CODES,
};
