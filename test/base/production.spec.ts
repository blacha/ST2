/// <reference path="../../typings/tsd.d.ts" />

declare function require(name:string);
require('source-map-support').install();

import {expect} from 'chai';

import {BaseProduction} from '../../src/lib/production';
import {Base} from '../../src/lib/base';
import {Tile} from '../../src/lib/base/tile';

import * as Util from '../../src/lib/util';

import {DUnitType} from '../../src/lib/unit/dunittype';
import {OUnitType} from '../../src/lib/unit/ounittype';
import {BuildingType} from '../../src/lib/building/buildingtype';
import {Building} from '../../src/lib/building/building';


Util.createTechMap(DUnitType);
Util.createTechMap(OUnitType);
Util.createTechMap(BuildingType);
Util.loadGameData(false);

import '../../src/extension/main';


var base = new Base();

base.setTile(0, 1, Tile.Tiberium);
base.setTile(0, 2, Tile.Tiberium);
base.setTile(0, 3, Tile.Tiberium);

base.setTile(0, 5, Tile.Tiberium);
base.setTile(0, 6, Tile.Tiberium);
base.setTile(0, 7, Tile.Tiberium);

base.setTile(2, 1, Tile.Crystal);
base.setTile(2, 2, Tile.Crystal);
base.setTile(2, 3, Tile.Crystal);


base.setBase(0, 1, new Building(BuildingType.GDI.TiberiumHarvester, 12));
base.setBase(0, 2, new Building(BuildingType.GDI.TiberiumHarvester, 13));
base.setBase(0, 3, new Building(BuildingType.GDI.TiberiumHarvester, 14));

base.setBase(1, 1, new Building(BuildingType.GDI.Silo, 12));
base.setBase(1, 2, new Building(BuildingType.GDI.Silo, 13));
base.setBase(1, 3, new Building(BuildingType.GDI.Silo, 14));

base.setBase(1, 5, new Building(BuildingType.GDI.Refinery, 12));
base.setBase(1, 6, new Building(BuildingType.GDI.Refinery, 13));
base.setBase(1, 7, new Building(BuildingType.GDI.Refinery, 14));

base.setBase(2, 1, new Building(BuildingType.GDI.TiberiumHarvester, 12));
base.setBase(2, 2, new Building(BuildingType.GDI.TiberiumHarvester, 13));
base.setBase(2, 3, new Building(BuildingType.GDI.TiberiumHarvester, 14));

base.setBase(3, 1, new Building(BuildingType.GDI.PowerPlant, 12));
base.setBase(3, 2, new Building(BuildingType.GDI.PowerPlant, 13));
base.setBase(3, 3, new Building(BuildingType.GDI.PowerPlant, 14));

// Power plant for Refinery
//base.setBase(2, 6, new Building(BuildingType.GDI.PowerPlant, 14));
//
//base.setBase(4, 1, new Building(BuildingType.GDI.Accumulator, 12));
//base.setBase(4, 2, new Building(BuildingType.GDI.Accumulator, 13));
//base.setBase(4, 3, new Building(BuildingType.GDI.Accumulator, 14));


var output = BaseProduction.getOutput(base);


['tiberium', 'crystal', 'power', 'credit'].forEach(function (key) {
    var values = output[key];
    console.log(Util.pad(10, key),
        Util.pad(5, Util.formatNumber(values.pkg)),
        Util.pad(5, Util.formatNumber(values.cont)),
        Util.pad(5, Util.formatNumber(values.pkg + values.cont))
    );
});


describe('BasePlunder', () => {
    var base:Base;
    var NO_OUTPUT = {
        cont: 0,
        pkg: 0
    };

    beforeEach(() => {
        base = new Base();
    });

    it('should plunder buildings', () => {
        //  silo : 15 11,478
        // harv 15, 11,478
        var building = new Building(BuildingType.Forgotten.CrystalSilo, 15);
        var plunder = building.getPlunder();

        expect(Math.floor(plunder.crystal)).to.equal(11478);

        building = new Building(BuildingType.Forgotten.TiberiumSilo, 15);
        plunder = building.getPlunder();

        expect(Math.floor(plunder.tiberium)).to.equal(11478);

        console.log('plunder', JSON.stringify(plunder, null, 4))
    });
});

describe('BaseCost', () => {
    var base:Base;

    beforeEach(() => {
        base = new Base();
    });

    it.only('should get upgrade cost', () => {
        //  silo : 15 11,478
        // harv 15, 11,478
        var building = new Building(BuildingType.GDI.Refinery, 15);
        var cost = building.getUpgradeCost();
        console.log('cost', cost);
    });
});

