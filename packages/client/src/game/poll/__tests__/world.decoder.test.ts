import * as o from 'ospec';
import 'source-map-support/register';
import { DecodeWorldCity } from '../decode.world.city';
import { DecodeWorldNpcBase } from '../decode.world.npc.base';

o.spec('WorldDecoder', () => {
    o('should decode a player city', () => {
        const expectedOutput: Record<string, any> = {
            x: 4,
            y: 18,
            level: 14,
            sectorPlayerId: 14,
            allianceId: 547,
            name: 'Slash00x1 1',
            id: 4253932,
        };
        const output = DecodeWorldCity.decode('5RmtZ>AJB-JB--u#6F-BG-Slash00x1 1') as any;
        for (const key of Object.keys(expectedOutput)) {
            o(expectedOutput[key]).equals(output[key]);
        }
    });

    o('should decode a npc base', () => {
        const expectedOutput: Record<string, any> = {
            level: 27.89,
            id: 19592,
            healthBase: 100,
            healthDefense: 100,
        };
        const output = (DecodeWorldNpcBase.decode('yZ0gJBJB-JB--bhC-') as any) ?? {};
        for (const key of Object.keys(expectedOutput)) {
            o(expectedOutput[key]).equals(output[key]);
        }
    });
});
