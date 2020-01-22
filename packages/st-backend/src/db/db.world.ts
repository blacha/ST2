// import { PlayerId, AllianceId, BaseFireStore, CompositeId, WorldId, FireStoreTable, TimeStamp } from './db';

// export interface TaWorldPlayerCity {
//     name: string;
//     level: number;
//     x: number;
//     y: number;
// }

// export interface TaWorldPlayer {
//     playerId: PlayerId;
//     allianceId: AllianceId;
//     name: string;
//     points: number;
//     cities: TaWorldPlayerCity;
// }

// export interface TaWorldAlliance {
//     allianceId: AllianceId;
//     name: string;
// }

// export interface TaWorld extends BaseFireStore {
//     id: CompositeId<[WorldId, AllianceId]>;
//     worldId: WorldId;

//     alliances: TaWorldAlliance;
//     players: TaWorldPlayer;
// }

// export type TaWorldStore = FireStoreTable<'World', TaWorld>;
// export type TaWorldHistoryStore = FireStoreTable<
//     'WorldHistory',
//     TaWorld & { id: CompositeId<[WorldId, AllianceId, TimeStamp]> }
// >;
