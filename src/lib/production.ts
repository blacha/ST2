import {Base} from './base';
import {Building} from './building/building';
import {BuildingType} from './building/buildingtype';
import {Tile} from './base/tile';
import * as Util from './util';
import {Constants} from './constants';

import {BaseOutput, RawProduction, OutputCalculator} from './production/calculator';


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
//var Links = {
//    Accumulator: {buildings: [], values: [0, 72, 90, 120, 160, 215, 275, 335, 400, 460, 530, 610, 700]},
//    Silo: {
//        buildings: [
//            BuildingType.GDI.TiberiumHarvester.getID(),
//            BuildingType.NOD.TiberiumHarvester.getID()
//        ],
//        values: [0, 72, 90, 125, 170, 220, 275, 335, 400, 460, 530, 610, 710]
//    },
//    Harvester: {
//        buildings: [
//            BuildingType.GDI.Silo.getID(),
//            BuildingType.NOD.Silo.getID()
//        ],
//        values: [0, 72, 90, 125, 170, 220, 275, 335, 400, 460, 530, 610, 710]
//    },
//    PowerPlant: {
//        buildings: [],
//        values: [0, 48, 60, 80, 110, 145, 185, 225, 265, 310, 355, 405, 465],
//        tiles: [Tile.Crystal],
//        tileValues: []
//    },
//    //PowerAccum: {buildings: [], values: [0, 48, 60, 80, 110, 145, 185, 225, 265, 310, 355, 405, 465]},
//    Refinery: {
//        buildings: [
//            BuildingType.GDI.PowerPlant.getID(),
//            BuildingType.NOD.PowerPlant.getID()
//        ],
//        values: [0, 48, 60, 75, 100, 125, 160, 195, 230, 270, 315, 370, 430],
//        tiles: [Tile.Tiberium]
//    },
//    //PowerRefiniery: {buildings: [], values: [0, 72, 90, 110, 145, 190, 240, 290, 345, 410, 475, 555, 650]}
//};


export class BaseProduction {
    static BuildingMap:{[key:string] : OutputCalculator} = {}

    static registerCalculator(calculator:OutputCalculator) {
        calculator.buildings.forEach(function (building) {
            BaseProduction.BuildingMap[building] = calculator;
        });
    }

    static getBuildingOutput(output:BaseOutput, x:number, y:number, building:Building, tile:Tile, base:Base) {
        if (building == null) {
            return;
        }

        var id = building.getID();

        var calculator = BaseProduction.BuildingMap[id];
        if (calculator == null) {
            return;
        }

        var production = calculator.calculate(base, x, y, building);

        if (production.tiberium) {
            output.tiberium.cont += production.tiberium.cont;
            output.tiberium.pkg += production.tiberium.pkg;
        }
        if (production.crystal) {
            output.crystal.cont += production.crystal.cont;
            output.crystal.pkg += production.crystal.pkg;
        }

        if (production.credit) {
            output.credit.cont += production.credit.cont;
            output.credit.pkg += production.credit.pkg;
        }
        if (production.power) {
            output.power.cont += production.power.cont;
            output.power.pkg += production.power.pkg;
        }
    }
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

        base.buildingsForEach(BaseProduction.getBuildingOutput.bind(null, output));
        return output;
    }


}


import {HarvesterCalculator} from './production/harvester';
import {SiloCalculator} from './production/silo';
import {PowerPlantCalculator} from './production/powerplant';
import {AccumulatorCalculator} from './production/accumulator';
import {RefineryCalculator} from './production/refinery';

BaseProduction.registerCalculator(HarvesterCalculator);
BaseProduction.registerCalculator(SiloCalculator);
BaseProduction.registerCalculator(PowerPlantCalculator);
BaseProduction.registerCalculator(AccumulatorCalculator);
BaseProduction.registerCalculator(RefineryCalculator);