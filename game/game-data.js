var OUTPUT = [];
var MODULES = {};

function getFaction(name) {

        if (name.indexOf('GDI') === 0) {
            return 'GDI';
        }
        if (name.indexOf('NOD') === 0) {
            return 'NOD';
        }

        return 'FOR';
    }

var MODIFIERS = {
    2: 'TiberiumStorage',
    25: 'TiberiumPackage',

    33: 'TiberiumContinous', // TiberiumPackageTime

    5: 'CrystalStorage',
    26: 'CrystalPackage',
    34: 'CrystalContinous', // CrystalPackageTime

    32: 'CreditPackage',
    36: 'CreditContinous',

    29: 'PowerStorage',
    28: 'PowerPackage',
    35: 'PowerContinous',

    37: 'RepairEfficiencyBase',
    39: 'RepairEfficiencyAir',
    41: 'RepairEfficiencyInf',
    43: 'RepairEfficiencyVech',

    31: 'HeadCountDefense',
    22: 'HeadCountArmy',

    14: 'BuildingSlots'
};

var MOVEMENT_TYPE = {
    0: 'None',
    1: 'Feet',
    2: 'Wheel',
    3: 'Track',
    4: 'Air',
    5: 'Air2',
    6: 'Structure'
};
var ARMOR_TYPE = {
    0: 'NotUsed',
    1: 'LightArmorInfantry',
    2: 'HeavyArmorVehicles',
    3: 'MediumArmorAir',
    4: 'Structure',
    5: 'StructureBase',
    6: 'Obstacle',
    7: 'NONE'
};

var UNIT_TYPE = {
    1: 'Infantry',
    2: 'Tank',
    3: 'Air',
    4: 'Structure'
};
var RESOURCES = {
    1: 'tiberium',
    2: 'crystal',
    3: 'credits',
    4: 'playerlevel',
    5: 'power',
    6: 'ResearchPoints',
    7: 'RepairBase',
    8: 'RepairAir',
    9: 'RepairInf',
    10: 'RepairVeh',
    11: 'OnlyForRewards',
    12: 'ZZ_UNUSED',
    13: 'ExperiencePoints',
    15: 'CommandPoints',
    16: 'SupplyPoints',
    17: 'PackageProduction'
};

function addResource(data, output) {
    var count = data.c;
    var name = RESOURCES[data.t];

    output[name] = count;
}

function getModules(id, w) {
    var output = {};
    output.range = {
        min: w.rmin,
        max: w.rmax
    };

    output.armorType = ARMOR_TYPE[w.tat];

    output.damage = w.d;
    output.id = w.i;
    output.type = w.t;
    output.health = w.h;
    MODULES[w.i] = id;
    return output;
}

function getModifiers(unit, rc) {
    var output = {};
    if (rc === null) {
        return output;
    }

    rc.lm.forEach(function(values) {
        var mod = MODIFIERS[values.t];
        if (mod === undefined) {
            return;
        }
        output[mod] = values.v;
    });

    return output;
}

function getResourceCost(key, rc) {
    var output = {};
    if (rc === null) {
        return output;
    }

    var resources = rc[key];

    resources.forEach(function(res) {
        addResource(res, output);
    });

    return output;
}

var units = GAMEDATA.units;
Object.keys(units).forEach(function(id) {
    var obj = {};
    var unit = units[id];
    obj.id = parseInt(id, 10);
    obj.speed = unit.s;
    obj.display = unit.dn;
    obj.tech = unit.tl;
    obj.name = unit.n;
    obj.faction = getFaction(obj.name);
    obj.health = unit.lp;
    obj.movement = MOVEMENT_TYPE[unit.mt];

    console.log('get-faction', obj.name, obj.faction);
    obj.resources = unit.r.map(getResourceCost.bind(null, 'rr'));
    obj.repair = unit.r.map(getResourceCost.bind(null, 'rer'));
    obj.weapons = unit.m.map(getModules.bind(null, id));
    if (obj.weapons.length === 0) {
        delete obj.weapons;
    }

    OUTPUT.push(obj);

    var tech = GAMEDATA.Tech[obj.tech];
    // no tech data to fetch.
    if (tech === undefined) {
        return;
    }


    obj.modifiers = tech.r.map(getModifiers.bind(null, unit));
    // console.log(obj.name, tech);
});