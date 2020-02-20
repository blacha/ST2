import { ApiLayoutClaimRequest } from '@st/shared';
import { ApiCall } from '../api.call';

export class ApiLayoutClaim extends ApiCall<ApiLayoutClaimRequest> {
    name = 'layout.claim';
    path = '/api/v1/world/:worldId/alliance/:allianceId/layout' as const;
    method = 'post' as const;

    async handle(): Promise<ApiLayoutClaimRequest['response']> {
        return {};
    }
}
