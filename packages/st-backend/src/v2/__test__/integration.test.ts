import { V2Sdk } from '@st/api';
import fetch from 'node-fetch';
import * as o from 'ospec';
import { Api } from '../../api';
import { StLogStream } from '@st/shared';
import { Server } from 'http';
import admin = require('firebase-admin');
admin.initializeApp();

function toRecord(map: Map<string, string>): Record<string, string> {
    const obj: Record<string, string> = {};
    for (const [key, value] of map) {
        obj[key] = value;
    }
    return obj;
}

const PORT = process.env.PORT ?? Math.floor(Math.random() * 60000 + 1000);
o.spec('V2Api', () => {
    StLogStream.setLevel(99);
    const headers: Map<string, string> = new Map();

    const authSpy = o.spy(() => null);

    let server: Server | undefined;
    o.before(() => {
        admin.auth().verifyIdToken = authSpy as any;
        V2Sdk.config({ fetch, baseUrl: `http://localhost:${PORT}`, headers: () => toRecord(headers) });
        return new Promise(resolve => {
            server = Api.listen(PORT, resolve);
        });
    });

    o.beforeEach(() => {
        headers.clear();
    });
    o.after(() => new Promise(resolve => (server == null ? resolve() : server.close(resolve))));

    o('should start a server', async () => {
        const res = await V2Sdk.call('debug');
        o(res.ok).equals(true);
        if (!res.ok) return;
        o(res.response).deepEquals({ version: '__VERSION__', hash: '__HASH__' });
    });

    o('should fail when invalid data is sent', async () => {
        const res = await V2Sdk.call('player.get', { player: 'foobar' } as any);
        o(res.ok).equals(false);
        o(res.code).equals(422);
        if (res.ok || res.code != 422) return;
        o(res.reason).deepEquals([{ reason: 'invalid', path: 'playerNameIds' } as const]);
    });

    o('should fail with invalid user auth', async () => {
        const res = await V2Sdk.call('player.list');
        o(res.ok).equals(false);
        o(res.code).equals(403);
    });

    o('should validate auth', async () => {
        headers.set('authorization', 'Bear');
        const resA = await V2Sdk.call('player.list');
        o(resA.ok).equals(false);
        o(resA.code).equals(403);

        headers.set('authorization', 'Bearer BrokenToken');
        const resB = await V2Sdk.call('player.list');
        o(resB.ok).equals(false);
        o(resB.code).equals(403);

        let lastToken = '';
        admin.auth().verifyIdToken = (token: string) => {
            lastToken = token;
            return 'userToken' as any;
        };
        const resC = await V2Sdk.call('player.list');
        o(lastToken).equals('BrokenToken');
        o(resC.ok).equals(false);
        o(resC.code).equals(500);
    });
});
