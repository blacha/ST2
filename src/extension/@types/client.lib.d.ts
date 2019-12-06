/* eslint-disable @typescript-eslint/camelcase */
declare enum ClientLibTileType {
    Crystal = 1,
    Tiberium = 2,
}

declare enum ClientLibWorldObjectType {
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
declare enum ClientLibFactionType {
    NotInitialized = 0,
    GDIFaction = 1,
    NODFaction = 2,
    FORFaction = 3,
    NPCBase = 4,
    NPCCamp = 5,
    NPCOutpost = 6,
    NPCFortress = 7,
    NPCEvent = 8,
}

declare enum ClientLibNpcCampType {
    Destroyed = 0,
    Beginner = 1,
    Random = 2,
    Cluster = 3,
    Base = 4,
    Fortress = 6,
    Event = 10,
}

interface GameDataTech {
    /**
     * @example NOD_Militants
     */
    dn: string;
    c: number;
}
interface GameDataUnitM {
    t: number;
    i: number;
}
interface GameDataUnit {
    /** Id */
    i: number;
    /**
     * Display name
     * @example "Militants"
     */
    dn: string;
    /** Display Image url */
    dimg: string;

    m: GameDataUnitM[];
}

interface ClientLibPlayerResearchResult {
    get_CurrentLevel(): 0 | 1 | 2;
    get_GameDataUnit_Obj(): GameDataUnit;
    get_GameDataTech_Obj(): GameDataTech;
}

interface ClientLibPlayerResearch {
    GetResearchItemListByType(type: number): ClientLibArray<ClientLibPlayerResearchResult>;
}

interface ClientLibCityBuildable {
    get_CoordX(): number;
    get_CoordY(): number;
    get_MdbUnitId(): number;
    get_CurrentLevel(): number;
}

type ClientLibCityBuilding = ClientLibCityBuildable;
type ClientLibCityUnit = ClientLibCityBuildable;

interface ClientLibCityUnits {
    get_TotalDefenseHeadCount(): number;
}

interface ClientLibCity {
    IsOwnBase(): boolean;
    GetBuildingsConditionInPercent(): number;

    get_Id(): number;
    /** Rounds level */
    get_BaseLevel(): number;
    /** Get full level */
    get_LvlBase(): number;

    get_Name(): string;
    /** Null if current player's base */
    get_ActiveModules(): number[] | null;
    get_Buildings(): ClientLibMap<ClientLibCityBuilding>;
    get_CityFaction(): ClientLibFactionType;
    get_CityUnitsData(): ClientLibCityUnits;
    get_Version(): number | -1;

    get_IsGhostMode(): boolean;
    /** Name of owner, undefined if player */
    get_OwnerName(): string;
    get_OwnerId(): number;
    get_OwnerAllianceId(): number | null;
    get_OwnerAllianceName(): string | undefined;

    get_PosX(): number;
    get_PosY(): number;

    GetResourceType(x: number, y: number): ClientLibTileType;
}

interface ClientLibMap<T> {
    /** Id to record map */
    d: Record<string, T>;
    /** Number of records */
    c: number;
}

interface ClientLibArray<T> {
    l: T[];
}

interface ClientLibCities {
    get_PlayerResearch(): ClientLibPlayerResearch;
    get_CurrentCity(): ClientLibCity | null;
    get_AllCities(): ClientLibMap<ClientLibCity>;
    get_CurrentCityId(): number | -1;
    get_CurrentForeignCityId(): number | -1;
    get_CurrentOwnCity(): ClientLibCity;
    get_CurrentOwnCityId(): number | -1;
    get_HomeCityId(): number | -1;

    set_CurrentCityId(id: number): void;
    GetCity(id: number): ClientLibCity | null;
}

interface ClientLibAlliance {
    get_Id(): number;
}

interface ClientLibPlayer {
    /** Player Name */
    name: string;
    accountId: number;
    allianceId: number;
    /** Player Id */
    id: number;
    get_PlayerResearch(): ClientLibPlayerResearch;
}

interface ClientLibServer {
    get_WorldId(): number;
    get_MaxAttackDistance(): number;
}
interface ClientLibWorldObject {
    Type: ClientLibWorldObjectType;
}
interface ClientLibWorld {
    GetObjectFromPosition(x: number, y: number): ClientLibWorldObject;
}

interface ClientLibMainData {
    get_Time(): unknown;
    get_Chat(): unknown;
    get_Server(): ClientLibServer;
    get_World(): ClientLibWorld;
    get_Player(): ClientLibPlayer;
    get_Alliance(): ClientLibAlliance;
    get_Cities(): ClientLibCities;
    get_CitiesSupport(): unknown;
    get_Mail(): unknown;
    get_Reports(): unknown;
    get_Missions(): unknown;
    get_BaseColors(): unknown;
    get_Gift(): unknown;
    get_Forum(): unknown;
    get_Notifications(): unknown;
    get_Combat(): unknown;
    get_AllianceCombatState(): unknown;
    get_AllianceSupportState(): unknown;
    get_AllianceTargetWatcher(): unknown;
    get_Inventory(): unknown;
    get_ShopCatalog(): unknown;
    get_PlayerSubstitution(): unknown;
    get_EndGame(): unknown;
    get_Challenge(): unknown;
    get_ArsenalHandler(): unknown;
}

interface ClientLibMathUtil {
    EncodeCoordId(x: number, y: number): number;
}
interface ClientLibVis {
    CenterGridPosition(x: number, y: number): void;
    Update(): void;
    ViewUpdate(): void;
}

interface Singleton<T> {
    GetInstance(): T;
}

interface ClientLibStatic {
    Data: {
        MainData: Singleton<ClientLibMainData>;
        WorldSector: {
            ObjectType: typeof ClientLibWorldObjectType;
        };
        Reports: {
            ENPCCampType: typeof ClientLibNpcCampType;
        };
    };
    Vis: {
        VisMain: Singleton<ClientLibVis>;
    };
    Base: {
        MathUtil: ClientLibMathUtil;
        EFactionType: typeof ClientLibFactionType;
    };
}

declare const ClientLib: ClientLibStatic;
