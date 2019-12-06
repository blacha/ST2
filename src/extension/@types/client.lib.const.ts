export enum TileType {
    Crystal = 1,
    Tiberium = 2,
}

export enum EntityState {
    None = -1,
    Normal = 0,
    Damaged = 1,
    Destroyed = 2,
}
export enum WorldObjectType {
    None = 0,
    City = 1,
    NPCBase = 2,
    NPCCamp = 3,
    PointOfInterest = 4,
    NewPlayerSlot = 5,
    Ruin = 7,
    Marker = 8,
    Outpost = 9,
    FreeSlot = 255,
}

export enum NpcCampType {
    Destroyed = 0,
    Beginner = 1,
    Random = 2,
    Cluster = 3,
    Base = 4,
    Fortress = 6,
    Event = 10,
}

export enum ModifierType {
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

export enum MovementType {
    None = 0,
    Feet = 1,
    Wheel = 2,
    Track = 3,
    Air = 4,
    AirFast = 5,
    Structure = 6,
    TrackWall = 7,
}

export enum ResourceType {
    Tiberium = 1,
    Crystal = 2,
    Credits = 3,
    PlayerLevel = 4,
    Power = 5,
    ResearchPoints = 6,
    RepairBase = 7,
    RepairAir = 8,
    RepairInf = 9,
    RepairVeh = 10,
    OnlyForRewards = 11,
    ZUnused = 12,
    ExperiencePoints = 13,
    CommandPoints = 15,
    SupplyPoints = 16,
    PackageProduction = 17,
    VeteranPoints = 18,
}

export enum UnitType {
    Infantry = 1,
    Tank = 2,
    Air = 3,
    Structure = 4,
}

export enum ArmorType {
    LightArmorInfantry = 1,
    HeavyArmorVehicles = 2,
    MediumArmorAir = 3,
    Structure = 4,
    StructureBase = 5,
    Obstacle = 6,
    None = 7,
}

export enum FactionType {
    NotInitialized = 0,
    Gdi = 1,
    Nod = 2,
    Forgotten = 3,
    NpcBase = 4,
    NpcCamp = 5,
    NpcOutpost = 6,
    NpcFortress = 7,
    NpcEvent = 8,
}
export enum TechName {
    Invalid = -1,
    ConstructionYard = 0,
    Refinery = 1,
    PowerPlant = 2,
    CommandCenter = 3,
    DefenseHQ = 4,
    Barracks = 5,
    Factory = 6,
    Airport = 7,
    DefenseFacility = 8,
    ResearchBaseFound = 9,
    HarvesterCrystal = 10,
    Harvester = 11,
    SupportAir = 12,
    SupportIon = 13,
    SupportArt = 14,
    Silo = 15,
    Accumulator = 16,
}

export enum PlacementType {
    None = 0,
    Defense = 1,
    Offense = 2,
    Terrain = 3,
    Structure = 4,
}

export type PartialModifierMap = Partial<Record<keyof typeof ModifierType, number>>;
export type PartialResourceMap = Partial<Record<keyof typeof ResourceType, number>>;
