// import { BaseFireStore, CompositeId, PlayerId, WorldId, AllianceId, CityId } from './db';
// import { StCity } from '@cncta/util';

// export interface TaPlayer extends BaseFireStore {
//     id: CompositeId<[WorldId, PlayerId]>;
//     allianceKey: CompositeId<[WorldId, AllianceId]>;
//     playerId: PlayerId;
//     allianceId: AllianceId;
//     worldId: WorldId;

//     cities: Record<CityId, StCity>;
// }

// export interface TaLayout extends BaseFireStore {
//     id: CompositeId<[WorldId, AllianceId]>;
//     allianceId: AllianceId;
//     worldId: WorldId;

//     layouts: Record<number, string>;
// }
