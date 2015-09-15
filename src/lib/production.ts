import {Base} from './base';
import {Building} from './building/building';
import {Tile} from './base/tile';
import * as Util from './util';
import {Constants} from './constants';

interface RawProduction {
    cont: number;
    pkg: number;
}

interface BaseOutput {
    tiberium: RawProduction;
    crystal: RawProduction;
    power: RawProduction;
    credit: RawProduction;
}


var LinkValues = [
    {1: 72, 2: 90, 3: 125, 4: 170, 5: 220, 6: 275, 7: 335, 8: 400, 9: 460, 10: 530, 11: 610, 12: 710}
]

/*
 Links:
 ClientLib.Base.ELinkType.None = 0;
 ClientLib.Base.ELinkType.AccumulatorPowerBonus = 29;
 ClientLib.Base.ELinkType.SiloTiberiumProduction = 34;
 ClientLib.Base.ELinkType.SiloCrystalProduction = 35;
 ClientLib.Base.ELinkType.PowerplantCreditBonus = 36;
 ClientLib.Base.ELinkType.TiberiumCreditProduction = 37;
 ClientLib.Base.ELinkType.CrystalCreditProduction = 38;
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
var LinkBonus = {
    AccumPower: [0, 72, 90, 120, 160, 215, 275, 335, 400, 460, 530, 610, 700],
    Silo: [0, 72, 90, 125, 170, 220, 275, 335, 400, 460, 530, 610, 710],
    Harvester: [0, 72, 90, 125, 170, 220, 275, 335, 400, 460, 530, 610, 710],
    PowerAccum: [0, 48, 60, 80, 110, 145, 185, 225, 265, 310, 355, 405, 465],
    RefineryPower: [0, 48, 60, 75, 100, 125, 160, 195, 230, 270, 315, 370, 430],
    PowerRefiniery: [0, 72, 90, 110, 145, 190, 240, 290, 345, 410, 475, 555, 650]
}

export class BaseProduction {
    static getOutput(base:Base) {
        var tiberium = [];
        var crystal = [];
        base.buildingsForEach(function (x, y, building, tile, base) {
            if (building == null) {
                return;
            }

            if (building.getClassName() === 'harvester') {
                if (tile == Tile.Tiberium) {
                    tiberium.push(building);
                } else if (tile == Tile.Crystal) {
                    crystal.push(building);
                }
            }
        });



        return tiberium.map(function (building:Building) {
            var GD = building.getGameData();
            var output = BaseProduction.getProductionValue(building);
            //console.log(output);
        })
    }

    static getProductionValue(building:Building, productionType?:string):RawProduction {
        var tiberium = [];
        var gd = building.getGameData();

        var modifiers = gd.modifiers;
        var maxMod = modifiers[modifiers.length - 1];
        if (maxMod.TiberiumPackageTime == null) {
            return null;
        }

        // Package amount is per minute
        var packTime = Util.getModifierValue(gd, 'TiberiumPackageTime', building.getLevel(), 1);
        var packAmount = Util.getModifierValue(gd, 'TiberiumPackage', building.getLevel());
        var outputPackage = (packAmount / packTime) * 3600;
        console.log(building.getLevel(), Util.formatNumber(outputPackage));

        return {
            cont: 0,
            pkg: outputPackage
        };
    }
}