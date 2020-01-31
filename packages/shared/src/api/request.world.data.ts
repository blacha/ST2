import { WorldId } from '@cncta/clientlib';

export interface ApiWorldUpdateRequest {
    path: '/api/v1/world/:worldId/update';
    method: 'post';
    params: { worldId: WorldId };
    body: {};
    response: {};
}
