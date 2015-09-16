import {Base} from './base';
import {Building} from './building/building';
import {BuildingType} from './building/buildingtype';
import {Tile} from './base/tile';
import * as Util from './util';
import {Constants} from './constants';

interface RawProduction {
    cont: number;
    pkg?: number;
}

interface BaseOutput {
    tiberium?: RawProduction;
    crystal?: RawProduction;
    power?: RawProduction;
    credit?: RawProduction;
}


var LinkValues = [
    {1: 72, 2: 90, 3: 125, 4: 170, 5: 220, 6: 275, 7: 335, 8: 400, 9: 460, 10: 530, 11: 610, 12: 710}
]

/*

 ClientLib.Base.ELinkType.PowerplantCreditBonus = 36;
 ClientLib.Base.ELinkType.CrystalCreditProduction = 38;
 ClientLib.Base.ELinkType.TiberiumCreditProduction = 37;


 Links:
 ClientLib.Base.ELinkType.None = 0;
 ClientLib.Base.ELinkType.AccumulatorPowerBonus = 29;
 ClientLib.Base.ELinkType.SiloTiberiumProduction = 34;
 ClientLib.Base.ELinkType.SiloCrystalProduction = 35;
 ClientLib.Base.ELinkType.HarvesterTiberiumProduction = 39;
 ClientLib.Base.ELinkType.HarvesterCrystalProduction = 40;
 ClientLib.Base.ELinkType.PowerPlantAccumulatorBonus = 41;
 ClientLib.Base.ELinkType.RefineryPowerBonus = 42;
 this.PackageDeltaPerHour += ((packageSizeValue / timeBonusValue) * serverTime.get_StepsPerHour$0()); // 3600
 29 [0, 72,90,120,160,215,275,335,400,460,530,610,700]
 34 [0, 72,90,125,170,220,275,335,400,460,530,610,710] Silo
 35 [0, 72,90,125,170,220,275,335,400,460,530,610,710] Silo
 36 [0, 72,90,110,145,190,240,290,345,410,475,555,650]
 37 [0, 60,75,90,120,160,200,240,290,340,400,460,540]
 38 [0, 60,75,100,135,180,230,280,330,380,440,500,580]
 39 [0, 72,90,125,170,220,275,335,400,460,530,610,710] Silo
 40 [0, 72,90,125,170,220,275,335,400,460,530,610,710] Silo
 41 [0, 48,60,80,110,145,185,225,265,310,355,405,465]
 42 [0, 48,60,75,100,125,160,195,230,270,315,370,430]
 packageTime
 1: 1:00
 2: 2:00
 3: 3:20
 4: 10:00
 5: 20:00
 */
var Links = {
    Accumulator: {buildings: [], values: [0, 72, 90, 120, 160, 215, 275, 335, 400, 460, 530, 610, 700]},
    Silo: {
        buildings: [
            BuildingType.GDI.TiberiumHarvester.getID(),
            BuildingType.NOD.TiberiumHarvester.getID()
        ],
        values: [0, 72, 90, 125, 170, 220, 275, 335, 400, 460, 530, 610, 710]
    },
    Harvester: {
        buildings: [
            BuildingType.GDI.Silo.getID(),
            BuildingType.NOD.Silo.getID()
        ],
        values: [0, 72, 90, 125, 170, 220, 275, 335, 400, 460, 530, 610, 710]
    },
    PowerPlant: {
        buildings: [],
        values: [0, 48, 60, 80, 110, 145, 185, 225, 265, 310, 355, 405, 465],
        tiles: [Tile.Crystal],
        tileValues: []
    },
    //PowerAccum: {buildings: [], values: [0, 48, 60, 80, 110, 145, 185, 225, 265, 310, 355, 405, 465]},
    Refinery: {
        buildings: [
            BuildingType.GDI.PowerPlant.getID(),
            BuildingType.NOD.PowerPlant.getID()
        ],
        values: [0, 48, 60, 75, 100, 125, 160, 195, 230, 270, 315, 370, 430],
        tiles: [Tile.Tiberium]
    },
    //PowerRefiniery: {buildings: [], values: [0, 72, 90, 110, 145, 190, 240, 290, 345, 410, 475, 555, 650]}
};


