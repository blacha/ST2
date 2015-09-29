import {BaseAttack} from './va/va';
import {Base} from '../lib/base';
//import './city/city.data';
var data;

function AttackAll(data) {
    var output = [];

    data.forEach(function (baseData) {
        if (baseData == null) {
            return;
        }
        if (baseData.level < 17) {
        //|| baseData.x != 496 || baseData.y != 202) {
            return;
        }
        console.log(baseData.name, baseData.x, baseData.y, baseData.level);
        var base = Base.load(baseData);
        var BA = new BaseAttack(base);
        output.push({
            BA: BA,
            attack: BA.attack(),
            data: baseData,
            base: base
        });
    });


    var ab = output.sort(function (a, b) {
        return a.attack - b.attack
    });

    console.log('ATTACK DATA');
    for (var i = 0; i < ab.length; i++) {
        var obj = ab[i];
        console.log(obj.data.name, obj.data.level.toFixed(1), obj.data.x, obj.data.y, obj.attack);
    }
}

import * as Util from './../lib/util';

import {DUnitType} from './../lib/unit/dunittype';
import {OUnitType} from './../lib/unit/ounittype';
import {BuildingType} from './../lib/building/buildingtype';

Util.createTechMap(DUnitType);
Util.createTechMap(OUnitType);
Util.createTechMap(BuildingType);
Util.loadGameData(true);

if (typeof window !== 'undefined') {
    (<any>window).AA = AttackAll;
}


//var base  = Base.load(data);
//var BA = new BaseAttack(base);
////BaseAttack.attack(base);
//
//console.log(BA.attack());