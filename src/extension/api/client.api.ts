import { StModule } from '../module';
import { CityLayout } from '../../api/city.layout';
import { Coord } from '../../backend/coord';

export class ClientApi implements StModule {
    name = 'api';
    baseUrl = 'https://shockrtools.web.app/api/v1';

    async sendBase(base: CityLayout) {
        const url = [this.baseUrl, 'world', base.world, 'base', Coord.toId(base.x, base.y)].join('/');
        const res = await fetch(url, { method: 'POST', body: JSON.stringify(base) });
        console.log(res.status, url);
        const body = await res.json();
        console.log(body);
    }
}