export class BaseProduction {
    static getOutput(base:Base):BaseOutput {
        var output = {
            tiberium: {
                cont: 0,
                pkg: 0
            },
            crystal: {
                cont: 0,
                pkg: 0
            },
            credit: {
                cont: 0,
                pkg: 0
            },
            power: {
                cont: 0,
                pkg: 0
            }
        };
        var tiberium = [];
        var crystal = [];
        base.buildingsForEach(function (x, y, building, tile, base) {
            if (building == null) {
                return;
            }

            var className = building.getClassName();
            var production;
            if (className === 'harvester') {
                production = BaseProduction.getHavesterProduction(base, x, y, building);
                if (tile == Tile.Tiberium) {
                    output.tiberium.cont += production.cont;
                    output.tiberium.pkg += production.pkg;
                } else if (tile == Tile.Crystal) {
                    output.crystal.cont += production.cont;
                    output.crystal.pkg += production.pkg;
                }
                return;
            }

            if (className === 'silo') {
                production = BaseProduction.getSiloProduction(base, x, y, building);
                if (production.tiberium.cont > 0) {
                    output.tiberium.cont += production.tiberium.cont;
                    output.tiberium.pkg += production.tiberium.pkg;
                }
                if (production.crystal.cont > 0) {
                    output.crystal.cont += production.crystal.cont;
                    output.crystal.pkg += production.crystal.pkg;
                }
                return;
            }

            if (className === 'power-plant') {
                production = BaseProduction.getPowerPlantProduction(base, x, y, building);
                output.power.cont += production.cont;
                output.power.pkg += production.pkg;
            }
        });

        console.log('tiberium', tiberium);
        console.log('crystal', crystal);

        return output;
    }

    static getSiloProduction(base:Base, x:number, y:number, building:Building):BaseOutput {
        var output = {
            crystal: {
                cont: 0,
                pkg: 0
            },
            tiberium: {
                cont: 0,
                pkg: 0
            }
        };
        var gd = building.getGameData();

        var nearBy = base.getSurroundingBuildings(x, y, Links.Silo.buildings);
        var perHarvester = Util.getGrowthValue(Links.Silo.values, building.getLevel());
        for (var i = 0; i < nearBy.length; i++) {
            var nearBuilding = nearBy[i];
            var tile = base.getTile(nearBuilding.x, nearBuilding.y);
            if (tile === Tile.Tiberium) {
                output.tiberium.cont += perHarvester;
            } else if (tile === Tile.Crystal) {
                output.crystal.cont += perHarvester
            }
        }

        return output;
    }

    static getPowerPlantProduction(base:Base, x:number, y:number, building:Building):RawProduction {
        var output = {
            cont: 0,
            pkg: 0
        };
        var gd = building.getGameData();

        var nearBy = base.getSurroundingBuildings(x, y, Links.PowerPlant.buildings, Links.PowerPlant.tiles);
        var perHarvester = Util.getGrowthValue(Links.Silo.values, building.getLevel());
        for (var i = 0; i < nearBy.length; i++) {
            var nearBuilding = nearBy[i];
            var tile = base.getTile(nearBuilding.x, nearBuilding.y);
            if (tile === Tile.Tiberium) {
                output.tiberium.cont += perHarvester;
            } else if (tile === Tile.Crystal) {
                output.crystal.cont += perHarvester
            }
        }

        return output;
    }

    static getHavesterProduction(base:Base, x:number, y:number, building:Building):RawProduction {
        var gd = building.getGameData();

        // Package amount is per minute
        var packTime = Util.getModifierValue(gd, 'TiberiumPackageTime', building.getLevel(), 1);
        var packAmount = Util.getModifierValue(gd, 'TiberiumPackage', building.getLevel());
        var outputPackage = (packAmount / packTime) * 3600;

        var nearBy = base.getSurroundingBuildings(x, y, Links.Harvester.buildings);
        var outputCont = 0;
        if (nearBy.length > 0) {
            outputCont = Util.getGrowthValue(Links.Harvester.values, building.getLevel());
        }

        return {
            cont: outputCont,
            pkg: outputPackage
        };
    }
}