describe('BaseProduction', () => {

    var base:Base;
    var NO_OUTPUT = {
        cont: 0,
        pkg: 0
    };

    beforeEach(() => {
        base = new Base();
        base.setTile(0, 1, Tile.Tiberium);
        base.setTile(0, 2, Tile.Tiberium);
        base.setTile(0, 3, Tile.Tiberium);

        base.setTile(0, 5, Tile.Crystal);
        base.setTile(0, 6, Tile.Crystal);
        base.setTile(0, 7, Tile.Crystal);
    });


    describe('credit', () => {
        it('should produce from Refinery', () => {
            base.setBase(5, 1, new Building(BuildingType.GDI.Refinery, 12));
            base.setBase(5, 2, new Building(BuildingType.GDI.Refinery, 13));
            base.setBase(5, 3, new Building(BuildingType.GDI.Refinery, 14));

            var output = BaseProduction.getOutput(base);

            expect(output.credit.pkg).to.equal(4117.5);
            expect(output.credit.cont).to.equal(0);
            expect(output.power).to.deep.equal(NO_OUTPUT);
            expect(output.crystal).to.deep.equal(NO_OUTPUT);
            expect(output.tiberium).to.deep.equal(NO_OUTPUT);
        });

        it('should produce from tiberium', () => {
            base.setBase(1, 1, new Building(BuildingType.GDI.Refinery, 12));
            base.setBase(1, 2, new Building(BuildingType.GDI.Refinery, 13));
            base.setBase(1, 3, new Building(BuildingType.GDI.Refinery, 14));

            var output = BaseProduction.getOutput(base);
            expect(output.credit.pkg).to.equal(4117.5);
            expect(output.credit.cont).to.equal(4792.5);
            expect(output.power).to.deep.equal(NO_OUTPUT);
            expect(output.crystal).to.deep.equal(NO_OUTPUT);
            expect(output.tiberium).to.deep.equal(NO_OUTPUT);
        });


        it('should produce from power plants', () => {
            base.setBase(3, 1, new Building(BuildingType.GDI.Refinery, 12));
            base.setBase(3, 2, new Building(BuildingType.GDI.Refinery, 13));
            base.setBase(3, 3, new Building(BuildingType.GDI.Refinery, 14));

            base.setBase(2, 1, new Building(BuildingType.GDI.PowerPlant, 12));
            base.setBase(2, 2, new Building(BuildingType.GDI.PowerPlant, 13));
            base.setBase(2, 3, new Building(BuildingType.GDI.PowerPlant, 14));

            var output = BaseProduction.getOutput(base);

            expect(output.credit).to.deep.equal({
                cont: 6294.375,
                pkg: 4117.5
            });
            expect(output.power).to.deep.equal({
                pkg: 4447.916666666666,
                cont: 0
            });
            expect(output.crystal).to.deep.equal(NO_OUTPUT);
            expect(output.tiberium).to.deep.equal(NO_OUTPUT);
        });

    });

    describe('tiberium', () => {

        it('should produce from harvesters', () => {
            base.setBase(0, 1, new Building(BuildingType.GDI.TiberiumHarvester, 12));
            base.setBase(0, 2, new Building(BuildingType.GDI.TiberiumHarvester, 13));
            base.setBase(0, 3, new Building(BuildingType.GDI.TiberiumHarvester, 14));

            var output = BaseProduction.getOutput(base);

            expect(output.credit).to.deep.equal(NO_OUTPUT);
            expect(output.power).to.deep.equal(NO_OUTPUT);
            expect(output.crystal).to.deep.equal(NO_OUTPUT);

            expect(output.tiberium.cont).to.equal(0);
            expect(output.tiberium.pkg).to.equal(8997.5);
        });

        it('should produce from silos', () => {
            base.setBase(0, 1, new Building(BuildingType.GDI.TiberiumHarvester, 12));
            base.setBase(0, 2, new Building(BuildingType.GDI.TiberiumHarvester, 13));
            base.setBase(0, 3, new Building(BuildingType.GDI.TiberiumHarvester, 14));

            base.setBase(1, 1, new Building(BuildingType.GDI.Silo, 12));
            base.setBase(1, 2, new Building(BuildingType.GDI.Silo, 13));
            base.setBase(1, 3, new Building(BuildingType.GDI.Silo, 14));

            var output = BaseProduction.getOutput(base);

            expect(output.credit).to.deep.equal(NO_OUTPUT);
            expect(output.power).to.deep.equal(NO_OUTPUT);
            expect(output.crystal).to.deep.equal(NO_OUTPUT);
            expect(output.tiberium.cont).to.equal(9008.125);
            expect(output.tiberium.pkg).to.equal(8997.5);
        });
    });

    describe('crystal', () => {

        it('should produce from harvesters', () => {
            base.setBase(0, 5, new Building(BuildingType.GDI.TiberiumHarvester, 12));
            base.setBase(0, 6, new Building(BuildingType.GDI.TiberiumHarvester, 13));
            base.setBase(0, 7, new Building(BuildingType.GDI.TiberiumHarvester, 14));

            var output = BaseProduction.getOutput(base);

            expect(output.credit).to.deep.equal(NO_OUTPUT);
            expect(output.power).to.deep.equal(NO_OUTPUT);
            expect(output.tiberium).to.deep.equal(NO_OUTPUT);

            expect(output.crystal.cont).to.equal(0);
            expect(output.crystal.pkg).to.equal(8997.5);
        });

        it('should produce from silos', () => {
            base.setBase(0, 5, new Building(BuildingType.GDI.TiberiumHarvester, 12));
            base.setBase(0, 6, new Building(BuildingType.GDI.TiberiumHarvester, 13));
            base.setBase(0, 7, new Building(BuildingType.GDI.TiberiumHarvester, 14));

            base.setBase(1, 5, new Building(BuildingType.GDI.Silo, 12));
            base.setBase(1, 6, new Building(BuildingType.GDI.Silo, 13));
            base.setBase(1, 7, new Building(BuildingType.GDI.Silo, 14));

            var output = BaseProduction.getOutput(base);

            expect(output.credit).to.deep.equal(NO_OUTPUT);
            expect(output.power).to.deep.equal(NO_OUTPUT);
            expect(output.tiberium).to.deep.equal(NO_OUTPUT);

            expect(output.crystal.cont).to.equal(9008.125);
            expect(output.crystal.pkg).to.equal(8997.5);
        });
    });

    describe('power', () => {

        it('should produce from power plants', () => {
            base.setBase(3, 1, new Building(BuildingType.GDI.PowerPlant, 12));
            base.setBase(3, 2, new Building(BuildingType.GDI.PowerPlant, 13));
            base.setBase(3, 3, new Building(BuildingType.GDI.PowerPlant, 14));

            var output = BaseProduction.getOutput(base);
            expect(output.power.cont).to.equal(0);
            expect(output.power.pkg.toFixed(0)).to.equal("4448");

            expect(output.credit).to.deep.equal(NO_OUTPUT);
            expect(output.crystal).to.deep.equal(NO_OUTPUT);
            expect(output.tiberium).to.deep.equal(NO_OUTPUT);
        });

        it('should produce cont power from crystal ', () => {
            base.setBase(1, 5, new Building(BuildingType.GDI.PowerPlant, 12));
            base.setBase(1, 6, new Building(BuildingType.GDI.PowerPlant, 13));
            base.setBase(1, 7, new Building(BuildingType.GDI.PowerPlant, 14));

            var output = BaseProduction.getOutput(base);
            expect(output.power.cont).to.equal(5147.5);
            expect(output.power.pkg.toFixed(0)).to.equal("4448");

            expect(output.credit).to.deep.equal(NO_OUTPUT);
            expect(output.crystal).to.deep.equal(NO_OUTPUT);
            expect(output.tiberium).to.deep.equal(NO_OUTPUT);
        });

        it('should produce cont power from accumulators ', () => {
            base.setBase(3, 5, new Building(BuildingType.GDI.PowerPlant, 12));
            base.setBase(3, 6, new Building(BuildingType.GDI.PowerPlant, 13));
            base.setBase(3, 7, new Building(BuildingType.GDI.PowerPlant, 14));

            base.setBase(4, 5, new Building(BuildingType.GDI.Accumulator, 12));
            base.setBase(4, 6, new Building(BuildingType.GDI.Accumulator, 13));
            base.setBase(4, 7, new Building(BuildingType.GDI.Accumulator, 14));

            var output = BaseProduction.getOutput(base);
            expect(output.power.cont.toFixed(0)).to.equal("6796");
            expect(output.power.pkg.toFixed(0)).to.equal("4448");

            expect(output.credit).to.deep.equal(NO_OUTPUT);
            expect(output.crystal).to.deep.equal(NO_OUTPUT);
            expect(output.tiberium).to.deep.equal(NO_OUTPUT);
        });

        it('should produce power from crystal and accumulators', () => {
            base.setBase(1, 5, new Building(BuildingType.GDI.PowerPlant, 12));
            base.setBase(1, 6, new Building(BuildingType.GDI.PowerPlant, 13));
            base.setBase(1, 7, new Building(BuildingType.GDI.PowerPlant, 14));

            base.setBase(2, 5, new Building(BuildingType.GDI.Accumulator, 12));
            base.setBase(2, 6, new Building(BuildingType.GDI.Accumulator, 13));
            base.setBase(2, 7, new Building(BuildingType.GDI.Accumulator, 14));

            var output = BaseProduction.getOutput(base);
            expect(output.power.cont.toFixed(0)).to.equal("11943");
            expect(output.power.pkg.toFixed(0)).to.equal("4448");

            expect(output.credit).to.deep.equal(NO_OUTPUT);
            expect(output.crystal).to.deep.equal(NO_OUTPUT);
            expect(output.tiberium).to.deep.equal(NO_OUTPUT);
        });
    });

});