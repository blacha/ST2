import { AllianceId, CityId, TimeStamp, WorldId } from '@cncta/clientlib';
import * as o from 'ospec';
import { WorldAllianceId, WorldCityId } from '../id';

o.spec('PackIds', () => {
    const timestamp = new Date('2020-01-01T00:00:00.000Z').getTime() as TimeStamp;
    const cityId = (2 ** 32 - 1) as CityId;
    const worldId = 410 as WorldId;
    const allianceId = 878723 as AllianceId;

    o('should pack a city', () => {
        const packedA = WorldCityId.pack({ worldId, cityId, timestamp });
        const packedB = WorldCityId.pack({ worldId, cityId, timestamp: Date.now() });

        o(packedA).equals('1imRQec63CFfg4');
        o(packedB.endsWith('c63CFfg4')).equals(true);
        o(packedA < packedB).equals(true);
    });

    o('should pack an alliance', () => {
        const packedAlliance = WorldAllianceId.pack({ worldId, allianceId });
        o(packedAlliance).equals('c6xag3');
    });
});
