import { ClientLibMap } from '../util';

export const enum WorldObjectType {
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

export const enum NpcCampType {
    Destroyed = 0,
    Beginner = 1,
    Random = 2,
    Cluster = 3,
    Base = 4,
    Fortress = 6,
    Event = 10,
}

export interface ClientLibWorldObject {
    $ctor: Function;
    Type: WorldObjectType;
}

export interface ClientLibWorld {
    GetObjectFromPosition(x: number, y: number): ClientLibWorldObject;
    GetCities(): ClientLibMap<ClientLibWorldObject>;
}
