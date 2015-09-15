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

 packageTime
 1: 1:00
 2: 2:00
 3: 3:20
 4: 10:00
 5: 20:00
 */
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


        console.log(tiberium);

        return tiberium.map(function (building:Building) {
            var GD = building.getGameData();
            var output = BaseProduction.getProductionValue(building);
            console.log(output);
        })
    }

    static getProductionValue(building:Building, productionType?:string):RawProduction {
        var tiberium = [];
        var gd = building.getGameData();

        var modifiers = gd.modifiers;
        var maxMod = modifiers[modifiers.length - 1];
        if (maxMod.TiberiumContinous == null) {
            return null;
        }

        var outputCont = Util.getModifierValue(gd, 'TiberiumContinous', building.getLevel());
        // Package amount is per minute
        var outputPack = Util.getModifierValue(gd, 'TiberiumPackage', building.getLevel());

        // 4 -> 240
        // 10 -> 300
        // 24 -> 423


        //console.log('tib-output', building.getLevel(), outputCont, outputPack);
        return {
            cont: outputCont,
            pkg: outputPack
        };
    }
}