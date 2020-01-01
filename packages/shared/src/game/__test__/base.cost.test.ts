import * as o from 'ospec';
import { Building } from '../building/building';
import { BuildingType } from '../building/building.type';

o.spec('BaseCost', () => {
    o('should get total upgrade cost', () => {
        const building = new Building(BuildingType.GDI.Silo, 1);
        building.level = 1;
        o(building.getTotalUpgradeCost().toJson()).deepEquals({ tiberium: 1, crystal: 0, power: 0, credits: 0 });
        building.level = 2;
        o(building.getTotalUpgradeCost().toJson()).deepEquals({ tiberium: 3, crystal: 0, power: 0, credits: 0 });
        building.level = 3;
        o(building.getTotalUpgradeCost().toJson()).deepEquals({ tiberium: 6, crystal: 0, power: 1, credits: 0 });
        building.level = 4;
        o(building.getTotalUpgradeCost().toJson()).deepEquals({ tiberium: 10, crystal: 0, power: 2, credits: 0 });
        building.level = 5;
        o(building.getTotalUpgradeCost().toJson()).deepEquals({ tiberium: 30, crystal: 0, power: 7, credits: 0 });
        building.level = 6;
        o(building.getTotalUpgradeCost().toJson()).deepEquals({ tiberium: 140, crystal: 0, power: 35, credits: 0 });
        building.level = 11;
        o(building.getTotalUpgradeCost().toJson()).deepEquals({ tiberium: 36000, crystal: 0, power: 9000, credits: 0 });
    });
});
