import { Config } from '@st/shared';
import { Auth } from '../auth/auth.service';

export class StApi {
    baseUrl = Config.api.url.replace('__URL__', 'https://shockr.dev');

    private async getAuthHeader() {
        const token = await Auth.getToken();
        if (token == null) {
            throw new Error('User is not logged in');
        }
        return { Authorization: 'Bearer ' + token };
    }

    async claimPlayerRequest(worldId: number, player: string): Promise<boolean> {
        const authHeader = await this.getAuthHeader();
        const res = await fetch(`${this.baseUrl}/v1/api/world/${worldId}/player/${player}/claim`, {
            method: 'post',
            headers: { ...authHeader },
        });
        console.log(res);
        return true;
    }
}

export const Api = new StApi();
