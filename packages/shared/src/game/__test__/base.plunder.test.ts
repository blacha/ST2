import * as o from 'ospec';

import { GameResources } from '../game.resources';
import { Building } from '../building/building';
import { BuildingType } from '../building/building.type';

o.spec('BasePlunder', () => {
    o('should plunder buildings', () => {
        const plunder = GameResources.fromResourceType(new Building(BuildingType.Forgotten.Silo, 13).getPlunder());
        o(Math.floor(plunder.crystal)).equals(3685);
        o(Math.floor(plunder.tiberium)).equals(3685);

        const plunderB = GameResources.fromResourceType(
            new Building(BuildingType.Forgotten.TiberiumHarvester, 13).getPlunder(),
        );
        o(Math.floor(plunderB.tiberium)).equals(7229);
        o(plunderB.crystal).equals(0);

        const plunderC = GameResources.fromResourceType(
            new Building(BuildingType.Forgotten.CrystalHarvester, 13).getPlunder(),
        );
        o(Math.floor(plunderC.crystal)).equals(7229);
        o(plunderC.tiberium).equals(0);

        const plunderD = GameResources.fromResourceType(
            new Building(BuildingType.Forgotten.ConstructionYard, 13).getPlunder(),
        );
        o(plunderD.crystal).equals(0);
        o(plunderD.tiberium).equals(2520);
    });
});
