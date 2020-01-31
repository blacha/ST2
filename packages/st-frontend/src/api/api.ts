import { ApiClaimPlayerAcceptRequest, ApiClaimStartRequest, ApiUtil } from '@st/shared';
import { Auth } from '../auth/auth.service';

export class StApi {
    private async getAuthHeader() {
        const token = await Auth.getToken();
        if (token == null) {
            throw new Error('User is not logged in');
        }
        return { Authorization: 'Bearer ' + token };
    }

    /** Send a request to claim a player this will trigger a mail message being sent in game */
    async claimPlayerRequest(worldId: number, player: string): Promise<boolean> {
        const authHeader = await this.getAuthHeader();
        const req = ApiUtil.request<ApiClaimStartRequest>('post', '/api/v1/world/:worldId/player/:player/claim', {
            worldId,
            player,
        });
        const res = await fetch(req.url, { method: req.method, headers: authHeader });
        if (res.status == 200) {
            return true;
        }
        return false;
    }

    async claimPlayerAccept(claimId: string): Promise<ApiClaimPlayerAcceptRequest['response'] | false> {
        const authHeader = await this.getAuthHeader();

        const req = ApiUtil.request<ApiClaimPlayerAcceptRequest>('get', '/api/v1/claim/:claimId', { claimId });
        const res = await fetch(req.url, { method: req.method, headers: authHeader });
        console.log('claimAccept', res.status);
        if (!res.headers.get('content-type')?.includes('application/json')) {
            throw new Error('Failed to fetch: ' + res.statusText);
        }
        const json = await res.json();
        if (res.status == 200) {
            return json as ApiClaimPlayerAcceptRequest['response'];
        }
        throw new Error(json.message);
    }
}

export const Api = new StApi();
