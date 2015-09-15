import {GameDataJSON} from '../lib/data/gamedata';

export var GAMEDATA:GameDataJSON[] = [<GameDataJSON>
{
    "id": 81,
    "speed": 60,
    "display": "Rifleman Squad",
    "tech": 120,
    "name": "GDI_Riflemen",
    "faction": "GDI",
    "health": 700,
    "movement": "Feet",
    "resources": [{}, {"crystal": 1}, {"crystal": 2}, {"crystal": 3, "power": 1}, {
        "crystal": 5,
        "power": 1
    }, {"crystal": 30, "power": 8}, {"crystal": 175, "power": 44}, {"crystal": 675, "power": 169}, {
        "crystal": 1775,
        "power": 444
    }, {"crystal": 4900, "power": 1225}, {"crystal": 13250, "power": 3313}, {
        "crystal": 26750,
        "power": 6688
    }, {"crystal": 48000, "power": 12000}],
    "repair": [{}, {"crystal": 1, "RepairInf": 171}, {"crystal": 1, "RepairInf": 197}, {
        "crystal": 1,
        "RepairInf": 226
    }, {"crystal": 3, "RepairInf": 260}, {"crystal": 14, "RepairInf": 299}, {
        "crystal": 79,
        "RepairInf": 344
    }, {"crystal": 203, "RepairInf": 396}, {"crystal": 266, "RepairInf": 456}, {
        "crystal": 319,
        "RepairInf": 524
    }, {"crystal": 398, "RepairInf": 603}, {"crystal": 490, "RepairInf": 693}, {"crystal": 605, "RepairInf": 798}],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 220,
        "id": 1,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 110,
        "id": 2,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "MediumArmorAir",
        "damage": 0,
        "id": 3,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 70,
        "id": 4,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 70,
        "id": 5,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 150}, "armorType": "Structure", "damage": 0, "id": 321, "type": 3, "health": 0}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 82,
    "speed": 60,
    "display": "Missile Squad",
    "tech": 46,
    "name": "GDI_Missile Squad",
    "faction": "GDI",
    "health": 700,
    "movement": "Feet",
    "resources": [{}, {"crystal": 1}, {"crystal": 2}, {"crystal": 4, "power": 2}, {
        "crystal": 7,
        "power": 2
    }, {"crystal": 48, "power": 12}, {"crystal": 280, "power": 70}, {"crystal": 1080, "power": 270}, {
        "crystal": 2840,
        "power": 710
    }, {"crystal": 7840, "power": 1960}, {"crystal": 21200, "power": 5300}, {
        "crystal": 42800,
        "power": 10700
    }, {"crystal": 76800, "power": 19200}],
    "repair": [{}, {"crystal": 1, "RepairInf": 171}, {"crystal": 1, "RepairInf": 197}, {
        "crystal": 2,
        "RepairInf": 226
    }, {"crystal": 4, "RepairInf": 260}, {"crystal": 22, "RepairInf": 299}, {
        "crystal": 126,
        "RepairInf": 344
    }, {"crystal": 324, "RepairInf": 396}, {"crystal": 426, "RepairInf": 456}, {
        "crystal": 510,
        "RepairInf": 524
    }, {"crystal": 636, "RepairInf": 603}, {"crystal": 783, "RepairInf": 693}, {"crystal": 968, "RepairInf": 798}],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 50,
        "id": 6,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 120,
        "id": 7,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "MediumArmorAir",
        "damage": 0,
        "id": 8,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 250,
        "id": 9,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 250,
        "id": 10,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 50,
        "id": 483,
        "type": 7,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 120,
        "id": 484,
        "type": 7,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 250,
        "id": 485,
        "type": 7,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 250,
        "id": 486,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 83,
    "speed": 60,
    "display": "Sniper Team",
    "tech": 44,
    "name": "GDI_Sniper Team",
    "faction": "GDI",
    "health": 500,
    "movement": "Feet",
    "resources": [{}, {"crystal": 3}, {"crystal": 5}, {"crystal": 13, "power": 5}, {
        "crystal": 23,
        "power": 6
    }, {"crystal": 150, "power": 38}, {"crystal": 875, "power": 219}, {"crystal": 3375, "power": 844}, {
        "crystal": 8875,
        "power": 2219
    }, {"crystal": 24500, "power": 6125}, {"crystal": 66250, "power": 16563}, {
        "crystal": 133750,
        "power": 33438
    }, {"crystal": 240000, "power": 60000}],
    "repair": [{}, {"crystal": 1, "RepairInf": 342}, {"crystal": 3, "RepairInf": 394}, {
        "crystal": 6,
        "RepairInf": 453
    }, {"crystal": 11, "RepairInf": 521}, {"crystal": 68, "RepairInf": 599}, {
        "crystal": 394,
        "RepairInf": 689
    }, {"crystal": 1013, "RepairInf": 792}, {"crystal": 1331, "RepairInf": 911}, {
        "crystal": 1593,
        "RepairInf": 1048
    }, {"crystal": 1988, "RepairInf": 1206}, {"crystal": 2448, "RepairInf": 1386}, {
        "crystal": 3024,
        "RepairInf": 1595
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 300,
        "id": 11,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 50,
        "id": 12,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 40,
        "id": 13,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "StructureBase",
        "damage": 40,
        "id": 14,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 360,
        "id": 491,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 84,
    "speed": 60,
    "display": "Zone Troopers",
    "tech": 48,
    "name": "GDI_Zone Trooper",
    "faction": "GDI",
    "health": 800,
    "movement": "Feet",
    "resources": [{}, {"crystal": 1}, {"crystal": 2}, {"crystal": 5, "power": 2}, {
        "crystal": 9,
        "power": 2
    }, {"crystal": 60, "power": 15}, {"crystal": 350, "power": 88}, {"crystal": 1350, "power": 338}, {
        "crystal": 3550,
        "power": 888
    }, {"crystal": 9800, "power": 2450}, {"crystal": 26500, "power": 6625}, {
        "crystal": 53500,
        "power": 13375
    }, {"crystal": 96000, "power": 24000}],
    "repair": [{}, {"crystal": 1, "RepairInf": 171}, {"crystal": 1, "RepairInf": 197}, {
        "crystal": 3,
        "RepairInf": 226
    }, {"crystal": 5, "RepairInf": 260}, {"crystal": 27, "RepairInf": 299}, {
        "crystal": 158,
        "RepairInf": 344
    }, {"crystal": 405, "RepairInf": 396}, {"crystal": 533, "RepairInf": 456}, {
        "crystal": 637,
        "RepairInf": 524
    }, {"crystal": 795, "RepairInf": 603}, {"crystal": 979, "RepairInf": 693}, {"crystal": 1210, "RepairInf": 798}],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 40,
        "id": 15,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 350,
        "id": 16,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "MediumArmorAir",
        "damage": 0,
        "id": 17,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 60,
        "id": 18,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 60,
        "id": 19,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 329, "type": 4, "health": 0}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 85,
    "speed": 60,
    "display": "Commando",
    "tech": 53,
    "name": "GDI_Commando",
    "faction": "GDI",
    "health": 900,
    "movement": "Feet",
    "resources": [{}, {"crystal": 4}, {"crystal": 8}, {"crystal": 20, "power": 8}, {
        "crystal": 36,
        "power": 9
    }, {"crystal": 240, "power": 60}, {"crystal": 1400, "power": 350}, {
        "crystal": 5400,
        "power": 1350
    }, {"crystal": 14200, "power": 3550}, {"crystal": 39200, "power": 9800}, {
        "crystal": 106000,
        "power": 26500
    }, {"crystal": 214000, "power": 53500}, {"crystal": 384000, "power": 96000}],
    "repair": [{}, {"crystal": 2, "RepairInf": 342}, {"crystal": 4, "RepairInf": 394}, {
        "crystal": 10,
        "RepairInf": 453
    }, {"crystal": 18, "RepairInf": 521}, {"crystal": 108, "RepairInf": 599}, {
        "crystal": 630,
        "RepairInf": 689
    }, {"crystal": 1620, "RepairInf": 792}, {"crystal": 2130, "RepairInf": 911}, {
        "crystal": 2548,
        "RepairInf": 1048
    }, {"crystal": 3180, "RepairInf": 1206}, {"crystal": 3916, "RepairInf": 1386}, {
        "crystal": 4838,
        "RepairInf": 1595
    }],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 80,
        "id": 20,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 40,
        "id": 21,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 500,
        "id": 22,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 500,
        "id": 23,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 500, "type": 4, "health": 0}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 86,
    "speed": 120,
    "display": "Pitbull",
    "tech": 49,
    "name": "GDI_Pitbull",
    "faction": "GDI",
    "health": 800,
    "movement": "Wheel",
    "resources": [{}, {"crystal": 2}, {"crystal": 4}, {"crystal": 9, "power": 4}, {
        "crystal": 16,
        "power": 4
    }, {"crystal": 108, "power": 27}, {"crystal": 630, "power": 158}, {"crystal": 2430, "power": 608}, {
        "crystal": 6390,
        "power": 1598
    }, {"crystal": 17640, "power": 4410}, {"crystal": 47700, "power": 11925}, {
        "crystal": 96300,
        "power": 24075
    }, {"crystal": 172800, "power": 43200}],
    "repair": [{}, {"crystal": 1, "RepairVeh": 377}, {"crystal": 2, "RepairVeh": 433}, {
        "crystal": 5,
        "RepairVeh": 498
    }, {"crystal": 8, "RepairVeh": 573}, {"crystal": 49, "RepairVeh": 659}, {
        "crystal": 284,
        "RepairVeh": 758
    }, {"crystal": 729, "RepairVeh": 872}, {"crystal": 959, "RepairVeh": 1003}, {
        "crystal": 1147,
        "RepairVeh": 1153
    }, {"crystal": 1431, "RepairVeh": 1327}, {"crystal": 1762, "RepairVeh": 1526}, {
        "crystal": 2177,
        "RepairVeh": 1755
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 70,
        "id": 24,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 120,
        "id": 25,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 0,
        "id": 26,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 250,
        "id": 27,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "StructureBase",
        "damage": 250,
        "id": 28,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 0,
        "id": 322,
        "type": 3,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 87,
    "speed": 90,
    "display": "Predator",
    "tech": 47,
    "name": "GDI_Predator",
    "faction": "GDI",
    "health": 1000,
    "movement": "Track",
    "resources": [{}, {"crystal": 2}, {"crystal": 4}, {"crystal": 10, "power": 4}, {
        "crystal": 18,
        "power": 5
    }, {"crystal": 120, "power": 30}, {"crystal": 700, "power": 175}, {"crystal": 2700, "power": 675}, {
        "crystal": 7100,
        "power": 1775
    }, {"crystal": 19600, "power": 4900}, {"crystal": 53000, "power": 13250}, {
        "crystal": 107000,
        "power": 26750
    }, {"crystal": 192000, "power": 48000}],
    "repair": [{}, {"crystal": 1, "RepairVeh": 377}, {"crystal": 2, "RepairVeh": 433}, {
        "crystal": 5,
        "RepairVeh": 498
    }, {"crystal": 9, "RepairVeh": 573}, {"crystal": 54, "RepairVeh": 659}, {
        "crystal": 315,
        "RepairVeh": 758
    }, {"crystal": 810, "RepairVeh": 872}, {"crystal": 1065, "RepairVeh": 1003}, {
        "crystal": 1274,
        "RepairVeh": 1153
    }, {"crystal": 1590, "RepairVeh": 1327}, {"crystal": 1958, "RepairVeh": 1526}, {
        "crystal": 2419,
        "RepairVeh": 1755
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 60,
        "id": 29,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 230,
        "id": 30,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 100,
        "id": 32,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "StructureBase",
        "damage": 100,
        "id": 33,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 275,
        "id": 474,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 88,
    "speed": 120,
    "display": "Guardian",
    "tech": 121,
    "name": "GDI_APC Guardian",
    "faction": "GDI",
    "health": 1000,
    "movement": "Wheel",
    "resources": [{}, {"crystal": 2}, {"crystal": 3}, {"crystal": 8, "power": 3}, {
        "crystal": 14,
        "power": 4
    }, {"crystal": 96, "power": 24}, {"crystal": 560, "power": 140}, {"crystal": 2160, "power": 540}, {
        "crystal": 5680,
        "power": 1420
    }, {"crystal": 15680, "power": 3920}, {"crystal": 42400, "power": 10600}, {
        "crystal": 85600,
        "power": 21400
    }, {"crystal": 153600, "power": 38400}],
    "repair": [{}, {"crystal": 1, "RepairVeh": 377}, {"crystal": 2, "RepairVeh": 433}, {
        "crystal": 4,
        "RepairVeh": 498
    }, {"crystal": 7, "RepairVeh": 573}, {"crystal": 43, "RepairVeh": 659}, {
        "crystal": 252,
        "RepairVeh": 758
    }, {"crystal": 648, "RepairVeh": 872}, {"crystal": 852, "RepairVeh": 1003}, {
        "crystal": 1019,
        "RepairVeh": 1153
    }, {"crystal": 1272, "RepairVeh": 1327}, {"crystal": 1566, "RepairVeh": 1526}, {
        "crystal": 1935,
        "RepairVeh": 1755
    }],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 320,
        "id": 34,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 120,
        "id": 35,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "MediumArmorAir",
        "damage": 0,
        "id": 36,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 150,
        "id": 37,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 150,
        "id": 38,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 0},
        "armorType": "LightArmorInfantry",
        "damage": 0,
        "id": 421,
        "type": 8,
        "health": 10
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 89,
    "speed": 90,
    "display": "Mammoth",
    "tech": 52,
    "name": "GDI_Mammoth",
    "faction": "GDI",
    "health": 2000,
    "movement": "Track",
    "resources": [{}, {"crystal": 6}, {"crystal": 12}, {"crystal": 30, "power": 12}, {
        "crystal": 54,
        "power": 14
    }, {"crystal": 360, "power": 90}, {"crystal": 2100, "power": 525}, {
        "crystal": 8100,
        "power": 2025
    }, {"crystal": 21300, "power": 5325}, {"crystal": 58800, "power": 14700}, {
        "crystal": 159000,
        "power": 39750
    }, {"crystal": 321000, "power": 80250}, {"crystal": 576000, "power": 144000}],
    "repair": [{}, {"crystal": 3, "RepairVeh": 565}, {"crystal": 6, "RepairVeh": 650}, {
        "crystal": 15,
        "RepairVeh": 748
    }, {"crystal": 27, "RepairVeh": 860}, {"crystal": 162, "RepairVeh": 989}, {
        "crystal": 945,
        "RepairVeh": 1138
    }, {"crystal": 2430, "RepairVeh": 1309}, {"crystal": 3195, "RepairVeh": 1505}, {
        "crystal": 3822,
        "RepairVeh": 1731
    }, {"crystal": 4770, "RepairVeh": 1990}, {"crystal": 5874, "RepairVeh": 2289}, {
        "crystal": 7258,
        "RepairVeh": 2633
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 150,
        "id": 39,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 280,
        "id": 40,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 0,
        "id": 41,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 180,
        "id": 42,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "StructureBase",
        "damage": 180,
        "id": 43,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 0}, "armorType": "Structure", "damage": 0, "id": 333, "type": 6, "health": 0}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 90,
    "speed": 60,
    "display": "Juggernaut",
    "tech": 54,
    "name": "GDI_Juggernaut",
    "faction": "GDI",
    "health": 1300,
    "movement": "Track",
    "resources": [{}, {"crystal": 5}, {"crystal": 9}, {"crystal": 23, "power": 9}, {
        "crystal": 41,
        "power": 10
    }, {"crystal": 270, "power": 68}, {"crystal": 1575, "power": 394}, {
        "crystal": 6075,
        "power": 1519
    }, {"crystal": 15975, "power": 3994}, {"crystal": 44100, "power": 11025}, {
        "crystal": 119250,
        "power": 29813
    }, {"crystal": 240750, "power": 60188}, {"crystal": 432000, "power": 108000}],
    "repair": [{}, {"crystal": 2, "RepairVeh": 565}, {"crystal": 5, "RepairVeh": 650}, {
        "crystal": 11,
        "RepairVeh": 748
    }, {"crystal": 20, "RepairVeh": 860}, {"crystal": 122, "RepairVeh": 989}, {
        "crystal": 709,
        "RepairVeh": 1138
    }, {"crystal": 1823, "RepairVeh": 1309}, {"crystal": 2396, "RepairVeh": 1505}, {
        "crystal": 2867,
        "RepairVeh": 1731
    }, {"crystal": 3578, "RepairVeh": 1990}, {"crystal": 4406, "RepairVeh": 2289}, {
        "crystal": 5443,
        "RepairVeh": 2633
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 50,
        "id": 44,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 100,
        "id": 45,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 500,
        "id": 47,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "StructureBase",
        "damage": 500,
        "id": 48,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 50,
        "id": 503,
        "type": 7,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 100,
        "id": 504,
        "type": 7,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 500,
        "id": 505,
        "type": 7,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "StructureBase",
        "damage": 500,
        "id": 506,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 91,
    "speed": 120,
    "display": "Orca",
    "tech": 76,
    "name": "GDI_Orca",
    "faction": "GDI",
    "health": 900,
    "movement": "Air",
    "resources": [{}, {"crystal": 2}, {"crystal": 4}, {"crystal": 11, "power": 4}, {
        "crystal": 20,
        "power": 5
    }, {"crystal": 132, "power": 33}, {"crystal": 770, "power": 193}, {"crystal": 2970, "power": 743}, {
        "crystal": 7810,
        "power": 1953
    }, {"crystal": 21560, "power": 5390}, {"crystal": 58300, "power": 14575}, {
        "crystal": 117700,
        "power": 29425
    }, {"crystal": 211200, "power": 52800}],
    "repair": [{}, {"crystal": 1, "RepairAir": 415}, {"crystal": 2, "RepairAir": 477}, {
        "crystal": 6,
        "RepairAir": 548
    }, {"crystal": 10, "RepairAir": 631}, {"crystal": 59, "RepairAir": 725}, {
        "crystal": 347,
        "RepairAir": 834
    }, {"crystal": 891, "RepairAir": 960}, {"crystal": 1172, "RepairAir": 1104}, {
        "crystal": 1401,
        "RepairAir": 1269
    }, {"crystal": 1749, "RepairAir": 1460}, {"crystal": 2154, "RepairAir": 1679}, {
        "crystal": 2661,
        "RepairAir": 1931
    }],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 360,
        "id": 49,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 180,
        "id": 50,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "MediumArmorAir",
        "damage": 0,
        "id": 51,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 120,
        "id": 52,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 120,
        "id": 53,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 0,
        "id": 326,
        "type": 3,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 92,
    "speed": 120,
    "display": "Paladin",
    "tech": 50,
    "name": "GDI_Paladin",
    "faction": "GDI",
    "health": 1050,
    "movement": "Air",
    "resources": [{}, {"crystal": 2}, {"crystal": 5}, {"crystal": 12, "power": 5}, {
        "crystal": 22,
        "power": 5
    }, {"crystal": 144, "power": 36}, {"crystal": 840, "power": 210}, {"crystal": 3240, "power": 810}, {
        "crystal": 8520,
        "power": 2130
    }, {"crystal": 23520, "power": 5880}, {"crystal": 63600, "power": 15900}, {
        "crystal": 128400,
        "power": 32100
    }, {"crystal": 230400, "power": 57600}],
    "repair": [{}, {"crystal": 1, "RepairAir": 415}, {"crystal": 2, "RepairAir": 477}, {
        "crystal": 6,
        "RepairAir": 548
    }, {"crystal": 11, "RepairAir": 631}, {"crystal": 65, "RepairAir": 725}, {
        "crystal": 378,
        "RepairAir": 834
    }, {"crystal": 972, "RepairAir": 960}, {"crystal": 1278, "RepairAir": 1104}, {
        "crystal": 1529,
        "RepairAir": 1269
    }, {"crystal": 1908, "RepairAir": 1460}, {"crystal": 2350, "RepairAir": 1679}, {
        "crystal": 2903,
        "RepairAir": 1931
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 40,
        "id": 54,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 200,
        "id": 55,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 120,
        "id": 57,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "StructureBase",
        "damage": 120,
        "id": 58,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 0},
        "armorType": "LightArmorInfantry",
        "damage": 0,
        "id": 467,
        "type": 8,
        "health": 5
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 93,
    "speed": 120,
    "display": "Kodiak",
    "tech": 55,
    "name": "GDI_Kodiak",
    "faction": "GDI",
    "health": 1800,
    "movement": "Air",
    "resources": [{}, {"crystal": 6}, {"crystal": 12}, {"crystal": 30, "power": 12}, {
        "crystal": 54,
        "power": 14
    }, {"crystal": 360, "power": 90}, {"crystal": 2100, "power": 525}, {
        "crystal": 8100,
        "power": 2025
    }, {"crystal": 21300, "power": 5325}, {"crystal": 58800, "power": 14700}, {
        "crystal": 159000,
        "power": 39750
    }, {"crystal": 321000, "power": 80250}, {"crystal": 576000, "power": 144000}],
    "repair": [{}, {"crystal": 3, "RepairAir": 622}, {"crystal": 6, "RepairAir": 715}, {
        "crystal": 15,
        "RepairAir": 823
    }, {"crystal": 27, "RepairAir": 946}, {"crystal": 162, "RepairAir": 1088}, {
        "crystal": 945,
        "RepairAir": 1252
    }, {"crystal": 2430, "RepairAir": 1439}, {"crystal": 3195, "RepairAir": 1655}, {
        "crystal": 3822,
        "RepairAir": 1904
    }, {"crystal": 4770, "RepairAir": 2189}, {"crystal": 5874, "RepairAir": 2518}, {
        "crystal": 7258,
        "RepairAir": 2896
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 100,
        "id": 59,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 150,
        "id": 60,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 0,
        "id": 61,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 400,
        "id": 62,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "StructureBase",
        "damage": 400,
        "id": 63,
        "type": 1,
        "health": 0
    }, {"range": {"min": 250, "max": 250}, "armorType": "NONE", "damage": 0, "id": 514, "type": 10, "health": 300}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 94,
    "speed": 240,
    "display": "Firehawk",
    "tech": 51,
    "name": "GDI_Firehawk",
    "faction": "GDI",
    "health": 550,
    "movement": "Air2",
    "resources": [{}, {"crystal": 3}, {"crystal": 6}, {"crystal": 14, "power": 6}, {
        "crystal": 25,
        "power": 6
    }, {"crystal": 168, "power": 42}, {"crystal": 980, "power": 245}, {"crystal": 3780, "power": 945}, {
        "crystal": 9940,
        "power": 2485
    }, {"crystal": 27440, "power": 6860}, {"crystal": 74200, "power": 18550}, {
        "crystal": 149800,
        "power": 37450
    }, {"crystal": 268800, "power": 67200}],
    "repair": [{}, {"crystal": 1, "RepairAir": 415}, {"crystal": 3, "RepairAir": 477}, {
        "crystal": 7,
        "RepairAir": 548
    }, {"crystal": 13, "RepairAir": 631}, {"crystal": 76, "RepairAir": 725}, {
        "crystal": 441,
        "RepairAir": 834
    }, {"crystal": 1134, "RepairAir": 960}, {"crystal": 1491, "RepairAir": 1104}, {
        "crystal": 1784,
        "RepairAir": 1269
    }, {"crystal": 2226, "RepairAir": 1460}, {"crystal": 2741, "RepairAir": 1679}, {
        "crystal": 3387,
        "RepairAir": 1931
    }],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 3000,
        "id": 67,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 3000,
        "id": 68,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 515, "type": 11, "health": 0}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 95,
    "speed": 40,
    "display": "Zone Trooper",
    "tech": 61,
    "name": "GDI_Def_Zone Trooper",
    "faction": "GDI",
    "health": 800,
    "movement": "Feet",
    "resources": [{}, {"crystal": 1}, {"crystal": 2}, {"crystal": 3, "power": 1}, {
        "crystal": 4,
        "power": 1
    }, {"crystal": 20, "power": 5}, {"crystal": 80, "power": 20}, {"crystal": 250, "power": 63}, {
        "crystal": 800,
        "power": 200
    }, {"crystal": 2100, "power": 525}, {"crystal": 6000, "power": 1500}, {
        "crystal": 15000,
        "power": 3750
    }, {"crystal": 32000, "power": 8000}],
    "repair": [{}, {"crystal": 1, "ResearchPoints": 30}, {"crystal": 1, "ResearchPoints": 65}, {
        "crystal": 2,
        "ResearchPoints": 115
    }, {"crystal": 2, "ResearchPoints": 160}, {"crystal": 9, "ResearchPoints": 260}, {
        "crystal": 36,
        "ResearchPoints": 440
    }, {"crystal": 75, "ResearchPoints": 650}, {"crystal": 120, "ResearchPoints": 850}, {
        "crystal": 137,
        "ResearchPoints": 1100
    }, {"crystal": 180, "ResearchPoints": 1425}, {"crystal": 275, "ResearchPoints": 1900}, {
        "crystal": 403,
        "ResearchPoints": 2100
    }],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 40,
        "id": 69,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 350,
        "id": 70,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "MediumArmorAir",
        "damage": 60,
        "id": 71,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 0,
        "id": 502,
        "type": 3,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 96,
    "speed": 40,
    "display": "Sniper Team",
    "tech": 59,
    "name": "GDI_Def_Sniper",
    "faction": "GDI",
    "health": 500,
    "movement": "Feet",
    "resources": [{}, {"crystal": 1}, {"crystal": 2}, {"crystal": 3, "power": 1}, {
        "crystal": 6,
        "power": 2
    }, {"crystal": 40, "power": 10}, {"crystal": 160, "power": 40}, {"crystal": 500, "power": 125}, {
        "crystal": 1600,
        "power": 400
    }, {"crystal": 4200, "power": 1050}, {"crystal": 12000, "power": 3000}, {
        "crystal": 30000,
        "power": 7500
    }, {"crystal": 64000, "power": 16000}],
    "repair": [{}, {"crystal": 1, "ResearchPoints": 60}, {"crystal": 1, "ResearchPoints": 130}, {
        "crystal": 2,
        "ResearchPoints": 230
    }, {"crystal": 3, "ResearchPoints": 320}, {"crystal": 18, "ResearchPoints": 520}, {
        "crystal": 72,
        "ResearchPoints": 880
    }, {"crystal": 150, "ResearchPoints": 1300}, {"crystal": 240, "ResearchPoints": 1700}, {
        "crystal": 273,
        "ResearchPoints": 2200
    }, {"crystal": 360, "ResearchPoints": 2850}, {"crystal": 549, "ResearchPoints": 3800}, {
        "crystal": 806,
        "ResearchPoints": 4200
    }],
    "weapons": [{
        "range": {"min": 0, "max": 350},
        "armorType": "LightArmorInfantry",
        "damage": 170,
        "id": 72,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 350},
        "armorType": "HeavyArmorVehicles",
        "damage": 30,
        "id": 73,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 350},
        "armorType": "MediumArmorAir",
        "damage": 25,
        "id": 74,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 350},
        "armorType": "LightArmorInfantry",
        "damage": 196,
        "id": 496,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 97,
    "speed": 40,
    "display": "Missile Squad",
    "tech": 65,
    "name": "GDI_Def_Missile Squad",
    "faction": "GDI",
    "health": 700,
    "movement": "Feet",
    "resources": [{}, {"crystal": 1}, {"crystal": 2}, {"crystal": 3}, {"crystal": 4, "power": 1}, {
        "crystal": 16,
        "power": 4
    }, {"crystal": 64, "power": 16}, {"crystal": 200, "power": 50}, {"crystal": 640, "power": 160}, {
        "crystal": 1680,
        "power": 420
    }, {"crystal": 4800, "power": 1200}, {"crystal": 12000, "power": 3000}, {"crystal": 25600, "power": 6400}],
    "repair": [{}, {"crystal": 1, "ResearchPoints": 30}, {"crystal": 1, "ResearchPoints": 65}, {
        "crystal": 2,
        "ResearchPoints": 115
    }, {"crystal": 2, "ResearchPoints": 160}, {"crystal": 7, "ResearchPoints": 260}, {
        "crystal": 29,
        "ResearchPoints": 440
    }, {"crystal": 60, "ResearchPoints": 650}, {"crystal": 96, "ResearchPoints": 850}, {
        "crystal": 109,
        "ResearchPoints": 1100
    }, {"crystal": 144, "ResearchPoints": 1425}, {"crystal": 220, "ResearchPoints": 1900}, {
        "crystal": 323,
        "ResearchPoints": 2100
    }],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 50,
        "id": 75,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 120,
        "id": 76,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "MediumArmorAir",
        "damage": 250,
        "id": 77,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "MediumArmorAir",
        "damage": 250,
        "id": 489,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 98,
    "speed": 60,
    "display": "Predator",
    "tech": 62,
    "name": "GDI_Def_Predator",
    "faction": "GDI",
    "health": 1000,
    "movement": "Track",
    "resources": [{}, {"crystal": 1}, {"crystal": 2}, {"crystal": 4, "power": 1}, {
        "crystal": 7,
        "power": 2
    }, {"crystal": 44, "power": 11}, {"crystal": 176, "power": 44}, {"crystal": 550, "power": 138}, {
        "crystal": 1760,
        "power": 440
    }, {"crystal": 4620, "power": 1155}, {"crystal": 13200, "power": 3300}, {
        "crystal": 33000,
        "power": 8250
    }, {"crystal": 70400, "power": 17600}],
    "repair": [{}, {"crystal": 1, "ResearchPoints": 60}, {"crystal": 1, "ResearchPoints": 130}, {
        "crystal": 2,
        "ResearchPoints": 230
    }, {"crystal": 3, "ResearchPoints": 320}, {"crystal": 20, "ResearchPoints": 520}, {
        "crystal": 79,
        "ResearchPoints": 880
    }, {"crystal": 165, "ResearchPoints": 1300}, {"crystal": 264, "ResearchPoints": 1700}, {
        "crystal": 300,
        "ResearchPoints": 2200
    }, {"crystal": 396, "ResearchPoints": 2850}, {"crystal": 604, "ResearchPoints": 3800}, {
        "crystal": 887,
        "ResearchPoints": 4200
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 60,
        "id": 78,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 230,
        "id": 79,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 0},
        "armorType": "MediumArmorAir",
        "damage": 100,
        "id": 80,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 275,
        "id": 473,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 99,
    "speed": 80,
    "display": "Guardian",
    "tech": 66,
    "name": "GDI_Def_APC Guardian",
    "faction": "GDI",
    "health": 1000,
    "movement": "Wheel",
    "resources": [{}, {"crystal": 1}, {"crystal": 2}, {"crystal": 3, "power": 1}, {
        "crystal": 5,
        "power": 1
    }, {"crystal": 32, "power": 8}, {"crystal": 128, "power": 32}, {"crystal": 400, "power": 100}, {
        "crystal": 1280,
        "power": 320
    }, {"crystal": 3360, "power": 840}, {"crystal": 9600, "power": 2400}, {
        "crystal": 24000,
        "power": 6000
    }, {"crystal": 51200, "power": 12800}],
    "repair": [{}, {"crystal": 1, "ResearchPoints": 60}, {"crystal": 1, "ResearchPoints": 130}, {
        "crystal": 2,
        "ResearchPoints": 230
    }, {"crystal": 2, "ResearchPoints": 320}, {"crystal": 14, "ResearchPoints": 520}, {
        "crystal": 58,
        "ResearchPoints": 880
    }, {"crystal": 120, "ResearchPoints": 1300}, {"crystal": 192, "ResearchPoints": 1700}, {
        "crystal": 218,
        "ResearchPoints": 2200
    }, {"crystal": 288, "ResearchPoints": 2850}, {"crystal": 439, "ResearchPoints": 3800}, {
        "crystal": 645,
        "ResearchPoints": 4200
    }],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 320,
        "id": 81,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 120,
        "id": 82,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "MediumArmorAir",
        "damage": 80,
        "id": 83,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 0,
        "id": 84,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 0,
        "id": 85,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 0},
        "armorType": "LightArmorInfantry",
        "damage": 0,
        "id": 422,
        "type": 8,
        "health": 10
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 100,
    "speed": 80,
    "display": "Pitbull",
    "tech": 60,
    "name": "GDI_Def_Pitbull",
    "faction": "GDI",
    "health": 800,
    "movement": "Wheel",
    "resources": [{}, {"crystal": 1}, {"crystal": 3}, {"crystal": 5, "power": 1}, {
        "crystal": 8,
        "power": 2
    }, {"crystal": 56, "power": 14}, {"crystal": 224, "power": 56}, {"crystal": 700, "power": 175}, {
        "crystal": 2240,
        "power": 560
    }, {"crystal": 5880, "power": 1470}, {"crystal": 16800, "power": 4200}, {
        "crystal": 42000,
        "power": 10500
    }, {"crystal": 89600, "power": 22400}],
    "repair": [{}, {"crystal": 1, "ResearchPoints": 60}, {"crystal": 1, "ResearchPoints": 130}, {
        "crystal": 2,
        "ResearchPoints": 230
    }, {"crystal": 4, "ResearchPoints": 320}, {"crystal": 25, "ResearchPoints": 520}, {
        "crystal": 101,
        "ResearchPoints": 880
    }, {"crystal": 210, "ResearchPoints": 1300}, {"crystal": 336, "ResearchPoints": 1700}, {
        "crystal": 382,
        "ResearchPoints": 2200
    }, {"crystal": 504, "ResearchPoints": 2850}, {"crystal": 769, "ResearchPoints": 3800}, {
        "crystal": 1129,
        "ResearchPoints": 4200
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 70,
        "id": 86,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 120,
        "id": 87,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 250,
        "id": 88,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 0,
        "id": 330,
        "type": 3,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 101,
    "speed": 0,
    "display": "Guardian Cannon",
    "tech": 68,
    "name": "GDI_Cannon",
    "faction": "GDI",
    "health": 1250,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 2}, {"tiberium": 3}, {"tiberium": 5, "power": 2}, {
        "tiberium": 9,
        "power": 2
    }, {"tiberium": 60, "power": 15}, {"tiberium": 240, "power": 60}, {
        "tiberium": 750,
        "power": 188
    }, {"tiberium": 2400, "power": 600}, {"tiberium": 6300, "power": 1575}, {
        "tiberium": 18000,
        "power": 4500
    }, {"tiberium": 45000, "power": 11250}, {"tiberium": 96000, "power": 24000}],
    "repair": [{}, {"tiberium": 1, "ResearchPoints": 90}, {"tiberium": 2, "ResearchPoints": 195}, {
        "tiberium": 4,
        "ResearchPoints": 345
    }, {"tiberium": 7, "ResearchPoints": 480}, {"tiberium": 41, "ResearchPoints": 780}, {
        "tiberium": 162,
        "ResearchPoints": 1320
    }, {"tiberium": 338, "ResearchPoints": 1950}, {"tiberium": 540, "ResearchPoints": 2550}, {
        "tiberium": 614,
        "ResearchPoints": 3300
    }, {"tiberium": 810, "ResearchPoints": 4275}, {"tiberium": 1235, "ResearchPoints": 5700}, {
        "tiberium": 1814,
        "ResearchPoints": 6300
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 100,
        "id": 89,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 350,
        "id": 90,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 0},
        "armorType": "LightArmorInfantry",
        "damage": 0,
        "id": 469,
        "type": 8,
        "health": 10
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 102,
    "speed": 0,
    "display": "MG Nest",
    "tech": 135,
    "name": "GDI_Turret",
    "faction": "GDI",
    "health": 1000,
    "movement": "Structure",
    "resources": [{}, {"crystal": 1}, {"crystal": 2}, {"crystal": 3, "power": 1}, {
        "crystal": 6,
        "power": 2
    }, {"crystal": 40, "power": 10}, {"crystal": 160, "power": 40}, {"crystal": 500, "power": 125}, {
        "crystal": 1600,
        "power": 400
    }, {"crystal": 4200, "power": 1050}, {"crystal": 12000, "power": 3000}, {
        "crystal": 30000,
        "power": 7500
    }, {"crystal": 64000, "power": 16000}],
    "repair": [{}, {"crystal": 1, "ResearchPoints": 60}, {"crystal": 1, "ResearchPoints": 130}, {
        "crystal": 2,
        "ResearchPoints": 230
    }, {"crystal": 3, "ResearchPoints": 320}, {"crystal": 18, "ResearchPoints": 520}, {
        "crystal": 72,
        "ResearchPoints": 880
    }, {"crystal": 150, "ResearchPoints": 1300}, {"crystal": 240, "ResearchPoints": 1700}, {
        "crystal": 273,
        "ResearchPoints": 2200
    }, {"crystal": 360, "ResearchPoints": 2850}, {"crystal": 549, "ResearchPoints": 3800}, {
        "crystal": 806,
        "ResearchPoints": 4200
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 200,
        "id": 94,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 70,
        "id": 95,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 80,
        "id": 96,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 220,
        "id": 512,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 103,
    "speed": 0,
    "display": "Flak",
    "tech": 67,
    "name": "GDI_Flak",
    "faction": "GDI",
    "health": 1000,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 1}, {"tiberium": 2}, {"tiberium": 3, "power": 1}, {
        "tiberium": 6,
        "power": 2
    }, {"tiberium": 40, "power": 10}, {"tiberium": 160, "power": 40}, {
        "tiberium": 500,
        "power": 125
    }, {"tiberium": 1600, "power": 400}, {"tiberium": 4200, "power": 1050}, {
        "tiberium": 12000,
        "power": 3000
    }, {"tiberium": 30000, "power": 7500}, {"tiberium": 64000, "power": 16000}],
    "repair": [{}, {"tiberium": 1, "ResearchPoints": 60}, {"tiberium": 2, "ResearchPoints": 130}, {
        "tiberium": 3,
        "ResearchPoints": 230
    }, {"tiberium": 5, "ResearchPoints": 320}, {"tiberium": 27, "ResearchPoints": 520}, {
        "tiberium": 108,
        "ResearchPoints": 880
    }, {"tiberium": 225, "ResearchPoints": 1300}, {"tiberium": 360, "ResearchPoints": 1700}, {
        "tiberium": 410,
        "ResearchPoints": 2200
    }, {"tiberium": 540, "ResearchPoints": 2850}, {"tiberium": 824, "ResearchPoints": 3800}, {
        "tiberium": 1210,
        "ResearchPoints": 4200
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 400,
        "id": 99,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 460,
        "id": 507,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 104,
    "speed": 0,
    "display": "Barbwire",
    "tech": 63,
    "name": "GDI_Barbwire",
    "faction": "GDI",
    "health": 1000,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 1}, {"tiberium": 2}, {"tiberium": 3}, {"tiberium": 4}, {
        "tiberium": 11,
        "power": 3
    }, {"tiberium": 43, "power": 11}, {"tiberium": 135, "power": 34}, {
        "tiberium": 432,
        "power": 108
    }, {"tiberium": 1134, "power": 284}, {"tiberium": 3240, "power": 810}, {
        "tiberium": 8100,
        "power": 2025
    }, {"tiberium": 17280, "power": 4320}],
    "repair": [{}, {"tiberium": 1, "ResearchPoints": 18}, {"tiberium": 1, "ResearchPoints": 39}, {
        "tiberium": 2,
        "ResearchPoints": 69
    }, {"tiberium": 2, "ResearchPoints": 96}, {"tiberium": 5, "ResearchPoints": 156}, {
        "tiberium": 19,
        "ResearchPoints": 264
    }, {"tiberium": 41, "ResearchPoints": 390}, {"tiberium": 65, "ResearchPoints": 510}, {
        "tiberium": 74,
        "ResearchPoints": 660
    }, {"tiberium": 97, "ResearchPoints": 855}, {"tiberium": 148, "ResearchPoints": 1140}, {
        "tiberium": 218,
        "ResearchPoints": 1260
    }],
    "weapons": [{"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 518, "type": 12, "health": 0}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 105,
    "speed": 0,
    "display": "Anti-tank barrier",
    "tech": 64,
    "name": "GDI_Antitank Barrier",
    "faction": "GDI",
    "health": 1500,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 1}, {"tiberium": 2}, {"tiberium": 3}, {"tiberium": 4}, {
        "tiberium": 11,
        "power": 3
    }, {"tiberium": 43, "power": 11}, {"tiberium": 135, "power": 34}, {
        "tiberium": 648,
        "power": 108
    }, {"tiberium": 1134, "power": 284}, {"tiberium": 3240, "power": 810}, {
        "tiberium": 9000,
        "power": 2025
    }, {"tiberium": 19200, "power": 4320}],
    "repair": [{}, {"tiberium": 1, "ResearchPoints": 18}, {"tiberium": 1, "ResearchPoints": 39}, {
        "tiberium": 2,
        "ResearchPoints": 69
    }, {"tiberium": 2, "ResearchPoints": 96}, {"tiberium": 7, "ResearchPoints": 156}, {
        "tiberium": 29,
        "ResearchPoints": 264
    }, {"tiberium": 61, "ResearchPoints": 390}, {"tiberium": 97, "ResearchPoints": 510}, {
        "tiberium": 111,
        "ResearchPoints": 660
    }, {"tiberium": 146, "ResearchPoints": 855}, {"tiberium": 222, "ResearchPoints": 1140}, {
        "tiberium": 327,
        "ResearchPoints": 1260
    }],
    "weapons": [{"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 519, "type": 12, "health": 0}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 106,
    "speed": 0,
    "display": "Wall",
    "tech": -1,
    "name": "GDI_Wall",
    "faction": "GDI",
    "health": 2000,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 1}, {"tiberium": 2}, {"tiberium": 3}, {"tiberium": 4}, {
        "tiberium": 12,
        "power": 3
    }, {"tiberium": 48, "power": 12}, {"tiberium": 150, "power": 38}, {
        "tiberium": 480,
        "power": 120
    }, {"tiberium": 1260, "power": 315}, {"tiberium": 3600, "power": 900}, {
        "tiberium": 9000,
        "power": 2250
    }, {"tiberium": 19200, "power": 4800}],
    "repair": [{}, {"tiberium": 1, "ResearchPoints": 18}, {"tiberium": 1, "ResearchPoints": 39}, {
        "tiberium": 2,
        "ResearchPoints": 69
    }, {"tiberium": 2, "ResearchPoints": 96}, {"tiberium": 8, "ResearchPoints": 156}, {
        "tiberium": 32,
        "ResearchPoints": 264
    }, {"tiberium": 68, "ResearchPoints": 390}, {"tiberium": 108, "ResearchPoints": 510}, {
        "tiberium": 123,
        "ResearchPoints": 660
    }, {"tiberium": 162, "ResearchPoints": 855}, {"tiberium": 247, "ResearchPoints": 1140}, {
        "tiberium": 363,
        "ResearchPoints": 1260
    }]
}, {
    "id": 107,
    "speed": 0,
    "display": "Accumulator",
    "tech": 16,
    "name": "GDI_Accumulator",
    "faction": "GDI",
    "health": 1000,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 1}, {"tiberium": 2}, {"tiberium": 3, "power": 1}, {
        "tiberium": 4,
        "power": 1
    }, {"tiberium": 20, "power": 5}, {"tiberium": 110, "power": 28}, {"tiberium": 360, "power": 90}, {
        "tiberium": 1100,
        "power": 275
    }, {"tiberium": 3200, "power": 800}, {"tiberium": 8800, "power": 2200}, {
        "tiberium": 22400,
        "power": 5600
    }, {"tiberium": 48000, "power": 12000}],
    "repair": [{}, {"tiberium": 1, "RepairBase": 15}, {"tiberium": 1, "RepairBase": 19}, {
        "tiberium": 2,
        "RepairBase": 23
    }, {"tiberium": 2, "RepairBase": 29}, {"tiberium": 9, "RepairBase": 36}, {
        "tiberium": 50,
        "RepairBase": 45
    }, {"tiberium": 108, "RepairBase": 55}, {"tiberium": 165, "RepairBase": 68}, {
        "tiberium": 208,
        "RepairBase": 85
    }, {"tiberium": 264, "RepairBase": 104}, {"tiberium": 410, "RepairBase": 129}, {
        "tiberium": 605,
        "RepairBase": 160
    }],
    "modifiers": [{}, {"PowerStorage": 15}, {"PowerStorage": 40}, {"PowerStorage": 80}, {"PowerStorage": 270}, {"PowerStorage": 1500}, {"PowerStorage": 5500}, {"PowerStorage": 13000}, {"PowerStorage": 35000}, {"PowerStorage": 65000}, {"PowerStorage": 105000}, {"PowerStorage": 150000}, {"PowerStorage": 200000}]
}, {
    "id": 108,
    "speed": 0,
    "display": "Airfield",
    "tech": 36,
    "name": "GDI_Airport",
    "faction": "GDI",
    "health": 2500,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 3}, {"tiberium": 5}, {"tiberium": 6, "power": 2}, {
        "tiberium": 12,
        "power": 3
    }, {"tiberium": 55, "power": 14}, {"tiberium": 330, "power": 83}, {
        "tiberium": 1080,
        "power": 270
    }, {"tiberium": 3300, "power": 825}, {"tiberium": 9600, "power": 2400}, {
        "tiberium": 26400,
        "power": 6600
    }, {"tiberium": 67200, "power": 16800}, {"tiberium": 144000, "power": 36000}],
    "repair": [{}, {"tiberium": 2, "RepairBase": 31}, {"tiberium": 3, "RepairBase": 38}, {
        "tiberium": 3,
        "RepairBase": 47
    }, {"tiberium": 6, "RepairBase": 59}, {"tiberium": 25, "RepairBase": 73}, {
        "tiberium": 149,
        "RepairBase": 90
    }, {"tiberium": 324, "RepairBase": 111}, {"tiberium": 495, "RepairBase": 137}, {
        "tiberium": 624,
        "RepairBase": 170
    }, {"tiberium": 792, "RepairBase": 209}, {"tiberium": 1230, "RepairBase": 259}, {
        "tiberium": 1814,
        "RepairBase": 320
    }],
    "modifiers": [{}, {"RepairEfficiencyAir": 38.75}, {"RepairEfficiencyAir": 42.24}, {"RepairEfficiencyAir": 46.04}, {"RepairEfficiencyAir": 50.19}, {"RepairEfficiencyAir": 54.7}, {"RepairEfficiencyAir": 59.63}, {"RepairEfficiencyAir": 64.99}, {"RepairEfficiencyAir": 70.84}, {"RepairEfficiencyAir": 77.22}, {"RepairEfficiencyAir": 84.17}, {"RepairEfficiencyAir": 91.74}, {"RepairEfficiencyAir": 100}]
}, {
    "id": 109,
    "speed": 0,
    "display": "GDI_Alliance Post",
    "tech": 21,
    "name": "GDI_Alliance Post",
    "faction": "GDI",
    "health": 2500,
    "movement": "Structure",
    "resources": [{}],
    "repair": [{}],
    "modifiers": [{}, {}, {}, {}, {}, {}, {}, {}, {}]
}, {
    "id": 110,
    "speed": 0,
    "display": "Barracks",
    "tech": 34,
    "name": "GDI_Barracks",
    "faction": "GDI",
    "health": 2500,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 3}, {"tiberium": 5}, {"tiberium": 6, "power": 2}, {
        "tiberium": 12,
        "power": 3
    }, {"tiberium": 55, "power": 14}, {"tiberium": 330, "power": 83}, {
        "tiberium": 1080,
        "power": 270
    }, {"tiberium": 3300, "power": 825}, {"tiberium": 9600, "power": 2400}, {
        "tiberium": 26400,
        "power": 6600
    }, {"tiberium": 67200, "power": 16800}, {"tiberium": 144000, "power": 36000}],
    "repair": [{}, {"tiberium": 2, "RepairBase": 31}, {"tiberium": 3, "RepairBase": 38}, {
        "tiberium": 3,
        "RepairBase": 47
    }, {"tiberium": 6, "RepairBase": 59}, {"tiberium": 25, "RepairBase": 73}, {
        "tiberium": 149,
        "RepairBase": 90
    }, {"tiberium": 324, "RepairBase": 111}, {"tiberium": 495, "RepairBase": 137}, {
        "tiberium": 624,
        "RepairBase": 170
    }, {"tiberium": 792, "RepairBase": 209}, {"tiberium": 1230, "RepairBase": 259}, {
        "tiberium": 1814,
        "RepairBase": 320
    }],
    "modifiers": [{}, {"RepairEfficiencyInf": 38.75}, {"RepairEfficiencyInf": 42.24}, {"RepairEfficiencyInf": 46.04}, {"RepairEfficiencyInf": 50.19}, {"RepairEfficiencyInf": 54.7}, {"RepairEfficiencyInf": 59.63}, {"RepairEfficiencyInf": 64.99}, {"RepairEfficiencyInf": 70.84}, {"RepairEfficiencyInf": 77.22}, {"RepairEfficiencyInf": 84.17}, {"RepairEfficiencyInf": 91.74}, {"RepairEfficiencyInf": 100}]
}, {
    "id": 111,
    "speed": 0,
    "display": "Command Center",
    "tech": 24,
    "name": "GDI_Command Center",
    "faction": "GDI",
    "health": 3000,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 5}, {"tiberium": 8}, {"tiberium": 10, "power": 2}, {
        "tiberium": 20,
        "power": 4
    }, {"tiberium": 80, "power": 20}, {"tiberium": 440, "power": 110}, {
        "tiberium": 1440,
        "power": 360
    }, {"tiberium": 4400, "power": 1100}, {"tiberium": 12800, "power": 3200}, {
        "tiberium": 35200,
        "power": 8800
    }, {"tiberium": 89600, "power": 22400}, {"tiberium": 192000, "power": 48000}],
    "repair": [{}, {"tiberium": 3, "RepairBase": 31}, {"tiberium": 4, "RepairBase": 38}, {
        "tiberium": 5,
        "RepairBase": 47
    }, {"tiberium": 10, "RepairBase": 59}, {"tiberium": 36, "RepairBase": 73}, {
        "tiberium": 198,
        "RepairBase": 90
    }, {"tiberium": 432, "RepairBase": 111}, {"tiberium": 660, "RepairBase": 137}, {
        "tiberium": 832,
        "RepairBase": 170
    }, {"tiberium": 1056, "RepairBase": 209}, {"tiberium": 1640, "RepairBase": 259}, {
        "tiberium": 2419,
        "RepairBase": 320
    }],
    "modifiers": [{}, {"HeadCountArmy": 10}, {"HeadCountArmy": 15}, {"HeadCountArmy": 20}, {"HeadCountArmy": 25}, {"HeadCountArmy": 30}, {"HeadCountArmy": 35}, {"HeadCountArmy": 40}, {"HeadCountArmy": 45}, {"HeadCountArmy": 50}, {"HeadCountArmy": 60}, {"HeadCountArmy": 70}, {"HeadCountArmy": 80}]
}, {
    "id": 112,
    "speed": 0,
    "display": "Construction Yard",
    "tech": 1,
    "name": "GDI_Construction Yard",
    "faction": "GDI",
    "health": 5500,
    "movement": "Structure",
    "resources": [{}, {}, {"tiberium": 10}, {"tiberium": 15}, {"tiberium": 30, "power": 3}, {
        "tiberium": 60,
        "power": 15
    }, {"tiberium": 440, "power": 110}, {"tiberium": 1440, "power": 360}, {
        "tiberium": 4400,
        "power": 1100
    }, {"tiberium": 12800, "power": 3200}, {"tiberium": 35200, "power": 8800}, {
        "tiberium": 89600,
        "power": 22400
    }, {"tiberium": 192000, "power": 48000}],
    "repair": [{}, {"RepairBase": 31}, {"tiberium": 5, "RepairBase": 38}, {
        "tiberium": 8,
        "RepairBase": 47
    }, {"tiberium": 15, "RepairBase": 59}, {"tiberium": 27, "RepairBase": 73}, {
        "tiberium": 198,
        "RepairBase": 90
    }, {"tiberium": 432, "RepairBase": 111}, {"tiberium": 660, "RepairBase": 137}, {
        "tiberium": 832,
        "RepairBase": 170
    }, {"tiberium": 1056, "RepairBase": 209}, {"tiberium": 1640, "RepairBase": 259}, {
        "tiberium": 2419,
        "RepairBase": 320
    }],
    "modifiers": [{}, {
        "TiberiumStorage": 50,
        "CrystalStorage": 50,
        "BuildingSlots": 4,
        "PowerStorage": 40,
        "RepairEfficiencyBase": 35.05
    }, {
        "TiberiumStorage": 360,
        "CrystalStorage": 360,
        "BuildingSlots": 8,
        "PowerStorage": 260,
        "RepairEfficiencyBase": 38.55
    }, {
        "TiberiumStorage": 1450,
        "CrystalStorage": 1450,
        "BuildingSlots": 14,
        "PowerStorage": 1150,
        "RepairEfficiencyBase": 42.41
    }, {
        "TiberiumStorage": 2650,
        "CrystalStorage": 2650,
        "BuildingSlots": 17,
        "PowerStorage": 2500,
        "RepairEfficiencyBase": 46.65
    }, {
        "TiberiumStorage": 6000,
        "CrystalStorage": 6000,
        "BuildingSlots": 18,
        "PowerStorage": 8000,
        "RepairEfficiencyBase": 51.32
    }, {
        "TiberiumStorage": 14400,
        "CrystalStorage": 14400,
        "BuildingSlots": 19,
        "PowerStorage": 19000,
        "RepairEfficiencyBase": 56.45
    }, {
        "TiberiumStorage": 22800,
        "CrystalStorage": 22800,
        "BuildingSlots": 21,
        "PowerStorage": 33000,
        "RepairEfficiencyBase": 62.09
    }, {
        "TiberiumStorage": 33000,
        "CrystalStorage": 33000,
        "BuildingSlots": 23,
        "PowerStorage": 45000,
        "RepairEfficiencyBase": 68.3
    }, {
        "TiberiumStorage": 50000,
        "CrystalStorage": 50000,
        "BuildingSlots": 24,
        "PowerStorage": 65000,
        "RepairEfficiencyBase": 75.13
    }, {
        "TiberiumStorage": 70000,
        "CrystalStorage": 70000,
        "BuildingSlots": 25,
        "PowerStorage": 105000,
        "RepairEfficiencyBase": 82.64
    }, {
        "TiberiumStorage": 95000,
        "CrystalStorage": 95000,
        "BuildingSlots": 26,
        "PowerStorage": 150000,
        "RepairEfficiencyBase": 90.91
    }, {
        "TiberiumStorage": 120000,
        "CrystalStorage": 120000,
        "BuildingSlots": 27,
        "PowerStorage": 200000,
        "RepairEfficiencyBase": 100
    }]
}, {
    "id": 113,
    "speed": 0,
    "display": "GDI_EMP",
    "tech": 22,
    "name": "GDI_EMP",
    "faction": "GDI",
    "health": 1000,
    "movement": "Structure",
    "resources": [{}],
    "repair": [{}],
    "modifiers": [{}, {}, {}, {}, {}, {}, {}, {}, {}]
}, {
    "id": 114,
    "speed": 0,
    "display": "Factory",
    "tech": 35,
    "name": "GDI_Factory",
    "faction": "GDI",
    "health": 2500,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 3}, {"tiberium": 5}, {"tiberium": 6, "power": 2}, {
        "tiberium": 12,
        "power": 3
    }, {"tiberium": 55, "power": 14}, {"tiberium": 330, "power": 83}, {
        "tiberium": 1080,
        "power": 270
    }, {"tiberium": 3300, "power": 825}, {"tiberium": 9600, "power": 2400}, {
        "tiberium": 26400,
        "power": 6600
    }, {"tiberium": 67200, "power": 16800}, {"tiberium": 144000, "power": 36000}],
    "repair": [{}, {"tiberium": 2, "RepairBase": 31}, {"tiberium": 3, "RepairBase": 38}, {
        "tiberium": 3,
        "RepairBase": 47
    }, {"tiberium": 6, "RepairBase": 59}, {"tiberium": 25, "RepairBase": 73}, {
        "tiberium": 149,
        "RepairBase": 90
    }, {"tiberium": 324, "RepairBase": 111}, {"tiberium": 495, "RepairBase": 137}, {
        "tiberium": 624,
        "RepairBase": 170
    }, {"tiberium": 792, "RepairBase": 209}, {"tiberium": 1230, "RepairBase": 259}, {
        "tiberium": 1814,
        "RepairBase": 320
    }],
    "modifiers": [{}, {"RepairEfficiencyVech": 38.75}, {"RepairEfficiencyVech": 42.24}, {"RepairEfficiencyVech": 46.04}, {"RepairEfficiencyVech": 50.19}, {"RepairEfficiencyVech": 54.7}, {"RepairEfficiencyVech": 59.63}, {"RepairEfficiencyVech": 64.99}, {"RepairEfficiencyVech": 70.84}, {"RepairEfficiencyVech": 77.22}, {"RepairEfficiencyVech": 84.17}, {"RepairEfficiencyVech": 91.74}, {"RepairEfficiencyVech": 100}]
}, {
    "id": 115,
    "speed": 0,
    "display": "Harvester",
    "tech": 32,
    "name": "GDI_Harvester",
    "faction": "GDI",
    "health": 1500,
    "movement": "Structure",
    "resources": [{}, {}, {"tiberium": 3}, {"tiberium": 4, "power": 1}, {"tiberium": 6, "power": 3}, {
        "tiberium": 15,
        "power": 12
    }, {"tiberium": 110, "power": 72}, {"tiberium": 360, "power": 234}, {
        "tiberium": 1100,
        "power": 715
    }, {"tiberium": 3200, "power": 2080}, {"tiberium": 8800, "power": 5720}, {
        "tiberium": 22400,
        "power": 14560
    }, {"tiberium": 48000, "power": 36000}],
    "repair": [{}, {"RepairBase": 23}, {"tiberium": 2, "RepairBase": 29}, {
        "tiberium": 2,
        "RepairBase": 35
    }, {"tiberium": 3, "RepairBase": 44}, {"tiberium": 12, "RepairBase": 54}, {
        "tiberium": 74,
        "RepairBase": 67
    }, {"tiberium": 162, "RepairBase": 83}, {"tiberium": 248, "RepairBase": 103}, {
        "tiberium": 312,
        "RepairBase": 127
    }, {"tiberium": 396, "RepairBase": 157}, {"tiberium": 615, "RepairBase": 194}, {
        "tiberium": 907,
        "RepairBase": 240
    }],
    "modifiers": [{}, {
        "TiberiumPackage": 4,
        "CrystalPackage": 4,
        "TiberiumContinous": 60,
        "CrystalContinous": 60
    }, {
        "TiberiumPackage": 10,
        "CrystalPackage": 10,
        "TiberiumContinous": 120,
        "CrystalContinous": 120
    }, {
        "TiberiumPackage": 24,
        "CrystalPackage": 24,
        "TiberiumContinous": 200,
        "CrystalContinous": 200
    }, {
        "TiberiumPackage": 95,
        "CrystalPackage": 95,
        "TiberiumContinous": 600,
        "CrystalContinous": 600
    }, {
        "TiberiumPackage": 245,
        "CrystalPackage": 245,
        "TiberiumContinous": 1200,
        "CrystalContinous": 1200
    }, {
        "TiberiumPackage": 460,
        "CrystalPackage": 460,
        "TiberiumContinous": 1800,
        "CrystalContinous": 1800
    }, {
        "TiberiumPackage": 1120,
        "CrystalPackage": 1120,
        "TiberiumContinous": 3600,
        "CrystalContinous": 3600
    }, {
        "TiberiumPackage": 2660,
        "CrystalPackage": 2660,
        "TiberiumContinous": 7200,
        "CrystalContinous": 7200
    }, {
        "TiberiumPackage": 3900,
        "CrystalPackage": 3900,
        "TiberiumContinous": 9000,
        "CrystalContinous": 9000
    }, {
        "TiberiumPackage": 5400,
        "CrystalPackage": 5400,
        "TiberiumContinous": 10800,
        "CrystalContinous": 10800
    }, {
        "TiberiumPackage": 8200,
        "CrystalPackage": 8200,
        "TiberiumContinous": 14400,
        "CrystalContinous": 14400
    }, {"TiberiumPackage": 14160, "CrystalPackage": 14160, "TiberiumContinous": 21600, "CrystalContinous": 21600}]
}, {
    "id": 116,
    "speed": 0,
    "display": "GDI_Ion Cannon",
    "tech": 23,
    "name": "GDI_Ion Cannon",
    "faction": "GDI",
    "health": 1000,
    "movement": "Structure",
    "resources": [{}],
    "repair": [{}],
    "modifiers": [{}, {}, {}, {}, {}, {}, {}, {}, {}]
}, {
    "id": 117,
    "speed": 0,
    "display": "Power Plant",
    "tech": 10,
    "name": "GDI_Power Plant",
    "faction": "GDI",
    "health": 2000,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 2}, {"tiberium": 3}, {"tiberium": 5}, {"tiberium": 10, "power": 1}, {
        "tiberium": 46,
        "power": 5
    }, {"tiberium": 286, "power": 28}, {"tiberium": 936, "power": 90}, {
        "tiberium": 2860,
        "power": 275
    }, {"tiberium": 8320, "power": 800}, {"tiberium": 22880, "power": 2200}, {
        "tiberium": 58240,
        "power": 5600
    }, {"tiberium": 124800, "power": 12000}],
    "repair": [{}, {"tiberium": 1, "RepairBase": 23}, {"tiberium": 2, "RepairBase": 29}, {
        "tiberium": 3,
        "RepairBase": 35
    }, {"tiberium": 5, "RepairBase": 44}, {"tiberium": 20, "RepairBase": 54}, {
        "tiberium": 129,
        "RepairBase": 67
    }, {"tiberium": 281, "RepairBase": 83}, {"tiberium": 429, "RepairBase": 103}, {
        "tiberium": 541,
        "RepairBase": 127
    }, {"tiberium": 686, "RepairBase": 157}, {"tiberium": 1066, "RepairBase": 194}, {
        "tiberium": 1572,
        "RepairBase": 240
    }],
    "modifiers": [{}, {"PowerPackage": 2, "PowerContinous": 60}, {
        "PowerPackage": 5,
        "PowerContinous": 120
    }, {"PowerPackage": 11, "PowerContinous": 200}, {"PowerPackage": 45, "PowerContinous": 600}, {
        "PowerPackage": 120,
        "PowerContinous": 1200
    }, {"PowerPackage": 230, "PowerContinous": 1800}, {
        "PowerPackage": 560,
        "PowerContinous": 3600
    }, {"PowerPackage": 1320, "PowerContinous": 7200}, {
        "PowerPackage": 1950,
        "PowerContinous": 9000
    }, {"PowerPackage": 2700, "PowerContinous": 10800}, {
        "PowerPackage": 4100,
        "PowerContinous": 14400
    }, {"PowerPackage": 7000, "PowerContinous": 21600}]
}, {
    "id": 118,
    "speed": 0,
    "display": "GDI_Recruitment Hub",
    "tech": 20,
    "name": "GDI_Recruitment Hub",
    "faction": "GDI",
    "health": 3000,
    "movement": "Structure",
    "resources": [{}],
    "repair": [{}],
    "modifiers": [{}, {"HeadCountArmy": 20}, {"HeadCountArmy": 40}, {"HeadCountArmy": 80}, {"HeadCountArmy": 160}, {"HeadCountArmy": 320}, {"HeadCountArmy": 640}, {"HeadCountArmy": 1280}, {"HeadCountArmy": 2560}]
}, {
    "id": 119,
    "speed": 0,
    "display": "Refinery",
    "tech": 2,
    "name": "GDI_Refinery",
    "faction": "GDI",
    "health": 2000,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 2}, {"tiberium": 3}, {"tiberium": 4, "power": 1}, {
        "tiberium": 8,
        "power": 2
    }, {"tiberium": 35, "power": 9}, {"tiberium": 220, "power": 55}, {"tiberium": 720, "power": 180}, {
        "tiberium": 2200,
        "power": 550
    }, {"tiberium": 6400, "power": 1600}, {"tiberium": 17600, "power": 4400}, {
        "tiberium": 44800,
        "power": 11200
    }, {"tiberium": 96000, "power": 24000}],
    "repair": [{}, {"tiberium": 1, "RepairBase": 23}, {"tiberium": 2, "RepairBase": 29}, {
        "tiberium": 2,
        "RepairBase": 35
    }, {"tiberium": 4, "RepairBase": 44}, {"tiberium": 16, "RepairBase": 54}, {
        "tiberium": 99,
        "RepairBase": 67
    }, {"tiberium": 216, "RepairBase": 83}, {"tiberium": 330, "RepairBase": 103}, {
        "tiberium": 416,
        "RepairBase": 127
    }, {"tiberium": 528, "RepairBase": 157}, {"tiberium": 820, "RepairBase": 194}, {
        "tiberium": 1210,
        "RepairBase": 240
    }],
    "modifiers": [{}, {"CreditPackage": 2, "CreditContinous": 60}, {
        "CreditPackage": 5,
        "CreditContinous": 120
    }, {"CreditPackage": 10, "CreditContinous": 200}, {
        "CreditPackage": 40,
        "CreditContinous": 600
    }, {"CreditPackage": 105, "CreditContinous": 1200}, {
        "CreditPackage": 200,
        "CreditContinous": 1800
    }, {"CreditPackage": 485, "CreditContinous": 3600}, {
        "CreditPackage": 1150,
        "CreditContinous": 7200
    }, {"CreditPackage": 1700, "CreditContinous": 9000}, {
        "CreditPackage": 2370,
        "CreditContinous": 10800
    }, {"CreditPackage": 3700, "CreditContinous": 14400}, {"CreditPackage": 6480, "CreditContinous": 21600}]
}, {
    "id": 120,
    "speed": 0,
    "display": "Silo",
    "tech": 5,
    "name": "GDI_Silo",
    "faction": "GDI",
    "health": 1000,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 1}, {"tiberium": 2}, {"tiberium": 3, "power": 1}, {
        "tiberium": 4,
        "power": 1
    }, {"tiberium": 20, "power": 5}, {"tiberium": 110, "power": 28}, {"tiberium": 360, "power": 90}, {
        "tiberium": 1100,
        "power": 275
    }, {"tiberium": 3200, "power": 800}, {"tiberium": 8800, "power": 2200}, {
        "tiberium": 22400,
        "power": 5600
    }, {"tiberium": 48000, "power": 12000}],
    "repair": [{}, {"tiberium": 1, "RepairBase": 15}, {"tiberium": 1, "RepairBase": 19}, {
        "tiberium": 2,
        "RepairBase": 23
    }, {"tiberium": 2, "RepairBase": 29}, {"tiberium": 9, "RepairBase": 36}, {
        "tiberium": 50,
        "RepairBase": 45
    }, {"tiberium": 108, "RepairBase": 55}, {"tiberium": 165, "RepairBase": 68}, {
        "tiberium": 208,
        "RepairBase": 85
    }, {"tiberium": 264, "RepairBase": 104}, {"tiberium": 410, "RepairBase": 129}, {
        "tiberium": 605,
        "RepairBase": 160
    }],
    "modifiers": [{}, {"TiberiumStorage": 20, "CrystalStorage": 20}, {
        "TiberiumStorage": 40,
        "CrystalStorage": 40
    }, {"TiberiumStorage": 300, "CrystalStorage": 300}, {
        "TiberiumStorage": 800,
        "CrystalStorage": 800
    }, {"TiberiumStorage": 2500, "CrystalStorage": 2500}, {
        "TiberiumStorage": 8000,
        "CrystalStorage": 8000
    }, {"TiberiumStorage": 17000, "CrystalStorage": 17000}, {
        "TiberiumStorage": 36000,
        "CrystalStorage": 36000
    }, {"TiberiumStorage": 48000, "CrystalStorage": 48000}, {
        "TiberiumStorage": 65000,
        "CrystalStorage": 65000
    }, {"TiberiumStorage": 85000, "CrystalStorage": 85000}, {"TiberiumStorage": 120000, "CrystalStorage": 120000}]
}, {
    "id": 121,
    "speed": 0,
    "display": "GDI_Tech Center",
    "tech": 25,
    "name": "GDI_Tech Center",
    "faction": "GDI",
    "health": 3000,
    "movement": "Structure",
    "resources": [{}, {}],
    "repair": [{}, {"RepairBase": 196}],
    "modifiers": [{}, {}, {}, {}, {}, {}, {}, {}, {}]
}, {
    "id": 122,
    "speed": 0,
    "display": "Trade Center",
    "tech": 17,
    "name": "GDI_Trade Center",
    "faction": "GDI",
    "health": 2000,
    "movement": "Structure",
    "resources": [{}, {}],
    "repair": [{}, {"RepairBase": 196}],
    "modifiers": [{}, {}, {}, {}, {}, {}, {}, {}, {}]
}, {
    "id": 123,
    "speed": 0,
    "display": "Scrub",
    "tech": -1,
    "name": "Scrub",
    "faction": "FOR",
    "health": 100,
    "movement": "Structure",
    "resources": [{}],
    "repair": [{}]
}, {
    "id": 124,
    "speed": 0,
    "display": "Woods",
    "tech": -1,
    "name": "Forest",
    "faction": "FOR",
    "health": 100,
    "movement": "Structure",
    "resources": [{}],
    "repair": [{}]
}, {
    "id": 125,
    "speed": 0,
    "display": "Oil Slick",
    "tech": -1,
    "name": "Swamp",
    "faction": "FOR",
    "health": 100,
    "movement": "Structure",
    "resources": [{}],
    "repair": [{}]
}, {
    "id": 126,
    "speed": 0,
    "display": "Swamp",
    "tech": -1,
    "name": "Water",
    "faction": "FOR",
    "health": 100,
    "movement": "Structure",
    "resources": [{}],
    "repair": [{}]
}, {
    "id": 127,
    "speed": 0,
    "display": "Titan Artillery",
    "tech": 70,
    "name": "GDI_Art Tank",
    "faction": "GDI",
    "health": 700,
    "movement": "Structure",
    "resources": [{}, {"crystal": 6}, {"crystal": 12}, {"crystal": 20, "power": 6}, {
        "crystal": 36,
        "power": 9
    }, {"crystal": 240, "power": 60}, {"crystal": 960, "power": 240}, {"crystal": 3000, "power": 750}, {
        "crystal": 9600,
        "power": 2400
    }, {"crystal": 25200, "power": 6300}, {"crystal": 72000, "power": 18000}, {
        "crystal": 180000,
        "power": 45000
    }, {"crystal": 384000, "power": 96000}],
    "repair": [{}, {"crystal": 3, "ResearchPoints": 180}, {"crystal": 6, "ResearchPoints": 390}, {
        "crystal": 10,
        "ResearchPoints": 690
    }, {"crystal": 18, "ResearchPoints": 960}, {"crystal": 108, "ResearchPoints": 1560}, {
        "crystal": 432,
        "ResearchPoints": 2640
    }, {"crystal": 900, "ResearchPoints": 3900}, {"crystal": 1440, "ResearchPoints": 5100}, {
        "crystal": 1638,
        "ResearchPoints": 6600
    }, {"crystal": 2160, "ResearchPoints": 8550}, {"crystal": 3294, "ResearchPoints": 11400}, {
        "crystal": 4838,
        "ResearchPoints": 12600
    }],
    "weapons": [{
        "range": {"min": 350, "max": 550},
        "armorType": "LightArmorInfantry",
        "damage": 20,
        "id": 130,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 350, "max": 550},
        "armorType": "HeavyArmorVehicles",
        "damage": 120,
        "id": 131,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 300, "max": 550},
        "armorType": "LightArmorInfantry",
        "damage": 20,
        "id": 339,
        "type": 7,
        "health": 0
    }, {
        "range": {"min": 300, "max": 550},
        "armorType": "HeavyArmorVehicles",
        "damage": 120,
        "id": 340,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 128,
    "speed": 0,
    "display": "Watchtower",
    "tech": 69,
    "name": "GDI_Art Inf",
    "faction": "GDI",
    "health": 600,
    "movement": "Structure",
    "resources": [{}, {"crystal": 5}, {"crystal": 10}, {"crystal": 16, "power": 5}, {
        "crystal": 29,
        "power": 7
    }, {"crystal": 192, "power": 48}, {"crystal": 768, "power": 192}, {"crystal": 2400, "power": 600}, {
        "crystal": 7680,
        "power": 1920
    }, {"crystal": 20160, "power": 5040}, {"crystal": 57600, "power": 14400}, {
        "crystal": 144000,
        "power": 36000
    }, {"crystal": 307200, "power": 76800}],
    "repair": [{}, {"crystal": 2, "ResearchPoints": 180}, {"crystal": 5, "ResearchPoints": 390}, {
        "crystal": 8,
        "ResearchPoints": 690
    }, {"crystal": 14, "ResearchPoints": 960}, {"crystal": 86, "ResearchPoints": 1560}, {
        "crystal": 346,
        "ResearchPoints": 2640
    }, {"crystal": 720, "ResearchPoints": 3900}, {"crystal": 1152, "ResearchPoints": 5100}, {
        "crystal": 1310,
        "ResearchPoints": 6600
    }, {"crystal": 1728, "ResearchPoints": 8550}, {"crystal": 2635, "ResearchPoints": 11400}, {
        "crystal": 3871,
        "ResearchPoints": 12600
    }],
    "weapons": [{
        "range": {"min": 350, "max": 550},
        "armorType": "LightArmorInfantry",
        "damage": 100,
        "id": 132,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 350, "max": 550},
        "armorType": "HeavyArmorVehicles",
        "damage": 20,
        "id": 133,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 350, "max": 550},
        "armorType": "MediumArmorAir",
        "damage": 10,
        "id": 134,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 300, "max": 550},
        "armorType": "LightArmorInfantry",
        "damage": 100,
        "id": 336,
        "type": 7,
        "health": 0
    }, {
        "range": {"min": 300, "max": 550},
        "armorType": "HeavyArmorVehicles",
        "damage": 20,
        "id": 337,
        "type": 7,
        "health": 0
    }, {
        "range": {"min": 300, "max": 550},
        "armorType": "MediumArmorAir",
        "damage": 10,
        "id": 338,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 129,
    "speed": 0,
    "display": "SAM Site",
    "tech": 71,
    "name": "GDI_Art Air",
    "faction": "GDI",
    "health": 650,
    "movement": "Structure",
    "resources": [{}, {"crystal": 5}, {"crystal": 11}, {"crystal": 18, "power": 5}, {
        "crystal": 32,
        "power": 8
    }, {"crystal": 216, "power": 54}, {"crystal": 864, "power": 216}, {"crystal": 2700, "power": 675}, {
        "crystal": 8640,
        "power": 2160
    }, {"crystal": 22680, "power": 5670}, {"crystal": 64800, "power": 16200}, {
        "crystal": 162000,
        "power": 40500
    }, {"crystal": 345600, "power": 86400}],
    "repair": [{}, {"crystal": 3, "ResearchPoints": 180}, {"crystal": 5, "ResearchPoints": 390}, {
        "crystal": 9,
        "ResearchPoints": 690
    }, {"crystal": 16, "ResearchPoints": 960}, {"crystal": 97, "ResearchPoints": 1560}, {
        "crystal": 389,
        "ResearchPoints": 2640
    }, {"crystal": 810, "ResearchPoints": 3900}, {"crystal": 1296, "ResearchPoints": 5100}, {
        "crystal": 1474,
        "ResearchPoints": 6600
    }, {"crystal": 1944, "ResearchPoints": 8550}, {"crystal": 2965, "ResearchPoints": 11400}, {
        "crystal": 4355,
        "ResearchPoints": 12600
    }],
    "weapons": [{
        "range": {"min": 350, "max": 550},
        "armorType": "MediumArmorAir",
        "damage": 160,
        "id": 135,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 300, "max": 550},
        "armorType": "MediumArmorAir",
        "damage": 160,
        "id": 335,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 130,
    "speed": 0,
    "display": "Defense HQ",
    "tech": 40,
    "name": "GDI_Defense HQ",
    "faction": "GDI",
    "health": 3000,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 5}, {"tiberium": 8}, {"tiberium": 10, "power": 2}, {
        "tiberium": 20,
        "power": 4
    }, {"tiberium": 80, "power": 20}, {"tiberium": 440, "power": 110}, {
        "tiberium": 1440,
        "power": 360
    }, {"tiberium": 4400, "power": 1100}, {"tiberium": 12800, "power": 3200}, {
        "tiberium": 35200,
        "power": 8800
    }, {"tiberium": 89600, "power": 22400}, {"tiberium": 192000, "power": 48000}],
    "repair": [{}, {"tiberium": 3, "RepairBase": 31}, {"tiberium": 4, "RepairBase": 38}, {
        "tiberium": 5,
        "RepairBase": 47
    }, {"tiberium": 10, "RepairBase": 59}, {"tiberium": 36, "RepairBase": 73}, {
        "tiberium": 198,
        "RepairBase": 90
    }, {"tiberium": 432, "RepairBase": 111}, {"tiberium": 660, "RepairBase": 137}, {
        "tiberium": 832,
        "RepairBase": 170
    }, {"tiberium": 1056, "RepairBase": 209}, {"tiberium": 1640, "RepairBase": 259}, {
        "tiberium": 2419,
        "RepairBase": 320
    }],
    "modifiers": [{}, {"HeadCountDefense": 20}, {"HeadCountDefense": 30}, {"HeadCountDefense": 40}, {"HeadCountDefense": 50}, {"HeadCountDefense": 60}, {"HeadCountDefense": 70}, {"HeadCountDefense": 80}, {"HeadCountDefense": 90}, {"HeadCountDefense": 100}, {"HeadCountDefense": 110}, {"HeadCountDefense": 120}, {"HeadCountDefense": 130}]
}, {
    "id": 131,
    "speed": 0,
    "display": "Defense Facility",
    "tech": 42,
    "name": "GDI_Defense Facility",
    "faction": "GDI",
    "health": 2500,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 3}, {"tiberium": 5}, {"tiberium": 6, "power": 2}, {
        "tiberium": 12,
        "power": 3
    }, {"tiberium": 55, "power": 14}, {"tiberium": 330, "power": 83}, {
        "tiberium": 1080,
        "power": 270
    }, {"tiberium": 3300, "power": 825}, {"tiberium": 9600, "power": 2400}, {
        "tiberium": 26400,
        "power": 6600
    }, {"tiberium": 67200, "power": 16800}, {"tiberium": 144000, "power": 36000}],
    "repair": [{}, {"tiberium": 2, "RepairBase": 31}, {"tiberium": 3, "RepairBase": 38}, {
        "tiberium": 3,
        "RepairBase": 47
    }, {"tiberium": 6, "RepairBase": 59}, {"tiberium": 25, "RepairBase": 73}, {
        "tiberium": 149,
        "RepairBase": 90
    }, {"tiberium": 324, "RepairBase": 111}, {"tiberium": 495, "RepairBase": 137}, {
        "tiberium": 624,
        "RepairBase": 170
    }, {"tiberium": 792, "RepairBase": 209}, {"tiberium": 1230, "RepairBase": 259}, {
        "tiberium": 1814,
        "RepairBase": 320
    }],
    "modifiers": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
}, {
    "id": 133,
    "speed": 60,
    "display": "Militants",
    "tech": 122,
    "name": "NOD_Militants",
    "faction": "NOD",
    "health": 850,
    "movement": "Feet",
    "resources": [{}, {"crystal": 1}, {"crystal": 2}, {"crystal": 4, "power": 2}, {
        "crystal": 7,
        "power": 2
    }, {"crystal": 45, "power": 11}, {"crystal": 263, "power": 66}, {"crystal": 1013, "power": 253}, {
        "crystal": 2663,
        "power": 666
    }, {"crystal": 7350, "power": 1838}, {"crystal": 19875, "power": 4969}, {
        "crystal": 40125,
        "power": 10031
    }, {"crystal": 72000, "power": 18000}],
    "repair": [{}, {"crystal": 1, "RepairInf": 171}, {"crystal": 1, "RepairInf": 197}, {
        "crystal": 2,
        "RepairInf": 226
    }, {"crystal": 3, "RepairInf": 260}, {"crystal": 20, "RepairInf": 299}, {
        "crystal": 118,
        "RepairInf": 344
    }, {"crystal": 304, "RepairInf": 396}, {"crystal": 399, "RepairInf": 456}, {
        "crystal": 478,
        "RepairInf": 524
    }, {"crystal": 596, "RepairInf": 603}, {"crystal": 734, "RepairInf": 693}, {"crystal": 907, "RepairInf": 798}],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 245,
        "id": 136,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 120,
        "id": 137,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "MediumArmorAir",
        "damage": 0,
        "id": 138,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 85,
        "id": 139,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 85,
        "id": 140,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 324, "type": 2, "health": 0}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 134,
    "speed": 60,
    "display": "Militant Rocket Squad",
    "tech": 92,
    "name": "NOD_Militant Rocket Soldiers",
    "faction": "NOD",
    "health": 600,
    "movement": "Feet",
    "resources": [{}, {"crystal": 1}, {"crystal": 2}, {"crystal": 5, "power": 2}, {
        "crystal": 8,
        "power": 2
    }, {"crystal": 54, "power": 14}, {"crystal": 315, "power": 79}, {"crystal": 1215, "power": 304}, {
        "crystal": 3195,
        "power": 799
    }, {"crystal": 8820, "power": 2205}, {"crystal": 23850, "power": 5963}, {
        "crystal": 48150,
        "power": 12038
    }, {"crystal": 86400, "power": 21600}],
    "repair": [{}, {"crystal": 1, "RepairInf": 171}, {"crystal": 1, "RepairInf": 197}, {
        "crystal": 2,
        "RepairInf": 226
    }, {"crystal": 4, "RepairInf": 260}, {"crystal": 24, "RepairInf": 299}, {
        "crystal": 142,
        "RepairInf": 344
    }, {"crystal": 365, "RepairInf": 396}, {"crystal": 479, "RepairInf": 456}, {
        "crystal": 573,
        "RepairInf": 524
    }, {"crystal": 716, "RepairInf": 603}, {"crystal": 881, "RepairInf": 693}, {"crystal": 1089, "RepairInf": 798}],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 30,
        "id": 141,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 60,
        "id": 142,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 180,
        "id": 144,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "StructureBase",
        "damage": 180,
        "id": 145,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 490, "type": 9, "health": 720}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 135,
    "speed": 60,
    "display": "Confessor",
    "tech": 95,
    "name": "NOD_Confessor",
    "faction": "NOD",
    "health": 700,
    "movement": "Feet",
    "resources": [{}, {"crystal": 3}, {"crystal": 6}, {"crystal": 15, "power": 6}, {
        "crystal": 27,
        "power": 7
    }, {"crystal": 180, "power": 45}, {"crystal": 1050, "power": 263}, {
        "crystal": 4050,
        "power": 1013
    }, {"crystal": 10650, "power": 2663}, {"crystal": 29400, "power": 7350}, {
        "crystal": 79500,
        "power": 19875
    }, {"crystal": 160500, "power": 40125}, {"crystal": 288000, "power": 72000}],
    "repair": [{}, {"crystal": 2, "RepairInf": 342}, {"crystal": 3, "RepairInf": 394}, {
        "crystal": 8,
        "RepairInf": 453
    }, {"crystal": 14, "RepairInf": 521}, {"crystal": 81, "RepairInf": 599}, {
        "crystal": 473,
        "RepairInf": 689
    }, {"crystal": 1215, "RepairInf": 792}, {"crystal": 1598, "RepairInf": 911}, {
        "crystal": 1911,
        "RepairInf": 1048
    }, {"crystal": 2385, "RepairInf": 1206}, {"crystal": 2937, "RepairInf": 1386}, {
        "crystal": 3629,
        "RepairInf": 1595
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 260,
        "id": 146,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 40,
        "id": 147,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 35,
        "id": 148,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "StructureBase",
        "damage": 35,
        "id": 149,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 495, "type": 9, "health": 840}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 136,
    "speed": 60,
    "display": "Black Hand",
    "tech": 96,
    "name": "NOD_Black Hand",
    "faction": "NOD",
    "health": 1100,
    "movement": "Feet",
    "resources": [{}, {"crystal": 2}, {"crystal": 5}, {"crystal": 12, "power": 5}, {
        "crystal": 22,
        "power": 5
    }, {"crystal": 144, "power": 36}, {"crystal": 840, "power": 210}, {"crystal": 3240, "power": 810}, {
        "crystal": 8520,
        "power": 2130
    }, {"crystal": 23520, "power": 5880}, {"crystal": 63600, "power": 15900}, {
        "crystal": 128400,
        "power": 32100
    }, {"crystal": 230400, "power": 57600}],
    "repair": [{}, {"crystal": 1, "RepairInf": 342}, {"crystal": 2, "RepairInf": 394}, {
        "crystal": 6,
        "RepairInf": 453
    }, {"crystal": 11, "RepairInf": 521}, {"crystal": 65, "RepairInf": 599}, {
        "crystal": 378,
        "RepairInf": 689
    }, {"crystal": 972, "RepairInf": 792}, {"crystal": 1278, "RepairInf": 911}, {
        "crystal": 1529,
        "RepairInf": 1048
    }, {"crystal": 1908, "RepairInf": 1206}, {"crystal": 2350, "RepairInf": 1386}, {
        "crystal": 2903,
        "RepairInf": 1595
    }],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 60,
        "id": 150,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 450,
        "id": 151,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 90,
        "id": 153,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 90,
        "id": 154,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 60,
        "id": 475,
        "type": 7,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 450,
        "id": 476,
        "type": 7,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 90,
        "id": 478,
        "type": 7,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 90,
        "id": 479,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 137,
    "speed": 60,
    "display": "Commando",
    "tech": 99,
    "name": "NOD_Commando",
    "faction": "NOD",
    "health": 900,
    "movement": "Feet",
    "resources": [{}, {"crystal": 4}, {"crystal": 8}, {"crystal": 19, "power": 8}, {
        "crystal": 34,
        "power": 9
    }, {"crystal": 228, "power": 57}, {"crystal": 1330, "power": 333}, {
        "crystal": 5130,
        "power": 1283
    }, {"crystal": 13490, "power": 3373}, {"crystal": 37240, "power": 9310}, {
        "crystal": 100700,
        "power": 25175
    }, {"crystal": 203300, "power": 50825}, {"crystal": 364800, "power": 91200}],
    "repair": [{}, {"crystal": 2, "RepairInf": 342}, {"crystal": 4, "RepairInf": 394}, {
        "crystal": 10,
        "RepairInf": 453
    }, {"crystal": 17, "RepairInf": 521}, {"crystal": 103, "RepairInf": 599}, {
        "crystal": 599,
        "RepairInf": 689
    }, {"crystal": 1539, "RepairInf": 792}, {"crystal": 2024, "RepairInf": 911}, {
        "crystal": 2421,
        "RepairInf": 1048
    }, {"crystal": 3021, "RepairInf": 1206}, {"crystal": 3720, "RepairInf": 1386}, {
        "crystal": 4596,
        "RepairInf": 1595
    }],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 200,
        "id": 155,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 40,
        "id": 156,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 400,
        "id": 158,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 400,
        "id": 159,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 327, "type": 2, "health": 0}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 138,
    "speed": 120,
    "display": "Attack Bike",
    "tech": 118,
    "name": "NOD_Attack Bike",
    "faction": "NOD",
    "health": 800,
    "movement": "Wheel",
    "resources": [{}, {"crystal": 1}, {"crystal": 2}, {"crystal": 4, "power": 2}, {
        "crystal": 7,
        "power": 2
    }, {"crystal": 48, "power": 12}, {"crystal": 280, "power": 70}, {"crystal": 1080, "power": 270}, {
        "crystal": 2840,
        "power": 710
    }, {"crystal": 7840, "power": 1960}, {"crystal": 21200, "power": 5300}, {
        "crystal": 42800,
        "power": 10700
    }, {"crystal": 76800, "power": 19200}],
    "repair": [{}, {"crystal": 1, "RepairVeh": 188}, {"crystal": 2, "RepairVeh": 217}, {
        "crystal": 3,
        "RepairVeh": 249
    }, {"crystal": 4, "RepairVeh": 287}, {"crystal": 22, "RepairVeh": 330}, {
        "crystal": 126,
        "RepairVeh": 379
    }, {"crystal": 324, "RepairVeh": 436}, {"crystal": 426, "RepairVeh": 501}, {
        "crystal": 510,
        "RepairVeh": 577
    }, {"crystal": 636, "RepairVeh": 663}, {"crystal": 783, "RepairVeh": 763}, {"crystal": 968, "RepairVeh": 878}],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 70,
        "id": 160,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 110,
        "id": 161,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 250,
        "id": 162,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 250,
        "id": 163,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 471, "type": 5, "health": 230}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 139,
    "speed": 90,
    "display": "Scorpion",
    "tech": 91,
    "name": "NOD_Scorpion Tank",
    "faction": "NOD",
    "health": 950,
    "movement": "Track",
    "resources": [{}, {"crystal": 2}, {"crystal": 4}, {"crystal": 11, "power": 4}, {
        "crystal": 20,
        "power": 5
    }, {"crystal": 132, "power": 33}, {"crystal": 770, "power": 193}, {"crystal": 2970, "power": 743}, {
        "crystal": 7810,
        "power": 1953
    }, {"crystal": 21560, "power": 5390}, {"crystal": 58300, "power": 14575}, {
        "crystal": 117700,
        "power": 29425
    }, {"crystal": 211200, "power": 52800}],
    "repair": [{}, {"crystal": 1, "RepairVeh": 377}, {"crystal": 2, "RepairVeh": 433}, {
        "crystal": 6,
        "RepairVeh": 498
    }, {"crystal": 10, "RepairVeh": 573}, {"crystal": 59, "RepairVeh": 659}, {
        "crystal": 347,
        "RepairVeh": 758
    }, {"crystal": 891, "RepairVeh": 872}, {"crystal": 1172, "RepairVeh": 1003}, {
        "crystal": 1401,
        "RepairVeh": 1153
    }, {"crystal": 1749, "RepairVeh": 1327}, {"crystal": 2154, "RepairVeh": 1526}, {
        "crystal": 2661,
        "RepairVeh": 1755
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 90,
        "id": 169,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 220,
        "id": 170,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 130,
        "id": 172,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "StructureBase",
        "damage": 130,
        "id": 173,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 500, "id": 522, "type": 13, "health": 0}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 140,
    "speed": 90,
    "display": "Reckoner",
    "tech": 93,
    "name": "NOD_Reckoner",
    "faction": "NOD",
    "health": 1200,
    "movement": "Track",
    "resources": [{}, {"crystal": 2}, {"crystal": 4}, {"crystal": 9, "power": 4}, {
        "crystal": 16,
        "power": 4
    }, {"crystal": 108, "power": 27}, {"crystal": 630, "power": 158}, {"crystal": 2430, "power": 608}, {
        "crystal": 6390,
        "power": 1598
    }, {"crystal": 17640, "power": 4410}, {"crystal": 47700, "power": 11925}, {
        "crystal": 96300,
        "power": 24075
    }, {"crystal": 172800, "power": 43200}],
    "repair": [{}, {"crystal": 1, "RepairVeh": 377}, {"crystal": 2, "RepairVeh": 433}, {
        "crystal": 5,
        "RepairVeh": 498
    }, {"crystal": 8, "RepairVeh": 573}, {"crystal": 49, "RepairVeh": 659}, {
        "crystal": 284,
        "RepairVeh": 758
    }, {"crystal": 729, "RepairVeh": 872}, {"crystal": 959, "RepairVeh": 1003}, {
        "crystal": 1147,
        "RepairVeh": 1153
    }, {"crystal": 1431, "RepairVeh": 1327}, {"crystal": 1762, "RepairVeh": 1526}, {
        "crystal": 2177,
        "RepairVeh": 1755
    }],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 270,
        "id": 164,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 100,
        "id": 165,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 65,
        "id": 167,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 65,
        "id": 168,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 0},
        "armorType": "LightArmorInfantry",
        "damage": 0,
        "id": 423,
        "type": 8,
        "health": 10
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 141,
    "speed": 90,
    "display": "Avatar",
    "tech": 98,
    "name": "NOD_Avatar",
    "faction": "NOD",
    "health": 2500,
    "movement": "Track",
    "resources": [{}, {"crystal": 5}, {"crystal": 9}, {"crystal": 23, "power": 9}, {
        "crystal": 41,
        "power": 10
    }, {"crystal": 270, "power": 68}, {"crystal": 1575, "power": 394}, {
        "crystal": 6075,
        "power": 1519
    }, {"crystal": 15975, "power": 3994}, {"crystal": 44100, "power": 11025}, {
        "crystal": 119250,
        "power": 29813
    }, {"crystal": 240750, "power": 60188}, {"crystal": 432000, "power": 108000}],
    "repair": [{}, {"crystal": 2, "RepairVeh": 565}, {"crystal": 5, "RepairVeh": 650}, {
        "crystal": 11,
        "RepairVeh": 748
    }, {"crystal": 20, "RepairVeh": 860}, {"crystal": 122, "RepairVeh": 989}, {
        "crystal": 709,
        "RepairVeh": 1138
    }, {"crystal": 1823, "RepairVeh": 1309}, {"crystal": 2396, "RepairVeh": 1505}, {
        "crystal": 2867,
        "RepairVeh": 1731
    }, {"crystal": 3578, "RepairVeh": 1990}, {"crystal": 4406, "RepairVeh": 2289}, {
        "crystal": 5443,
        "RepairVeh": 2633
    }],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 170,
        "id": 174,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 320,
        "id": 175,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 210,
        "id": 177,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 210,
        "id": 178,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 320,
        "id": 334,
        "type": 7,
        "health": 200
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 142,
    "speed": 120,
    "display": "Specter",
    "tech": 101,
    "name": "NOD_Specter Artilery",
    "faction": "NOD",
    "health": 1200,
    "movement": "Track",
    "resources": [{}, {"crystal": 4}, {"crystal": 8}, {"crystal": 20, "power": 8}, {
        "crystal": 36,
        "power": 9
    }, {"crystal": 240, "power": 60}, {"crystal": 1400, "power": 350}, {
        "crystal": 5400,
        "power": 1350
    }, {"crystal": 14200, "power": 3550}, {"crystal": 39200, "power": 9800}, {
        "crystal": 106000,
        "power": 26500
    }, {"crystal": 214000, "power": 53500}, {"crystal": 384000, "power": 96000}],
    "repair": [{}, {"crystal": 2, "RepairVeh": 377}, {"crystal": 4, "RepairVeh": 433}, {
        "crystal": 10,
        "RepairVeh": 498
    }, {"crystal": 18, "RepairVeh": 573}, {"crystal": 108, "RepairVeh": 659}, {
        "crystal": 630,
        "RepairVeh": 758
    }, {"crystal": 1620, "RepairVeh": 872}, {"crystal": 2130, "RepairVeh": 1003}, {
        "crystal": 2548,
        "RepairVeh": 1153
    }, {"crystal": 3180, "RepairVeh": 1327}, {"crystal": 3916, "RepairVeh": 1526}, {
        "crystal": 4838,
        "RepairVeh": 1755
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 30,
        "id": 179,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 90,
        "id": 180,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 450,
        "id": 182,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "StructureBase",
        "damage": 450,
        "id": 183,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 328, "type": 2, "health": 0}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 143,
    "speed": 120,
    "display": "Venom",
    "tech": 100,
    "name": "NOD_Venom",
    "faction": "NOD",
    "health": 950,
    "movement": "Air2",
    "resources": [{}, {"crystal": 3}, {"crystal": 5}, {"crystal": 13, "power": 5}, {
        "crystal": 23,
        "power": 6
    }, {"crystal": 156, "power": 39}, {"crystal": 910, "power": 228}, {"crystal": 3510, "power": 878}, {
        "crystal": 9230,
        "power": 2308
    }, {"crystal": 25480, "power": 6370}, {"crystal": 68900, "power": 17225}, {
        "crystal": 139100,
        "power": 34775
    }, {"crystal": 249600, "power": 62400}],
    "repair": [{}, {"crystal": 1, "RepairAir": 415}, {"crystal": 3, "RepairAir": 477}, {
        "crystal": 7,
        "RepairAir": 548
    }, {"crystal": 12, "RepairAir": 631}, {"crystal": 70, "RepairAir": 725}, {
        "crystal": 410,
        "RepairAir": 834
    }, {"crystal": 1053, "RepairAir": 960}, {"crystal": 1385, "RepairAir": 1104}, {
        "crystal": 1656,
        "RepairAir": 1269
    }, {"crystal": 2067, "RepairAir": 1460}, {"crystal": 2546, "RepairAir": 1679}, {
        "crystal": 3145,
        "RepairAir": 1931
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 220,
        "id": 184,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 50,
        "id": 185,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 120,
        "id": 187,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "StructureBase",
        "damage": 120,
        "id": 188,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 0},
        "armorType": "LightArmorInfantry",
        "damage": 0,
        "id": 470,
        "type": 8,
        "health": 5
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 144,
    "speed": 120,
    "display": "Cobra",
    "tech": 94,
    "name": "NOD_Cobra",
    "faction": "NOD",
    "health": 1050,
    "movement": "Air",
    "resources": [{}, {"crystal": 2}, {"crystal": 4}, {"crystal": 11, "power": 4}, {
        "crystal": 20,
        "power": 5
    }, {"crystal": 132, "power": 33}, {"crystal": 770, "power": 193}, {"crystal": 2970, "power": 743}, {
        "crystal": 7810,
        "power": 1953
    }, {"crystal": 21560, "power": 5390}, {"crystal": 58300, "power": 14575}, {
        "crystal": 117700,
        "power": 29425
    }, {"crystal": 211200, "power": 52800}],
    "repair": [{}, {"crystal": 1, "RepairAir": 415}, {"crystal": 2, "RepairAir": 477}, {
        "crystal": 6,
        "RepairAir": 548
    }, {"crystal": 10, "RepairAir": 631}, {"crystal": 59, "RepairAir": 725}, {
        "crystal": 347,
        "RepairAir": 834
    }, {"crystal": 891, "RepairAir": 960}, {"crystal": 1172, "RepairAir": 1104}, {
        "crystal": 1401,
        "RepairAir": 1269
    }, {"crystal": 1749, "RepairAir": 1460}, {"crystal": 2154, "RepairAir": 1679}, {
        "crystal": 2661,
        "RepairAir": 1931
    }],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 180,
        "id": 189,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 380,
        "id": 190,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 120,
        "id": 192,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 120,
        "id": 193,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 332, "type": 5, "health": 300}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 145,
    "speed": 120,
    "display": "Salamander",
    "tech": 102,
    "name": "NOD_Salamander",
    "faction": "NOD",
    "health": 1350,
    "movement": "Air",
    "resources": [{}, {"crystal": 6}, {"crystal": 12}, {"crystal": 30, "power": 12}, {
        "crystal": 54,
        "power": 14
    }, {"crystal": 360, "power": 90}, {"crystal": 2100, "power": 525}, {
        "crystal": 8100,
        "power": 2025
    }, {"crystal": 21300, "power": 5325}, {"crystal": 58800, "power": 14700}, {
        "crystal": 159000,
        "power": 39750
    }, {"crystal": 321000, "power": 80250}, {"crystal": 576000, "power": 144000}],
    "repair": [{}, {"crystal": 3, "RepairAir": 622}, {"crystal": 6, "RepairAir": 715}, {
        "crystal": 15,
        "RepairAir": 823
    }, {"crystal": 27, "RepairAir": 946}, {"crystal": 162, "RepairAir": 1088}, {
        "crystal": 945,
        "RepairAir": 1252
    }, {"crystal": 2430, "RepairAir": 1439}, {"crystal": 3195, "RepairAir": 1655}, {
        "crystal": 3822,
        "RepairAir": 1904
    }, {"crystal": 4770, "RepairAir": 2189}, {"crystal": 5874, "RepairAir": 2518}, {
        "crystal": 7258,
        "RepairAir": 2896
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 170,
        "id": 194,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 240,
        "id": 195,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 500,
        "id": 197,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "StructureBase",
        "damage": 500,
        "id": 198,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 250}, "armorType": "Structure", "damage": 500, "id": 517, "type": 7, "health": 200}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 146,
    "speed": 240,
    "display": "Vertigo",
    "tech": 97,
    "name": "NOD_Vertigo",
    "faction": "NOD",
    "health": 600,
    "movement": "Air2",
    "resources": [{}, {"crystal": 3}, {"crystal": 6}, {"crystal": 14, "power": 6}, {
        "crystal": 25,
        "power": 6
    }, {"crystal": 168, "power": 42}, {"crystal": 980, "power": 245}, {"crystal": 3780, "power": 945}, {
        "crystal": 9940,
        "power": 2485
    }, {"crystal": 27440, "power": 6860}, {"crystal": 74200, "power": 18550}, {
        "crystal": 149800,
        "power": 37450
    }, {"crystal": 268800, "power": 67200}],
    "repair": [{}, {"crystal": 1, "RepairAir": 415}, {"crystal": 3, "RepairAir": 477}, {
        "crystal": 7,
        "RepairAir": 548
    }, {"crystal": 13, "RepairAir": 631}, {"crystal": 76, "RepairAir": 725}, {
        "crystal": 441,
        "RepairAir": 834
    }, {"crystal": 1134, "RepairAir": 960}, {"crystal": 1491, "RepairAir": 1104}, {
        "crystal": 1784,
        "RepairAir": 1269
    }, {"crystal": 2226, "RepairAir": 1460}, {"crystal": 2741, "RepairAir": 1679}, {
        "crystal": 3387,
        "RepairAir": 1931
    }],
    "weapons": [{
        "range": {"min": 0, "max": 50},
        "armorType": "Structure",
        "damage": 8500,
        "id": 199,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 50},
        "armorType": "StructureBase",
        "damage": 8500,
        "id": 200,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 516, "type": 11, "health": 0}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 147,
    "speed": 0,
    "display": "Accumulator",
    "tech": 18,
    "name": "NOD_Accumulator",
    "faction": "NOD",
    "health": 1000,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 1}, {"tiberium": 2}, {"tiberium": 3, "power": 1}, {
        "tiberium": 4,
        "power": 1
    }, {"tiberium": 20, "power": 5}, {"tiberium": 110, "power": 28}, {"tiberium": 360, "power": 90}, {
        "tiberium": 1100,
        "power": 275
    }, {"tiberium": 3200, "power": 800}, {"tiberium": 8800, "power": 2200}, {
        "tiberium": 22400,
        "power": 5600
    }, {"tiberium": 48000, "power": 12000}],
    "repair": [{}, {"RepairBase": 15}, {"tiberium": 1, "RepairBase": 19}, {
        "tiberium": 2,
        "RepairBase": 23
    }, {"tiberium": 2, "RepairBase": 29}, {"tiberium": 9, "RepairBase": 36}, {
        "tiberium": 50,
        "RepairBase": 45
    }, {"tiberium": 108, "RepairBase": 55}, {"tiberium": 165, "RepairBase": 68}, {
        "tiberium": 208,
        "RepairBase": 85
    }, {"tiberium": 264, "RepairBase": 104}, {"tiberium": 410, "RepairBase": 129}, {
        "tiberium": 605,
        "RepairBase": 160
    }],
    "modifiers": [{}, {"PowerStorage": 15}, {"PowerStorage": 40}, {"PowerStorage": 80}, {"PowerStorage": 270}, {"PowerStorage": 1500}, {"PowerStorage": 5500}, {"PowerStorage": 13000}, {"PowerStorage": 35000}, {"PowerStorage": 65000}, {"PowerStorage": 105000}, {"PowerStorage": 150000}, {"PowerStorage": 200000}]
}, {
    "id": 148,
    "speed": 0,
    "display": "Airport",
    "tech": 39,
    "name": "NOD_Airport",
    "faction": "NOD",
    "health": 2500,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 3}, {"tiberium": 5}, {"tiberium": 6, "power": 2}, {
        "tiberium": 12,
        "power": 3
    }, {"tiberium": 55, "power": 14}, {"tiberium": 330, "power": 83}, {
        "tiberium": 1080,
        "power": 270
    }, {"tiberium": 3300, "power": 825}, {"tiberium": 9600, "power": 2400}, {
        "tiberium": 26400,
        "power": 6600
    }, {"tiberium": 67200, "power": 16800}, {"tiberium": 144000, "power": 36000}],
    "repair": [{}, {"tiberium": 2, "RepairBase": 31}, {"tiberium": 2, "RepairBase": 38}, {
        "tiberium": 3,
        "RepairBase": 47
    }, {"tiberium": 6, "RepairBase": 59}, {"tiberium": 25, "RepairBase": 73}, {
        "tiberium": 148,
        "RepairBase": 90
    }, {"tiberium": 324, "RepairBase": 111}, {"tiberium": 495, "RepairBase": 137}, {
        "tiberium": 624,
        "RepairBase": 170
    }, {"tiberium": 792, "RepairBase": 209}, {"tiberium": 1230, "RepairBase": 259}, {
        "tiberium": 1814,
        "RepairBase": 320
    }],
    "modifiers": [{}, {"RepairEfficiencyAir": 38.75}, {"RepairEfficiencyAir": 42.24}, {"RepairEfficiencyAir": 46.04}, {"RepairEfficiencyAir": 50.19}, {"RepairEfficiencyAir": 54.7}, {"RepairEfficiencyAir": 59.63}, {"RepairEfficiencyAir": 64.99}, {"RepairEfficiencyAir": 70.84}, {"RepairEfficiencyAir": 77.22}, {"RepairEfficiencyAir": 84.17}, {"RepairEfficiencyAir": 91.74}, {"RepairEfficiencyAir": 100}]
}, {
    "id": 149,
    "speed": 0,
    "display": "Hand of Nod",
    "tech": 37,
    "name": "NOD_Barracks",
    "faction": "NOD",
    "health": 2500,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 3}, {"tiberium": 5}, {"tiberium": 6, "power": 2}, {
        "tiberium": 12,
        "power": 3
    }, {"tiberium": 55, "power": 14}, {"tiberium": 330, "power": 83}, {
        "tiberium": 1080,
        "power": 270
    }, {"tiberium": 3300, "power": 825}, {"tiberium": 9600, "power": 2400}, {
        "tiberium": 26400,
        "power": 6600
    }, {"tiberium": 67200, "power": 16800}, {"tiberium": 144000, "power": 36000}],
    "repair": [{}, {"tiberium": 2, "RepairBase": 31}, {"tiberium": 2, "RepairBase": 38}, {
        "tiberium": 3,
        "RepairBase": 47
    }, {"tiberium": 6, "RepairBase": 59}, {"tiberium": 25, "RepairBase": 73}, {
        "tiberium": 148,
        "RepairBase": 90
    }, {"tiberium": 324, "RepairBase": 111}, {"tiberium": 495, "RepairBase": 137}, {
        "tiberium": 624,
        "RepairBase": 170
    }, {"tiberium": 792, "RepairBase": 209}, {"tiberium": 1230, "RepairBase": 259}, {
        "tiberium": 1814,
        "RepairBase": 320
    }],
    "modifiers": [{}, {"RepairEfficiencyInf": 38.75}, {"RepairEfficiencyInf": 42.24}, {"RepairEfficiencyInf": 46.04}, {"RepairEfficiencyInf": 50.19}, {"RepairEfficiencyInf": 54.7}, {"RepairEfficiencyInf": 59.63}, {"RepairEfficiencyInf": 64.99}, {"RepairEfficiencyInf": 70.84}, {"RepairEfficiencyInf": 77.22}, {"RepairEfficiencyInf": 84.17}, {"RepairEfficiencyInf": 91.74}, {"RepairEfficiencyInf": 100}]
}, {
    "id": 151,
    "speed": 0,
    "display": "Construction Yard",
    "tech": 11,
    "name": "NOD_Construction Yard",
    "faction": "NOD",
    "health": 5500,
    "movement": "Structure",
    "resources": [{}, {}, {"tiberium": 10}, {"tiberium": 15}, {"tiberium": 30, "power": 3}, {
        "tiberium": 60,
        "power": 15
    }, {"tiberium": 440, "power": 110}, {"tiberium": 1440, "power": 360}, {
        "tiberium": 4400,
        "power": 1100
    }, {"tiberium": 12800, "power": 3200}, {"tiberium": 35200, "power": 8800}, {
        "tiberium": 89600,
        "power": 22400
    }, {"tiberium": 192000, "power": 48000}],
    "repair": [{}, {"RepairBase": 31}, {"tiberium": 5, "RepairBase": 38}, {
        "tiberium": 8,
        "RepairBase": 47
    }, {"tiberium": 15, "RepairBase": 59}, {"tiberium": 27, "RepairBase": 73}, {
        "tiberium": 198,
        "RepairBase": 90
    }, {"tiberium": 432, "RepairBase": 111}, {"tiberium": 660, "RepairBase": 137}, {
        "tiberium": 832,
        "RepairBase": 170
    }, {"tiberium": 1056, "RepairBase": 209}, {"tiberium": 1640, "RepairBase": 259}, {
        "tiberium": 2419,
        "RepairBase": 320
    }],
    "modifiers": [{}, {
        "TiberiumStorage": 50,
        "CrystalStorage": 50,
        "BuildingSlots": 4,
        "PowerStorage": 40,
        "RepairEfficiencyBase": 35.05
    }, {
        "TiberiumStorage": 360,
        "CrystalStorage": 360,
        "BuildingSlots": 8,
        "PowerStorage": 260,
        "RepairEfficiencyBase": 38.55
    }, {
        "TiberiumStorage": 1450,
        "CrystalStorage": 1450,
        "BuildingSlots": 14,
        "PowerStorage": 1150,
        "RepairEfficiencyBase": 42.41
    }, {
        "TiberiumStorage": 2650,
        "CrystalStorage": 2650,
        "BuildingSlots": 17,
        "PowerStorage": 2500,
        "RepairEfficiencyBase": 46.65
    }, {
        "TiberiumStorage": 6000,
        "CrystalStorage": 6000,
        "BuildingSlots": 18,
        "PowerStorage": 8000,
        "RepairEfficiencyBase": 51.32
    }, {
        "TiberiumStorage": 14400,
        "CrystalStorage": 14400,
        "BuildingSlots": 19,
        "PowerStorage": 19000,
        "RepairEfficiencyBase": 56.45
    }, {
        "TiberiumStorage": 22800,
        "CrystalStorage": 22800,
        "BuildingSlots": 21,
        "PowerStorage": 33000,
        "RepairEfficiencyBase": 62.09
    }, {
        "TiberiumStorage": 33000,
        "CrystalStorage": 33000,
        "BuildingSlots": 23,
        "PowerStorage": 45000,
        "RepairEfficiencyBase": 68.3
    }, {
        "TiberiumStorage": 50000,
        "CrystalStorage": 50000,
        "BuildingSlots": 24,
        "PowerStorage": 65000,
        "RepairEfficiencyBase": 75.13
    }, {
        "TiberiumStorage": 70000,
        "CrystalStorage": 70000,
        "BuildingSlots": 25,
        "PowerStorage": 105000,
        "RepairEfficiencyBase": 82.64
    }, {
        "TiberiumStorage": 95000,
        "CrystalStorage": 95000,
        "BuildingSlots": 26,
        "PowerStorage": 150000,
        "RepairEfficiencyBase": 90.91
    }, {
        "TiberiumStorage": 120000,
        "CrystalStorage": 120000,
        "BuildingSlots": 27,
        "PowerStorage": 200000,
        "RepairEfficiencyBase": 100
    }]
}, {
    "id": 152,
    "speed": 0,
    "display": "Power Plant",
    "tech": 15,
    "name": "NOD_Power Plant",
    "faction": "NOD",
    "health": 2000,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 2}, {"tiberium": 3}, {"tiberium": 5}, {"tiberium": 10, "power": 1}, {
        "tiberium": 46,
        "power": 5
    }, {"tiberium": 286, "power": 28}, {"tiberium": 936, "power": 90}, {
        "tiberium": 2860,
        "power": 275
    }, {"tiberium": 8320, "power": 800}, {"tiberium": 22880, "power": 2200}, {
        "tiberium": 58240,
        "power": 5600
    }, {"tiberium": 124800, "power": 12000}],
    "repair": [{}, {"tiberium": 1, "RepairBase": 23}, {"tiberium": 2, "RepairBase": 29}, {
        "tiberium": 3,
        "RepairBase": 35
    }, {"tiberium": 5, "RepairBase": 44}, {"tiberium": 20, "RepairBase": 54}, {
        "tiberium": 129,
        "RepairBase": 67
    }, {"tiberium": 281, "RepairBase": 83}, {"tiberium": 429, "RepairBase": 103}, {
        "tiberium": 541,
        "RepairBase": 127
    }, {"tiberium": 686, "RepairBase": 157}, {"tiberium": 1066, "RepairBase": 194}, {
        "tiberium": 1572,
        "RepairBase": 240
    }],
    "modifiers": [{}, {"PowerPackage": 2, "PowerContinous": 60}, {
        "PowerPackage": 5,
        "PowerContinous": 120
    }, {"PowerPackage": 11, "PowerContinous": 200}, {"PowerPackage": 45, "PowerContinous": 600}, {
        "PowerPackage": 120,
        "PowerContinous": 1200
    }, {"PowerPackage": 230, "PowerContinous": 1800}, {
        "PowerPackage": 560,
        "PowerContinous": 3600
    }, {"PowerPackage": 1320, "PowerContinous": 7200}, {
        "PowerPackage": 1950,
        "PowerContinous": 9000
    }, {"PowerPackage": 2700, "PowerContinous": 10800}, {
        "PowerPackage": 4100,
        "PowerContinous": 14400
    }, {"PowerPackage": 7000, "PowerContinous": 21600}]
}, {
    "id": 153,
    "speed": 0,
    "display": "Refinery",
    "tech": 12,
    "name": "NOD_Refinery",
    "faction": "NOD",
    "health": 2000,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 2}, {"tiberium": 3}, {"tiberium": 4, "power": 1}, {
        "tiberium": 8,
        "power": 2
    }, {"tiberium": 35, "power": 9}, {"tiberium": 220, "power": 55}, {"tiberium": 720, "power": 180}, {
        "tiberium": 2200,
        "power": 550
    }, {"tiberium": 6400, "power": 1600}, {"tiberium": 17600, "power": 4400}, {
        "tiberium": 44800,
        "power": 11200
    }, {"tiberium": 96000, "power": 24000}],
    "repair": [{}, {"tiberium": 1, "RepairBase": 23}, {"tiberium": 2, "RepairBase": 29}, {
        "tiberium": 2,
        "RepairBase": 35
    }, {"tiberium": 4, "RepairBase": 44}, {"tiberium": 16, "RepairBase": 54}, {
        "tiberium": 99,
        "RepairBase": 67
    }, {"tiberium": 216, "RepairBase": 83}, {"tiberium": 330, "RepairBase": 103}, {
        "tiberium": 416,
        "RepairBase": 127
    }, {"tiberium": 528, "RepairBase": 157}, {"tiberium": 820, "RepairBase": 194}, {
        "tiberium": 1210,
        "RepairBase": 240
    }],
    "modifiers": [{}, {"CreditPackage": 2, "CreditContinous": 60}, {
        "CreditPackage": 5,
        "CreditContinous": 120
    }, {"CreditPackage": 10, "CreditContinous": 200}, {
        "CreditPackage": 40,
        "CreditContinous": 600
    }, {"CreditPackage": 105, "CreditContinous": 1200}, {
        "CreditPackage": 200,
        "CreditContinous": 1800
    }, {"CreditPackage": 485, "CreditContinous": 3600}, {
        "CreditPackage": 1150,
        "CreditContinous": 7200
    }, {"CreditPackage": 1700, "CreditContinous": 9000}, {
        "CreditPackage": 2370,
        "CreditContinous": 10800
    }, {"CreditPackage": 3700, "CreditContinous": 14400}, {"CreditPackage": 6480, "CreditContinous": 21600}]
}, {
    "id": 154,
    "speed": 0,
    "display": "Silo",
    "tech": 14,
    "name": "NOD_Silo",
    "faction": "NOD",
    "health": 1000,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 1}, {"tiberium": 2}, {"tiberium": 3, "power": 1}, {
        "tiberium": 4,
        "power": 1
    }, {"tiberium": 20, "power": 5}, {"tiberium": 110, "power": 28}, {"tiberium": 360, "power": 90}, {
        "tiberium": 1100,
        "power": 275
    }, {"tiberium": 3200, "power": 800}, {"tiberium": 8800, "power": 2200}, {
        "tiberium": 22400,
        "power": 5600
    }, {"tiberium": 48000, "power": 12000}],
    "repair": [{}, {"RepairBase": 15}, {"tiberium": 1, "RepairBase": 19}, {
        "tiberium": 2,
        "RepairBase": 23
    }, {"tiberium": 2, "RepairBase": 29}, {"tiberium": 9, "RepairBase": 36}, {
        "tiberium": 50,
        "RepairBase": 45
    }, {"tiberium": 108, "RepairBase": 55}, {"tiberium": 165, "RepairBase": 68}, {
        "tiberium": 208,
        "RepairBase": 85
    }, {"tiberium": 264, "RepairBase": 104}, {"tiberium": 410, "RepairBase": 129}, {
        "tiberium": 605,
        "RepairBase": 160
    }],
    "modifiers": [{}, {"TiberiumStorage": 20, "CrystalStorage": 20}, {
        "TiberiumStorage": 40,
        "CrystalStorage": 40
    }, {"TiberiumStorage": 300, "CrystalStorage": 300}, {
        "TiberiumStorage": 800,
        "CrystalStorage": 800
    }, {"TiberiumStorage": 2500, "CrystalStorage": 2500}, {
        "TiberiumStorage": 8000,
        "CrystalStorage": 8000
    }, {"TiberiumStorage": 17000, "CrystalStorage": 17000}, {
        "TiberiumStorage": 36000,
        "CrystalStorage": 36000
    }, {"TiberiumStorage": 48000, "CrystalStorage": 48000}, {
        "TiberiumStorage": 65000,
        "CrystalStorage": 65000
    }, {"TiberiumStorage": 85000, "CrystalStorage": 85000}, {"TiberiumStorage": 120000, "CrystalStorage": 120000}]
}, {
    "id": 155,
    "speed": 0,
    "display": "Harvester",
    "tech": 33,
    "name": "NOD_Harvester",
    "faction": "NOD",
    "health": 1500,
    "movement": "Structure",
    "resources": [{}, {}, {"tiberium": 3}, {"tiberium": 4, "power": 1}, {"tiberium": 6, "power": 3}, {
        "tiberium": 15,
        "power": 12
    }, {"tiberium": 110, "power": 72}, {"tiberium": 360, "power": 234}, {
        "tiberium": 1100,
        "power": 715
    }, {"tiberium": 3200, "power": 2080}, {"tiberium": 8800, "power": 5720}, {
        "tiberium": 22400,
        "power": 14560
    }, {"tiberium": 48000, "power": 36000}],
    "repair": [{}, {"RepairBase": 23}, {"tiberium": 2, "RepairBase": 29}, {
        "tiberium": 2,
        "RepairBase": 35
    }, {"tiberium": 3, "RepairBase": 44}, {"tiberium": 12, "RepairBase": 54}, {
        "tiberium": 74,
        "RepairBase": 67
    }, {"tiberium": 162, "RepairBase": 83}, {"tiberium": 248, "RepairBase": 103}, {
        "tiberium": 312,
        "RepairBase": 127
    }, {"tiberium": 396, "RepairBase": 157}, {"tiberium": 615, "RepairBase": 194}, {
        "tiberium": 907,
        "RepairBase": 240
    }],
    "modifiers": [{}, {
        "TiberiumPackage": 4,
        "CrystalPackage": 4,
        "TiberiumContinous": 60,
        "CrystalContinous": 60
    }, {
        "TiberiumPackage": 10,
        "CrystalPackage": 10,
        "TiberiumContinous": 120,
        "CrystalContinous": 120
    }, {
        "TiberiumPackage": 24,
        "CrystalPackage": 24,
        "TiberiumContinous": 200,
        "CrystalContinous": 200
    }, {
        "TiberiumPackage": 95,
        "CrystalPackage": 95,
        "TiberiumContinous": 600,
        "CrystalContinous": 600
    }, {
        "TiberiumPackage": 245,
        "CrystalPackage": 245,
        "TiberiumContinous": 1200,
        "CrystalContinous": 1200
    }, {
        "TiberiumPackage": 460,
        "CrystalPackage": 460,
        "TiberiumContinous": 1800,
        "CrystalContinous": 1800
    }, {
        "TiberiumPackage": 1120,
        "CrystalPackage": 1120,
        "TiberiumContinous": 3600,
        "CrystalContinous": 3600
    }, {
        "TiberiumPackage": 2660,
        "CrystalPackage": 2660,
        "TiberiumContinous": 7200,
        "CrystalContinous": 7200
    }, {
        "TiberiumPackage": 3900,
        "CrystalPackage": 3900,
        "TiberiumContinous": 9000,
        "CrystalContinous": 9000
    }, {
        "TiberiumPackage": 5400,
        "CrystalPackage": 5400,
        "TiberiumContinous": 10800,
        "CrystalContinous": 10800
    }, {
        "TiberiumPackage": 8200,
        "CrystalPackage": 8200,
        "TiberiumContinous": 14400,
        "CrystalContinous": 14400
    }, {"TiberiumPackage": 14160, "CrystalPackage": 14160, "TiberiumContinous": 21600, "CrystalContinous": 21600}]
}, {
    "id": 156,
    "speed": 0,
    "display": "War Factory",
    "tech": 38,
    "name": "NOD_Factory",
    "faction": "NOD",
    "health": 2500,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 3}, {"tiberium": 5}, {"tiberium": 6, "power": 2}, {
        "tiberium": 12,
        "power": 3
    }, {"tiberium": 55, "power": 14}, {"tiberium": 330, "power": 83}, {
        "tiberium": 1080,
        "power": 270
    }, {"tiberium": 3300, "power": 825}, {"tiberium": 9600, "power": 2400}, {
        "tiberium": 26400,
        "power": 6600
    }, {"tiberium": 67200, "power": 16800}, {"tiberium": 144000, "power": 36000}],
    "repair": [{}, {"tiberium": 2, "RepairBase": 31}, {"tiberium": 2, "RepairBase": 38}, {
        "tiberium": 3,
        "RepairBase": 47
    }, {"tiberium": 6, "RepairBase": 59}, {"tiberium": 25, "RepairBase": 73}, {
        "tiberium": 148,
        "RepairBase": 90
    }, {"tiberium": 324, "RepairBase": 111}, {"tiberium": 495, "RepairBase": 137}, {
        "tiberium": 624,
        "RepairBase": 170
    }, {"tiberium": 792, "RepairBase": 209}, {"tiberium": 1230, "RepairBase": 259}, {
        "tiberium": 1814,
        "RepairBase": 320
    }],
    "modifiers": [{}, {"RepairEfficiencyVech": 38.75}, {"RepairEfficiencyVech": 42.24}, {"RepairEfficiencyVech": 46.04}, {"RepairEfficiencyVech": 50.19}, {"RepairEfficiencyVech": 54.7}, {"RepairEfficiencyVech": 59.63}, {"RepairEfficiencyVech": 64.99}, {"RepairEfficiencyVech": 70.84}, {"RepairEfficiencyVech": 77.22}, {"RepairEfficiencyVech": 84.17}, {"RepairEfficiencyVech": 91.74}, {"RepairEfficiencyVech": 100}]
}, {
    "id": 157,
    "speed": 0,
    "display": "Defense HQ",
    "tech": 41,
    "name": "NOD_Defense HQ",
    "faction": "NOD",
    "health": 3000,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 5}, {"tiberium": 8}, {"tiberium": 10, "power": 2}, {
        "tiberium": 20,
        "power": 4
    }, {"tiberium": 80, "power": 20}, {"tiberium": 440, "power": 110}, {
        "tiberium": 1440,
        "power": 360
    }, {"tiberium": 4400, "power": 1100}, {"tiberium": 12800, "power": 3200}, {
        "tiberium": 35200,
        "power": 8800
    }, {"tiberium": 89600, "power": 22400}, {"tiberium": 192000, "power": 48000}],
    "repair": [{}, {"tiberium": 2, "RepairBase": 31}, {"tiberium": 4, "RepairBase": 38}, {
        "tiberium": 5,
        "RepairBase": 47
    }, {"tiberium": 10, "RepairBase": 59}, {"tiberium": 36, "RepairBase": 73}, {
        "tiberium": 198,
        "RepairBase": 90
    }, {"tiberium": 432, "RepairBase": 111}, {"tiberium": 660, "RepairBase": 137}, {
        "tiberium": 832,
        "RepairBase": 170
    }, {"tiberium": 1056, "RepairBase": 209}, {"tiberium": 1640, "RepairBase": 259}, {
        "tiberium": 2419,
        "RepairBase": 320
    }],
    "modifiers": [{}, {"HeadCountDefense": 20}, {"HeadCountDefense": 30}, {"HeadCountDefense": 40}, {"HeadCountDefense": 50}, {"HeadCountDefense": 60}, {"HeadCountDefense": 70}, {"HeadCountDefense": 80}, {"HeadCountDefense": 90}, {"HeadCountDefense": 100}, {"HeadCountDefense": 110}, {"HeadCountDefense": 120}, {"HeadCountDefense": 130}]
}, {
    "id": 158,
    "speed": 0,
    "display": "Defense Facility",
    "tech": 43,
    "name": "NOD_Defense Facility",
    "faction": "NOD",
    "health": 2500,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 3}, {"tiberium": 5}, {"tiberium": 6, "power": 2}, {
        "tiberium": 12,
        "power": 3
    }, {"tiberium": 55, "power": 14}, {"tiberium": 330, "power": 83}, {
        "tiberium": 1080,
        "power": 270
    }, {"tiberium": 3300, "power": 825}, {"tiberium": 9600, "power": 2400}, {
        "tiberium": 26400,
        "power": 6600
    }, {"tiberium": 67200, "power": 16800}, {"tiberium": 144000, "power": 36000}],
    "repair": [{}, {"tiberium": 2, "RepairBase": 31}, {"tiberium": 2, "RepairBase": 38}, {
        "tiberium": 3,
        "RepairBase": 47
    }, {"tiberium": 6, "RepairBase": 59}, {"tiberium": 25, "RepairBase": 73}, {
        "tiberium": 148,
        "RepairBase": 90
    }, {"tiberium": 324, "RepairBase": 111}, {"tiberium": 495, "RepairBase": 137}, {
        "tiberium": 624,
        "RepairBase": 170
    }, {"tiberium": 792, "RepairBase": 209}, {"tiberium": 1230, "RepairBase": 259}, {
        "tiberium": 1814,
        "RepairBase": 320
    }],
    "modifiers": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
}, {
    "id": 159,
    "speed": 0,
    "display": "Command Center",
    "tech": 30,
    "name": "NOD_Command Post",
    "faction": "NOD",
    "health": 3000,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 5}, {"tiberium": 8}, {"tiberium": 10, "power": 2}, {
        "tiberium": 20,
        "power": 4
    }, {"tiberium": 80, "power": 20}, {"tiberium": 440, "power": 110}, {
        "tiberium": 1440,
        "power": 360
    }, {"tiberium": 4400, "power": 1100}, {"tiberium": 12800, "power": 3200}, {
        "tiberium": 35200,
        "power": 8800
    }, {"tiberium": 89600, "power": 22400}, {"tiberium": 192000, "power": 48000}],
    "repair": [{}, {"tiberium": 2, "RepairBase": 31}, {"tiberium": 4, "RepairBase": 38}, {
        "tiberium": 5,
        "RepairBase": 47
    }, {"tiberium": 10, "RepairBase": 59}, {"tiberium": 36, "RepairBase": 73}, {
        "tiberium": 198,
        "RepairBase": 90
    }, {"tiberium": 432, "RepairBase": 111}, {"tiberium": 660, "RepairBase": 137}, {
        "tiberium": 832,
        "RepairBase": 170
    }, {"tiberium": 1056, "RepairBase": 209}, {"tiberium": 1640, "RepairBase": 259}, {
        "tiberium": 2419,
        "RepairBase": 320
    }],
    "modifiers": [{}, {"HeadCountArmy": 10}, {"HeadCountArmy": 15}, {"HeadCountArmy": 20}, {"HeadCountArmy": 25}, {"HeadCountArmy": 30}, {"HeadCountArmy": 35}, {"HeadCountArmy": 40}, {"HeadCountArmy": 45}, {"HeadCountArmy": 50}, {"HeadCountArmy": 60}, {"HeadCountArmy": 70}, {"HeadCountArmy": 80}]
}, {
    "id": 160,
    "speed": 40,
    "display": "Black Hand",
    "tech": 112,
    "name": "NOD_Def_Black Hand",
    "faction": "NOD",
    "health": 1100,
    "movement": "Feet",
    "resources": [{}, {"crystal": 1, "power": 0}, {"crystal": 2, "power": 0}, {"crystal": 3, "power": 1}, {
        "crystal": 6,
        "power": 2
    }, {"crystal": 40, "power": 10}, {"crystal": 160, "power": 40}, {"crystal": 500, "power": 125}, {
        "crystal": 1600,
        "power": 400
    }, {"crystal": 4200, "power": 1050}, {"crystal": 12000, "power": 3000}, {
        "crystal": 30000,
        "power": 7500
    }, {"crystal": 64000, "power": 16000}],
    "repair": [{}, {"crystal": 1, "ResearchPoints": 60}, {"crystal": 1, "ResearchPoints": 130}, {
        "crystal": 2,
        "ResearchPoints": 230
    }, {"crystal": 3, "ResearchPoints": 320}, {"crystal": 18, "ResearchPoints": 520}, {
        "crystal": 72,
        "ResearchPoints": 880
    }, {"crystal": 150, "ResearchPoints": 1300}, {"crystal": 240, "ResearchPoints": 1700}, {
        "crystal": 273,
        "ResearchPoints": 2200
    }, {"crystal": 360, "ResearchPoints": 2850}, {"crystal": 549, "ResearchPoints": 3800}, {
        "crystal": 806,
        "ResearchPoints": 4200
    }],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 60,
        "id": 201,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 450,
        "id": 202,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "MediumArmorAir",
        "damage": 90,
        "id": 203,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 60,
        "id": 480,
        "type": 7,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 450,
        "id": 481,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 161,
    "speed": 40,
    "display": "Confessor",
    "tech": 110,
    "name": "NOD_Def_Confessor",
    "faction": "NOD",
    "health": 700,
    "movement": "Feet",
    "resources": [{}, {"crystal": 1}, {"crystal": 2}, {"crystal": 3, "power": 1}, {
        "crystal": 6,
        "power": 2
    }, {"crystal": 40, "power": 10}, {"crystal": 160, "power": 40}, {"crystal": 500, "power": 125}, {
        "crystal": 1600,
        "power": 400
    }, {"crystal": 4200, "power": 1050}, {"crystal": 12000, "power": 3000}, {
        "crystal": 30000,
        "power": 7500
    }, {"crystal": 64000, "power": 16000}],
    "repair": [{}, {"crystal": 1, "ResearchPoints": 60}, {"crystal": 1, "ResearchPoints": 130}, {
        "crystal": 2,
        "ResearchPoints": 230
    }, {"crystal": 3, "ResearchPoints": 320}, {"crystal": 18, "ResearchPoints": 520}, {
        "crystal": 72,
        "ResearchPoints": 880
    }, {"crystal": 150, "ResearchPoints": 1300}, {"crystal": 240, "ResearchPoints": 1700}, {
        "crystal": 273,
        "ResearchPoints": 2200
    }, {"crystal": 360, "ResearchPoints": 2850}, {"crystal": 549, "ResearchPoints": 3800}, {
        "crystal": 806,
        "ResearchPoints": 4200
    }],
    "weapons": [{
        "range": {"min": 0, "max": 350},
        "armorType": "LightArmorInfantry",
        "damage": 155,
        "id": 204,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 350},
        "armorType": "HeavyArmorVehicles",
        "damage": 25,
        "id": 205,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 350},
        "armorType": "MediumArmorAir",
        "damage": 20,
        "id": 206,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 499, "type": 9, "health": 840}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 162,
    "speed": 40,
    "display": "Militant Rocket Squad",
    "tech": 104,
    "name": "NOD_Def_Militant Rocket Soldiers",
    "faction": "NOD",
    "health": 600,
    "movement": "Feet",
    "resources": [{}, {"crystal": 1}, {"crystal": 2}, {"crystal": 3, "power": 1}, {
        "crystal": 4,
        "power": 1
    }, {"crystal": 28, "power": 7}, {"crystal": 112, "power": 28}, {"crystal": 350, "power": 88}, {
        "crystal": 1120,
        "power": 280
    }, {"crystal": 2940, "power": 735}, {"crystal": 8400, "power": 2100}, {
        "crystal": 21000,
        "power": 5250
    }, {"crystal": 44800, "power": 11200}],
    "repair": [{}, {"crystal": 1, "ResearchPoints": 30}, {"crystal": 1, "ResearchPoints": 65}, {
        "crystal": 2,
        "ResearchPoints": 115
    }, {"crystal": 2, "ResearchPoints": 160}, {"crystal": 13, "ResearchPoints": 260}, {
        "crystal": 50,
        "ResearchPoints": 440
    }, {"crystal": 105, "ResearchPoints": 650}, {"crystal": 168, "ResearchPoints": 850}, {
        "crystal": 191,
        "ResearchPoints": 1100
    }, {"crystal": 252, "ResearchPoints": 1425}, {"crystal": 384, "ResearchPoints": 1900}, {
        "crystal": 564,
        "ResearchPoints": 2100
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 30,
        "id": 207,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 60,
        "id": 208,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 180,
        "id": 209,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 501, "type": 9, "health": 720}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 163,
    "speed": 60,
    "display": "Scorpion",
    "tech": 103,
    "name": "NOD_Def_Scorpion Tank",
    "faction": "NOD",
    "health": 950,
    "movement": "Track",
    "resources": [{}, {"crystal": 1}, {"crystal": 2}, {"crystal": 3, "power": 1}, {
        "crystal": 5,
        "power": 1
    }, {"crystal": 36, "power": 9}, {"crystal": 144, "power": 36}, {"crystal": 450, "power": 113}, {
        "crystal": 1440,
        "power": 360
    }, {"crystal": 3780, "power": 945}, {"crystal": 10800, "power": 2700}, {
        "crystal": 27000,
        "power": 6750
    }, {"crystal": 57600, "power": 14400}],
    "repair": [{}, {"crystal": 1, "ResearchPoints": 60}, {"crystal": 1, "ResearchPoints": 130}, {
        "crystal": 2,
        "ResearchPoints": 230
    }, {"crystal": 3, "ResearchPoints": 320}, {"crystal": 16, "ResearchPoints": 520}, {
        "crystal": 65,
        "ResearchPoints": 880
    }, {"crystal": 135, "ResearchPoints": 1300}, {"crystal": 216, "ResearchPoints": 1700}, {
        "crystal": 246,
        "ResearchPoints": 2200
    }, {"crystal": 324, "ResearchPoints": 2850}, {"crystal": 494, "ResearchPoints": 3800}, {
        "crystal": 726,
        "ResearchPoints": 4200
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 90,
        "id": 210,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 220,
        "id": 211,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 80,
        "id": 212,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 108,
        "id": 508,
        "type": 7,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 264,
        "id": 509,
        "type": 7,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 96,
        "id": 510,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 164,
    "speed": 60,
    "display": "Reckoner",
    "tech": 106,
    "name": "NOD_Def_Reckoner",
    "faction": "NOD",
    "health": 1200,
    "movement": "Track",
    "resources": [{}, {"crystal": 1}, {"crystal": 2}, {"crystal": 3, "power": 1}, {
        "crystal": 5,
        "power": 1
    }, {"crystal": 32, "power": 8}, {"crystal": 128, "power": 32}, {"crystal": 400, "power": 100}, {
        "crystal": 1280,
        "power": 320
    }, {"crystal": 3360, "power": 840}, {"crystal": 9600, "power": 2400}, {
        "crystal": 24000,
        "power": 6000
    }, {"crystal": 51200, "power": 12800}],
    "repair": [{}, {"crystal": 1, "ResearchPoints": 60}, {"crystal": 1, "ResearchPoints": 130}, {
        "crystal": 1,
        "ResearchPoints": 230
    }, {"crystal": 2, "ResearchPoints": 320}, {"crystal": 14, "ResearchPoints": 520}, {
        "crystal": 58,
        "ResearchPoints": 880
    }, {"crystal": 120, "ResearchPoints": 1300}, {"crystal": 192, "ResearchPoints": 1700}, {
        "crystal": 218,
        "ResearchPoints": 2200
    }, {"crystal": 288, "ResearchPoints": 2850}, {"crystal": 439, "ResearchPoints": 3800}, {
        "crystal": 645,
        "ResearchPoints": 4200
    }],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 270,
        "id": 213,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 100,
        "id": 214,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "MediumArmorAir",
        "damage": 65,
        "id": 215,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 50,
        "id": 216,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 50,
        "id": 217,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 0},
        "armorType": "LightArmorInfantry",
        "damage": 0,
        "id": 424,
        "type": 8,
        "health": 10
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 165,
    "speed": 80,
    "display": "Attack Bike",
    "tech": 108,
    "name": "NOD_Def_Attack Bike",
    "faction": "NOD",
    "health": 800,
    "movement": "Wheel",
    "resources": [{}, {"crystal": 1}, {"crystal": 2}, {"crystal": 3}, {"crystal": 4, "power": 1}, {
        "crystal": 16,
        "power": 4
    }, {"crystal": 64, "power": 16}, {"crystal": 200, "power": 50}, {"crystal": 640, "power": 160}, {
        "crystal": 1680,
        "power": 420
    }, {"crystal": 4800, "power": 1200}, {"crystal": 12000, "power": 3000}, {"crystal": 25600, "power": 6400}],
    "repair": [{}, {"crystal": 1, "ResearchPoints": 30}, {"crystal": 1, "ResearchPoints": 65}, {
        "crystal": 2,
        "ResearchPoints": 115
    }, {"crystal": 2, "ResearchPoints": 160}, {"crystal": 7, "ResearchPoints": 260}, {
        "crystal": 29,
        "ResearchPoints": 440
    }, {"crystal": 60, "ResearchPoints": 650}, {"crystal": 96, "ResearchPoints": 850}, {
        "crystal": 109,
        "ResearchPoints": 1100
    }, {"crystal": 144, "ResearchPoints": 1425}, {"crystal": 220, "ResearchPoints": 1900}, {
        "crystal": 323,
        "ResearchPoints": 2100
    }],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 70,
        "id": 218,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 110,
        "id": 219,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "MediumArmorAir",
        "damage": 250,
        "id": 220,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 472, "type": 5, "health": 230}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 166,
    "speed": 0,
    "display": "Beam Cannon",
    "tech": 107,
    "name": "NOD_Def_Cannon",
    "faction": "NOD",
    "health": 1000,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 1}, {"tiberium": 3}, {"tiberium": 5, "power": 1}, {
        "tiberium": 8,
        "power": 2
    }, {"tiberium": 54, "power": 14}, {"tiberium": 216, "power": 54}, {
        "tiberium": 675,
        "power": 169
    }, {"tiberium": 2160, "power": 540}, {"tiberium": 5670, "power": 1418}, {
        "tiberium": 16200,
        "power": 4050
    }, {"tiberium": 40500, "power": 10125}, {"tiberium": 86400, "power": 21600}],
    "repair": [{}, {"tiberium": 1, "ResearchPoints": 90}, {"tiberium": 2, "ResearchPoints": 195}, {
        "tiberium": 3,
        "ResearchPoints": 345
    }, {"tiberium": 6, "ResearchPoints": 480}, {"tiberium": 36, "ResearchPoints": 780}, {
        "tiberium": 146,
        "ResearchPoints": 1320
    }, {"tiberium": 304, "ResearchPoints": 1950}, {"tiberium": 486, "ResearchPoints": 2550}, {
        "tiberium": 553,
        "ResearchPoints": 3300
    }, {"tiberium": 729, "ResearchPoints": 4275}, {"tiberium": 1112, "ResearchPoints": 5700}, {
        "tiberium": 1633,
        "ResearchPoints": 6300
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 120,
        "id": 221,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 410,
        "id": 222,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 331, "type": 2, "health": 0}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 167,
    "speed": 0,
    "display": "Shredder MG",
    "tech": 119,
    "name": "NOD_Def_MG Nest",
    "faction": "NOD",
    "health": 850,
    "movement": "Structure",
    "resources": [{}, {"crystal": 1}, {"crystal": 2}, {"crystal": 3, "power": 1}, {
        "crystal": 6,
        "power": 2
    }, {"crystal": 40, "power": 10}, {"crystal": 160, "power": 40}, {"crystal": 500, "power": 125}, {
        "crystal": 1600,
        "power": 400
    }, {"crystal": 4200, "power": 1050}, {"crystal": 12000, "power": 3000}, {
        "crystal": 30000,
        "power": 7500
    }, {"crystal": 64000, "power": 16000}],
    "repair": [{}, {"crystal": 1, "ResearchPoints": 60}, {"crystal": 1, "ResearchPoints": 130}, {
        "crystal": 2,
        "ResearchPoints": 230
    }, {"crystal": 3, "ResearchPoints": 320}, {"crystal": 18, "ResearchPoints": 520}, {
        "crystal": 72,
        "ResearchPoints": 880
    }, {"crystal": 150, "ResearchPoints": 1300}, {"crystal": 240, "ResearchPoints": 1700}, {
        "crystal": 273,
        "ResearchPoints": 2200
    }, {"crystal": 360, "ResearchPoints": 2850}, {"crystal": 549, "ResearchPoints": 3800}, {
        "crystal": 806,
        "ResearchPoints": 4200
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 230,
        "id": 226,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 84,
        "id": 227,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 95,
        "id": 228,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 252,
        "id": 511,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 168,
    "speed": 0,
    "display": "Flak",
    "tech": 111,
    "name": "NOD_Def_Flak",
    "faction": "NOD",
    "health": 1250,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 1}, {"tiberium": 2}, {"tiberium": 3, "power": 1}, {
        "tiberium": 6,
        "power": 2
    }, {"tiberium": 40, "power": 10}, {"tiberium": 160, "power": 40}, {
        "tiberium": 500,
        "power": 125
    }, {"tiberium": 1600, "power": 400}, {"tiberium": 4200, "power": 1050}, {
        "tiberium": 12000,
        "power": 3000
    }, {"tiberium": 30000, "power": 7500}, {"tiberium": 64000, "power": 16000}],
    "repair": [{}, {"tiberium": 1, "ResearchPoints": 60}, {"tiberium": 2, "ResearchPoints": 130}, {
        "tiberium": 3,
        "ResearchPoints": 230
    }, {"tiberium": 5, "ResearchPoints": 320}, {"tiberium": 27, "ResearchPoints": 520}, {
        "tiberium": 108,
        "ResearchPoints": 880
    }, {"tiberium": 225, "ResearchPoints": 1300}, {"tiberium": 360, "ResearchPoints": 1700}, {
        "tiberium": 410,
        "ResearchPoints": 2200
    }, {"tiberium": 540, "ResearchPoints": 2850}, {"tiberium": 824, "ResearchPoints": 3800}, {
        "tiberium": 1210,
        "ResearchPoints": 4200
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 360,
        "id": 233,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 0},
        "armorType": "LightArmorInfantry",
        "damage": 0,
        "id": 468,
        "type": 8,
        "health": 10
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 169,
    "speed": 0,
    "display": "Laser fence",
    "tech": 109,
    "name": "NOD_Def_Barbwire",
    "faction": "NOD",
    "health": 750,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 1}, {"tiberium": 2}, {"tiberium": 3}, {"tiberium": 4}, {
        "tiberium": 8,
        "power": 2
    }, {"tiberium": 34, "power": 8}, {"tiberium": 105, "power": 26}, {"tiberium": 336, "power": 84}, {
        "tiberium": 882,
        "power": 221
    }, {"tiberium": 2520, "power": 630}, {"tiberium": 6300, "power": 1575}, {"tiberium": 13440, "power": 3360}],
    "repair": [{}, {"tiberium": 1, "ResearchPoints": 18}, {"tiberium": 1, "ResearchPoints": 39}, {
        "tiberium": 2,
        "ResearchPoints": 69
    }, {"tiberium": 2, "ResearchPoints": 96}, {"tiberium": 6, "ResearchPoints": 156}, {
        "tiberium": 23,
        "ResearchPoints": 264
    }, {"tiberium": 47, "ResearchPoints": 390}, {"tiberium": 76, "ResearchPoints": 510}, {
        "tiberium": 86,
        "ResearchPoints": 660
    }, {"tiberium": 113, "ResearchPoints": 855}, {"tiberium": 173, "ResearchPoints": 1140}, {
        "tiberium": 254,
        "ResearchPoints": 1260
    }],
    "weapons": [{"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 521, "type": 12, "health": 0}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 170,
    "speed": 0,
    "display": "Obelisk Artillery",
    "tech": 114,
    "name": "NOD_Def_Art Tank",
    "faction": "NOD",
    "health": 700,
    "movement": "Structure",
    "resources": [{}, {"crystal": 6}, {"crystal": 12}, {"crystal": 20, "power": 6}, {
        "crystal": 36,
        "power": 9
    }, {"crystal": 240, "power": 60}, {"crystal": 960, "power": 240}, {"crystal": 3000, "power": 750}, {
        "crystal": 9600,
        "power": 2400
    }, {"crystal": 25200, "power": 6300}, {"crystal": 72000, "power": 18000}, {
        "crystal": 180000,
        "power": 45000
    }, {"crystal": 384000, "power": 96000}],
    "repair": [{}, {"crystal": 3, "ResearchPoints": 180}, {"crystal": 6, "ResearchPoints": 390}, {
        "crystal": 10,
        "ResearchPoints": 690
    }, {"crystal": 18, "ResearchPoints": 960}, {"crystal": 108, "ResearchPoints": 1560}, {
        "crystal": 432,
        "ResearchPoints": 2640
    }, {"crystal": 900, "ResearchPoints": 3900}, {"crystal": 1440, "ResearchPoints": 5100}, {
        "crystal": 1638,
        "ResearchPoints": 6600
    }, {"crystal": 2160, "ResearchPoints": 8550}, {"crystal": 3294, "ResearchPoints": 11400}, {
        "crystal": 4838,
        "ResearchPoints": 12600
    }],
    "weapons": [{
        "range": {"min": 350, "max": 550},
        "armorType": "LightArmorInfantry",
        "damage": 10,
        "id": 251,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 350, "max": 550},
        "armorType": "HeavyArmorVehicles",
        "damage": 120,
        "id": 252,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 300, "max": 550},
        "armorType": "LightArmorInfantry",
        "damage": 10,
        "id": 345,
        "type": 7,
        "health": 0
    }, {
        "range": {"min": 300, "max": 550},
        "armorType": "HeavyArmorVehicles",
        "damage": 120,
        "id": 346,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 171,
    "speed": 0,
    "display": "Gatling Cannon",
    "tech": 113,
    "name": "NOD_Def_Art Inf",
    "faction": "NOD",
    "health": 600,
    "movement": "Structure",
    "resources": [{}, {"crystal": 5}, {"crystal": 10}, {"crystal": 16, "power": 5}, {
        "crystal": 29,
        "power": 7
    }, {"crystal": 192, "power": 48}, {"crystal": 768, "power": 192}, {"crystal": 2400, "power": 600}, {
        "crystal": 7680,
        "power": 1920
    }, {"crystal": 20160, "power": 5040}, {"crystal": 57600, "power": 14400}, {
        "crystal": 144000,
        "power": 36000
    }, {"crystal": 307200, "power": 76800}],
    "repair": [{}, {"crystal": 2, "ResearchPoints": 180}, {"crystal": 5, "ResearchPoints": 390}, {
        "crystal": 8,
        "ResearchPoints": 690
    }, {"crystal": 14, "ResearchPoints": 960}, {"crystal": 86, "ResearchPoints": 1560}, {
        "crystal": 346,
        "ResearchPoints": 2640
    }, {"crystal": 720, "ResearchPoints": 3900}, {"crystal": 1152, "ResearchPoints": 5100}, {
        "crystal": 1310,
        "ResearchPoints": 6600
    }, {"crystal": 1728, "ResearchPoints": 8550}, {"crystal": 2635, "ResearchPoints": 11400}, {
        "crystal": 3871,
        "ResearchPoints": 12600
    }],
    "weapons": [{
        "range": {"min": 350, "max": 550},
        "armorType": "LightArmorInfantry",
        "damage": 100,
        "id": 253,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 350, "max": 550},
        "armorType": "HeavyArmorVehicles",
        "damage": 15,
        "id": 254,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 350, "max": 550},
        "armorType": "MediumArmorAir",
        "damage": 25,
        "id": 311,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 300, "max": 550},
        "armorType": "LightArmorInfantry",
        "damage": 100,
        "id": 342,
        "type": 7,
        "health": 0
    }, {
        "range": {"min": 300, "max": 550},
        "armorType": "HeavyArmorVehicles",
        "damage": 15,
        "id": 343,
        "type": 7,
        "health": 0
    }, {
        "range": {"min": 300, "max": 550},
        "armorType": "MediumArmorAir",
        "damage": 25,
        "id": 344,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 172,
    "speed": 0,
    "display": "SAM Site",
    "tech": 115,
    "name": "NOD_Def_Art Air",
    "faction": "NOD",
    "health": 650,
    "movement": "Structure",
    "resources": [{}, {"crystal": 5}, {"crystal": 11}, {"crystal": 18, "power": 5}, {
        "crystal": 32,
        "power": 8
    }, {"crystal": 216, "power": 54}, {"crystal": 864, "power": 216}, {"crystal": 2700, "power": 675}, {
        "crystal": 8640,
        "power": 2160
    }, {"crystal": 22680, "power": 5670}, {"crystal": 64800, "power": 16200}, {
        "crystal": 162000,
        "power": 40500
    }, {"crystal": 345600, "power": 86400}],
    "repair": [{}, {"crystal": 3, "ResearchPoints": 180}, {"crystal": 5, "ResearchPoints": 390}, {
        "crystal": 9,
        "ResearchPoints": 690
    }, {"crystal": 16, "ResearchPoints": 960}, {"crystal": 97, "ResearchPoints": 1560}, {
        "crystal": 389,
        "ResearchPoints": 2640
    }, {"crystal": 810, "ResearchPoints": 3900}, {"crystal": 1296, "ResearchPoints": 5100}, {
        "crystal": 1474,
        "ResearchPoints": 6600
    }, {"crystal": 1944, "ResearchPoints": 8550}, {"crystal": 2965, "ResearchPoints": 11400}, {
        "crystal": 4355,
        "ResearchPoints": 12600
    }],
    "weapons": [{
        "range": {"min": 350, "max": 550},
        "armorType": "MediumArmorAir",
        "damage": 150,
        "id": 255,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 300, "max": 550},
        "armorType": "MediumArmorAir",
        "damage": 150,
        "id": 341,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}, {}]
}, {
    "id": 173,
    "speed": 0,
    "display": "Anti-tank barrier",
    "tech": 105,
    "name": "NOD_Def_Antitank Barrier",
    "faction": "NOD",
    "health": 1000,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 1}, {"tiberium": 2}, {"tiberium": 3}, {"tiberium": 4}, {
        "tiberium": 11,
        "power": 3
    }, {"tiberium": 43, "power": 11}, {"tiberium": 135, "power": 34}, {
        "tiberium": 432,
        "power": 108
    }, {"tiberium": 1134, "power": 284}, {"tiberium": 3240, "power": 810}, {
        "tiberium": 8100,
        "power": 2025
    }, {"tiberium": 17280, "power": 4320}],
    "repair": [{}, {"tiberium": 1, "ResearchPoints": 18}, {"tiberium": 1, "ResearchPoints": 39}, {
        "tiberium": 2,
        "ResearchPoints": 69
    }, {"tiberium": 2, "ResearchPoints": 96}, {"tiberium": 7, "ResearchPoints": 156}, {
        "tiberium": 29,
        "ResearchPoints": 264
    }, {"tiberium": 61, "ResearchPoints": 390}, {"tiberium": 97, "ResearchPoints": 510}, {
        "tiberium": 111,
        "ResearchPoints": 660
    }, {"tiberium": 146, "ResearchPoints": 855}, {"tiberium": 222, "ResearchPoints": 1140}, {
        "tiberium": 327,
        "ResearchPoints": 1260
    }],
    "weapons": [{"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 520, "type": 12, "health": 0}],
    "modifiers": [{}, {}, {}]
}, {
    "id": 174,
    "speed": 0,
    "display": "Wall",
    "tech": -1,
    "name": "NOD_Def_Wall",
    "faction": "NOD",
    "health": 2000,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 1}, {"tiberium": 2}, {"tiberium": 3}, {"tiberium": 4}, {
        "tiberium": 12,
        "power": 3
    }, {"tiberium": 48, "power": 12}, {"tiberium": 150, "power": 38}, {
        "tiberium": 480,
        "power": 120
    }, {"tiberium": 1260, "power": 315}, {"tiberium": 3600, "power": 900}, {
        "tiberium": 9000,
        "power": 2250
    }, {"tiberium": 19200, "power": 4800}],
    "repair": [{}, {"tiberium": 1, "ResearchPoints": 18}, {"tiberium": 1, "ResearchPoints": 39}, {
        "tiberium": 2,
        "ResearchPoints": 69
    }, {"tiberium": 2, "ResearchPoints": 96}, {"tiberium": 8, "ResearchPoints": 156}, {
        "tiberium": 32,
        "ResearchPoints": 264
    }, {"tiberium": 68, "ResearchPoints": 390}, {"tiberium": 108, "ResearchPoints": 510}, {
        "tiberium": 123,
        "ResearchPoints": 660
    }, {"tiberium": 162, "ResearchPoints": 855}, {"tiberium": 247, "ResearchPoints": 1140}, {
        "tiberium": 363,
        "ResearchPoints": 1260
    }]
}, {
    "id": 175,
    "speed": 0,
    "display": "Harvester",
    "tech": 56,
    "name": "GDI_Harvester_Crystal",
    "faction": "GDI",
    "health": 1500,
    "movement": "Structure",
    "resources": [{}],
    "repair": [{}],
    "modifiers": [{}]
}, {
    "id": 176,
    "speed": 0,
    "display": "Harvester",
    "tech": 57,
    "name": "NOD_Harvester_Crystal",
    "faction": "NOD",
    "health": 1500,
    "movement": "Structure",
    "resources": [{}],
    "repair": [{}],
    "modifiers": [{}]
}, {
    "id": 177,
    "speed": 0,
    "display": "Construction Yard",
    "tech": 58,
    "name": "FOR_Construction Yard",
    "faction": "FOR",
    "health": 5500,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"tiberium": 10, "RepairBase": 196}, {"tiberium": 20, "RepairBase": 242}, {
        "tiberium": 45,
        "RepairBase": 299
    }, {"tiberium": 75, "RepairBase": 370}, {"tiberium": 130, "RepairBase": 457}, {
        "tiberium": 235,
        "RepairBase": 564
    }, {"tiberium": 375, "RepairBase": 696}, {"tiberium": 525, "RepairBase": 860}, {
        "tiberium": 850,
        "RepairBase": 1062
    }, {"tiberium": 1050, "RepairBase": 1311}, {"tiberium": 1300, "RepairBase": 1619}, {
        "tiberium": 1600,
        "RepairBase": 2000
    }],
    "modifiers": [{}, {
        "TiberiumStorage": 1000000000,
        "CrystalStorage": 1000000000,
        "BuildingSlots": 30,
        "PowerStorage": 100000,
        "HeadCountDefense": 400
    }]
}, {
    "id": 178,
    "speed": 0,
    "display": "Buster",
    "tech": -1,
    "name": "FOR_Turret_VS_Veh",
    "faction": "FOR",
    "health": 1150,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"tiberium": 1, "ResearchPoints": 45}, {"tiberium": 2, "ResearchPoints": 105}, {
        "tiberium": 4,
        "ResearchPoints": 180
    }, {"tiberium": 7, "ResearchPoints": 330}, {"tiberium": 41, "ResearchPoints": 510}, {
        "tiberium": 162,
        "ResearchPoints": 780
    }, {"tiberium": 338, "ResearchPoints": 990}, {"tiberium": 540, "ResearchPoints": 1260}, {
        "tiberium": 614,
        "ResearchPoints": 1560
    }, {"tiberium": 810, "ResearchPoints": 1980}, {"tiberium": 1235, "ResearchPoints": 2490}, {
        "tiberium": 1814,
        "ResearchPoints": 3120
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 50,
        "id": 261,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 380,
        "id": 262,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 179,
    "speed": 0,
    "display": "MG Nest",
    "tech": -1,
    "name": "FOR_Turret_VS_Inf",
    "faction": "FOR",
    "health": 900,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"tiberium": 1, "ResearchPoints": 0}, {"tiberium": 1, "ResearchPoints": 0}, {
        "tiberium": 2,
        "ResearchPoints": 120
    }, {"tiberium": 3, "ResearchPoints": 220}, {"tiberium": 18, "ResearchPoints": 340}, {
        "tiberium": 72,
        "ResearchPoints": 540
    }, {"tiberium": 150, "ResearchPoints": 660}, {"tiberium": 240, "ResearchPoints": 840}, {
        "tiberium": 273,
        "ResearchPoints": 1040
    }, {"tiberium": 360, "ResearchPoints": 1320}, {"tiberium": 549, "ResearchPoints": 1660}, {
        "tiberium": 806,
        "ResearchPoints": 2080
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 220,
        "id": 263,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 100,
        "id": 264,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 60,
        "id": 265,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 180,
    "speed": 0,
    "display": "Flak",
    "tech": -1,
    "name": "FOR_Turret_VS_Air",
    "faction": "FOR",
    "health": 800,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"tiberium": 1, "ResearchPoints": 30}, {"tiberium": 2, "ResearchPoints": 70}, {
        "tiberium": 3,
        "ResearchPoints": 120
    }, {"tiberium": 5, "ResearchPoints": 220}, {"tiberium": 27, "ResearchPoints": 340}, {
        "tiberium": 108,
        "ResearchPoints": 520
    }, {"tiberium": 225, "ResearchPoints": 660}, {"tiberium": 360, "ResearchPoints": 840}, {
        "tiberium": 410,
        "ResearchPoints": 1040
    }, {"tiberium": 540, "ResearchPoints": 1320}, {"tiberium": 824, "ResearchPoints": 1660}, {
        "tiberium": 1210,
        "ResearchPoints": 2080
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 400,
        "id": 268,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 181,
    "speed": 0,
    "display": "Demolisher Artillery",
    "tech": -1,
    "name": "FOR_Turret_VS_Veh_ranged",
    "faction": "FOR",
    "health": 600,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 2, "ResearchPoints": 60}, {"crystal": 4, "ResearchPoints": 140}, {
        "crystal": 7,
        "ResearchPoints": 240
    }, {"crystal": 12, "ResearchPoints": 440}, {"crystal": 72, "ResearchPoints": 680}, {
        "crystal": 288,
        "ResearchPoints": 1040
    }, {"crystal": 600, "ResearchPoints": 1320}, {"crystal": 960, "ResearchPoints": 1680}, {
        "crystal": 1092,
        "ResearchPoints": 2080
    }, {"crystal": 1440, "ResearchPoints": 2640}, {"crystal": 2196, "ResearchPoints": 3320}, {
        "crystal": 3226,
        "ResearchPoints": 4160
    }],
    "weapons": [{
        "range": {"min": 350, "max": 550},
        "armorType": "LightArmorInfantry",
        "damage": 10,
        "id": 270,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 350, "max": 550},
        "armorType": "HeavyArmorVehicles",
        "damage": 130,
        "id": 271,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 182,
    "speed": 0,
    "display": "Reaper Artillery",
    "tech": -1,
    "name": "FOR_Turret_VS_Inf_ranged",
    "faction": "FOR",
    "health": 500,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 2, "ResearchPoints": 60}, {"crystal": 3, "ResearchPoints": 140}, {
        "crystal": 5,
        "ResearchPoints": 240
    }, {"crystal": 10, "ResearchPoints": 440}, {"crystal": 58, "ResearchPoints": 680}, {
        "crystal": 230,
        "ResearchPoints": 1040
    }, {"crystal": 480, "ResearchPoints": 1320}, {"crystal": 768, "ResearchPoints": 1680}, {
        "crystal": 874,
        "ResearchPoints": 2080
    }, {"crystal": 1152, "ResearchPoints": 2640}, {"crystal": 1757, "ResearchPoints": 3320}, {
        "crystal": 2580,
        "ResearchPoints": 4160
    }],
    "weapons": [{
        "range": {"min": 350, "max": 550},
        "armorType": "LightArmorInfantry",
        "damage": 90,
        "id": 272,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 350, "max": 550},
        "armorType": "HeavyArmorVehicles",
        "damage": 25,
        "id": 273,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 350, "max": 550},
        "armorType": "MediumArmorAir",
        "damage": 15,
        "id": 274,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 183,
    "speed": 0,
    "display": "SAM site",
    "tech": -1,
    "name": "FOR_Turret_VS_Air_ranged",
    "faction": "FOR",
    "health": 500,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 2, "ResearchPoints": 60}, {"crystal": 4, "ResearchPoints": 140}, {
        "crystal": 6,
        "ResearchPoints": 240
    }, {"crystal": 11, "ResearchPoints": 440}, {"crystal": 65, "ResearchPoints": 680}, {
        "crystal": 259,
        "ResearchPoints": 1040
    }, {"crystal": 540, "ResearchPoints": 1320}, {"crystal": 864, "ResearchPoints": 1680}, {
        "crystal": 983,
        "ResearchPoints": 2080
    }, {"crystal": 1296, "ResearchPoints": 2640}, {"crystal": 1976, "ResearchPoints": 3320}, {
        "crystal": 2903,
        "ResearchPoints": 4160
    }],
    "weapons": [{
        "range": {"min": 350, "max": 550},
        "armorType": "MediumArmorAir",
        "damage": 160,
        "id": 275,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 184,
    "speed": 40,
    "display": "Rocket Fist",
    "tech": -1,
    "name": "FOR_Inf_VS_Veh",
    "faction": "FOR",
    "health": 1100,
    "movement": "Feet",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 2, "ResearchPoints": 30}, {"crystal": 2, "ResearchPoints": 70}, {
        "crystal": 3,
        "ResearchPoints": 120
    }, {"crystal": 4, "ResearchPoints": 220}, {"crystal": 18, "ResearchPoints": 340}, {
        "crystal": 72,
        "ResearchPoints": 520
    }, {"crystal": 150, "ResearchPoints": 660}, {"crystal": 240, "ResearchPoints": 840}, {
        "crystal": 273,
        "ResearchPoints": 1040
    }, {"crystal": 360, "ResearchPoints": 1320}, {"crystal": 549, "ResearchPoints": 1660}, {
        "crystal": 806,
        "ResearchPoints": 2080
    }],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 80,
        "id": 276,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 320,
        "id": 277,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "MediumArmorAir",
        "damage": 60,
        "id": 278,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 185,
    "speed": 40,
    "display": "Forgotten",
    "tech": -1,
    "name": "FOR_Inf_VS_Inf",
    "faction": "FOR",
    "health": 700,
    "movement": "Feet",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 1, "ResearchPoints": 15}, {"crystal": 1, "ResearchPoints": 35}, {
        "crystal": 2,
        "ResearchPoints": 60
    }, {"crystal": 3, "ResearchPoints": 110}, {"crystal": 18, "ResearchPoints": 170}, {
        "crystal": 72,
        "ResearchPoints": 260
    }, {"crystal": 150, "ResearchPoints": 330}, {"crystal": 240, "ResearchPoints": 420}, {
        "crystal": 273,
        "ResearchPoints": 520
    }, {"crystal": 360, "ResearchPoints": 660}, {"crystal": 549, "ResearchPoints": 830}, {
        "crystal": 806,
        "ResearchPoints": 1040
    }],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 180,
        "id": 280,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 110,
        "id": 281,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "MediumArmorAir",
        "damage": 70,
        "id": 282,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 186,
    "speed": 40,
    "display": "Missile Squad",
    "tech": -1,
    "name": "FOR_Inf_VS_Air",
    "faction": "FOR",
    "health": 700,
    "movement": "Feet",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 1, "ResearchPoints": 15}, {"crystal": 1, "ResearchPoints": 35}, {
        "crystal": 2,
        "ResearchPoints": 60
    }, {"crystal": 2, "ResearchPoints": 110}, {"crystal": 7, "ResearchPoints": 170}, {
        "crystal": 29,
        "ResearchPoints": 260
    }, {"crystal": 60, "ResearchPoints": 330}, {"crystal": 96, "ResearchPoints": 420}, {
        "crystal": 109,
        "ResearchPoints": 520
    }, {"crystal": 144, "ResearchPoints": 660}, {"crystal": 220, "ResearchPoints": 830}, {
        "crystal": 323,
        "ResearchPoints": 1040
    }],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 50,
        "id": 284,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 120,
        "id": 285,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "MediumArmorAir",
        "damage": 200,
        "id": 286,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 187,
    "speed": 60,
    "display": "Scooper",
    "tech": -1,
    "name": "FOR_Veh_VS_Veh",
    "faction": "FOR",
    "health": 900,
    "movement": "Track",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 1, "ResearchPoints": 30}, {"crystal": 1, "ResearchPoints": 70}, {
        "crystal": 2,
        "ResearchPoints": 120
    }, {"crystal": 3, "ResearchPoints": 220}, {"crystal": 20, "ResearchPoints": 340}, {
        "crystal": 79,
        "ResearchPoints": 520
    }, {"crystal": 165, "ResearchPoints": 660}, {"crystal": 264, "ResearchPoints": 840}, {
        "crystal": 300,
        "ResearchPoints": 1040
    }, {"crystal": 396, "ResearchPoints": 1320}, {"crystal": 604, "ResearchPoints": 1660}, {
        "crystal": 887,
        "ResearchPoints": 2080
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 60,
        "id": 288,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 220,
        "id": 289,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 188,
    "speed": 80,
    "display": "Bowler",
    "tech": -1,
    "name": "FOR_Veh_VS_Inf",
    "faction": "FOR",
    "health": 1000,
    "movement": "Wheel",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 1, "ResearchPoints": 30}, {"crystal": 1, "ResearchPoints": 70}, {
        "crystal": 2,
        "ResearchPoints": 120
    }, {"crystal": 2, "ResearchPoints": 220}, {"crystal": 14, "ResearchPoints": 340}, {
        "crystal": 58,
        "ResearchPoints": 520
    }, {"crystal": 120, "ResearchPoints": 660}, {"crystal": 192, "ResearchPoints": 840}, {
        "crystal": 218,
        "ResearchPoints": 1040
    }, {"crystal": 288, "ResearchPoints": 1320}, {"crystal": 439, "ResearchPoints": 1660}, {
        "crystal": 645,
        "ResearchPoints": 2080
    }],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 300,
        "id": 290,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 100,
        "id": 291,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "MediumArmorAir",
        "damage": 60,
        "id": 292,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 189,
    "speed": 80,
    "display": "Scrap Bus",
    "tech": -1,
    "name": "FOR_Veh_VS_Air",
    "faction": "FOR",
    "health": 900,
    "movement": "Wheel",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 1, "ResearchPoints": 30}, {"crystal": 1, "ResearchPoints": 70}, {
        "crystal": 2,
        "ResearchPoints": 120
    }, {"crystal": 4, "ResearchPoints": 220}, {"crystal": 25, "ResearchPoints": 340}, {
        "crystal": 101,
        "ResearchPoints": 520
    }, {"crystal": 210, "ResearchPoints": 660}, {"crystal": 336, "ResearchPoints": 840}, {
        "crystal": 382,
        "ResearchPoints": 1040
    }, {"crystal": 504, "ResearchPoints": 1320}, {"crystal": 769, "ResearchPoints": 1660}, {
        "crystal": 1129,
        "ResearchPoints": 2080
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 60,
        "id": 293,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 80,
        "id": 294,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 220,
        "id": 295,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 190,
    "speed": 0,
    "display": "Barbwire",
    "tech": -1,
    "name": "FOR_Barbwire_VS_Inf",
    "faction": "FOR",
    "health": 1000,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"tiberium": 1, "ResearchPoints": 9}, {"tiberium": 1, "ResearchPoints": 21}, {
        "tiberium": 2,
        "ResearchPoints": 36
    }, {"tiberium": 2, "ResearchPoints": 66}, {"tiberium": 5, "ResearchPoints": 102}, {
        "tiberium": 19,
        "ResearchPoints": 156
    }, {"tiberium": 41, "ResearchPoints": 198}, {"tiberium": 65, "ResearchPoints": 252}, {
        "tiberium": 74,
        "ResearchPoints": 312
    }, {"tiberium": 97, "ResearchPoints": 396}, {"tiberium": 148, "ResearchPoints": 498}, {
        "tiberium": 218,
        "ResearchPoints": 624
    }]
}, {
    "id": 191,
    "speed": 0,
    "display": "Anti-tank barrier",
    "tech": -1,
    "name": "FOR_Barrier_VS_Veh",
    "faction": "FOR",
    "health": 1500,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"tiberium": 1, "ResearchPoints": 9}, {"tiberium": 1, "ResearchPoints": 21}, {
        "tiberium": 2,
        "ResearchPoints": 36
    }, {"tiberium": 2, "ResearchPoints": 66}, {"tiberium": 7, "ResearchPoints": 102}, {
        "tiberium": 29,
        "ResearchPoints": 156
    }, {"tiberium": 61, "ResearchPoints": 198}, {"tiberium": 97, "ResearchPoints": 252}, {
        "tiberium": 111,
        "ResearchPoints": 312
    }, {"tiberium": 146, "ResearchPoints": 396}, {"tiberium": 222, "ResearchPoints": 498}, {
        "tiberium": 327,
        "ResearchPoints": 624
    }]
}, {
    "id": 192,
    "speed": 0,
    "display": "Wall",
    "tech": -1,
    "name": "FOR_Wall",
    "faction": "FOR",
    "health": 2000,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"tiberium": 1, "ResearchPoints": 9}, {"tiberium": 1, "ResearchPoints": 21}, {
        "tiberium": 2,
        "ResearchPoints": 36
    }, {"tiberium": 2, "ResearchPoints": 66}, {"tiberium": 8, "ResearchPoints": 102}, {
        "tiberium": 32,
        "ResearchPoints": 156
    }, {"tiberium": 68, "ResearchPoints": 198}, {"tiberium": 108, "ResearchPoints": 252}, {
        "tiberium": 123,
        "ResearchPoints": 312
    }, {"tiberium": 162, "ResearchPoints": 396}, {"tiberium": 247, "ResearchPoints": 498}, {
        "tiberium": 363,
        "ResearchPoints": 624
    }]
}, {
    "id": 193,
    "speed": 0,
    "display": "Refinery",
    "tech": 72,
    "name": "FOR_Refinery",
    "faction": "FOR",
    "health": 1500,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"credits": 50, "RepairBase": 196}, {"credits": 195, "RepairBase": 242}, {
        "credits": 240,
        "RepairBase": 299
    }, {"credits": 300, "RepairBase": 370}, {"credits": 390, "RepairBase": 457}, {
        "credits": 480,
        "RepairBase": 564
    }, {"credits": 610, "RepairBase": 696}, {"credits": 760, "RepairBase": 860}, {
        "credits": 950,
        "RepairBase": 1062
    }, {"credits": 1220, "RepairBase": 1311}, {"credits": 1525, "RepairBase": 1619}, {
        "credits": 1900,
        "RepairBase": 2000
    }],
    "modifiers": [{}, {}]
}, {
    "id": 194,
    "speed": 0,
    "display": "Silo",
    "tech": 73,
    "name": "FOR_Silo",
    "faction": "FOR",
    "health": 1000,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"tiberium": 35, "crystal": 35, "RepairBase": 196}, {
        "tiberium": 65,
        "crystal": 65,
        "RepairBase": 242
    }, {"tiberium": 140, "crystal": 140, "RepairBase": 299}, {
        "tiberium": 230,
        "crystal": 230,
        "RepairBase": 370
    }, {"tiberium": 450, "crystal": 450, "RepairBase": 457}, {
        "tiberium": 580,
        "crystal": 580,
        "RepairBase": 564
    }, {"tiberium": 730, "crystal": 730, "RepairBase": 696}, {
        "tiberium": 910,
        "crystal": 910,
        "RepairBase": 860
    }, {"tiberium": 1170, "crystal": 1170, "RepairBase": 1062}, {
        "tiberium": 1450,
        "crystal": 1450,
        "RepairBase": 1311
    }, {"tiberium": 1820, "crystal": 1820, "RepairBase": 1619}, {
        "tiberium": 2340,
        "crystal": 2340,
        "RepairBase": 2000
    }],
    "modifiers": [{}, {}]
}, {
    "id": 195,
    "speed": 0,
    "display": "Defense Facility",
    "tech": 74,
    "name": "FOR_Defense Facility",
    "faction": "FOR",
    "health": 2000,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"tiberium": 10, "RepairBase": 196}, {"tiberium": 20, "RepairBase": 242}, {
        "tiberium": 45,
        "RepairBase": 299
    }, {"tiberium": 75, "RepairBase": 370}, {"tiberium": 130, "RepairBase": 457}, {
        "tiberium": 235,
        "RepairBase": 564
    }, {"tiberium": 375, "RepairBase": 696}, {"tiberium": 525, "RepairBase": 860}, {
        "tiberium": 850,
        "RepairBase": 1062
    }, {"tiberium": 1050, "RepairBase": 1311}, {"tiberium": 1300, "RepairBase": 1619}, {
        "tiberium": 1600,
        "RepairBase": 2000
    }],
    "modifiers": [{}, {}]
}, {
    "id": 196,
    "speed": 0,
    "display": "Defense HQ",
    "tech": 75,
    "name": "FOR_Defense HQ",
    "faction": "FOR",
    "health": 2000,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"tiberium": 10, "RepairBase": 196}, {"tiberium": 20, "RepairBase": 242}, {
        "tiberium": 45,
        "RepairBase": 299
    }, {"tiberium": 75, "RepairBase": 370}, {"tiberium": 130, "RepairBase": 457}, {
        "tiberium": 235,
        "RepairBase": 564
    }, {"tiberium": 375, "RepairBase": 696}, {"tiberium": 525, "RepairBase": 860}, {
        "tiberium": 850,
        "RepairBase": 1062
    }, {"tiberium": 1050, "RepairBase": 1311}, {"tiberium": 1300, "RepairBase": 1619}, {
        "tiberium": 1600,
        "RepairBase": 2000
    }],
    "modifiers": [{}, {}]
}, {
    "id": 197,
    "speed": 0,
    "display": "Trade Center",
    "tech": 77,
    "name": "FOR_Trade Center",
    "faction": "FOR",
    "health": 2000,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"credits": 75, "RepairBase": 196}, {"credits": 293, "RepairBase": 242}, {
        "credits": 360,
        "RepairBase": 299
    }, {"credits": 450, "RepairBase": 370}, {"credits": 585, "RepairBase": 457}, {
        "credits": 720,
        "RepairBase": 564
    }, {"credits": 915, "RepairBase": 696}, {"credits": 1140, "RepairBase": 860}, {
        "credits": 1425,
        "RepairBase": 1062
    }, {"credits": 1830, "RepairBase": 1311}, {"credits": 2288, "RepairBase": 1619}, {
        "credits": 2850,
        "RepairBase": 2000
    }],
    "modifiers": [{}, {}]
}, {
    "id": 198,
    "speed": 0,
    "display": "Harvester",
    "tech": 78,
    "name": "FOR_Harvester_Tiberium",
    "faction": "FOR",
    "health": 1500,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"tiberium": 35, "RepairBase": 196}, {"tiberium": 80, "RepairBase": 242}, {
        "tiberium": 175,
        "RepairBase": 299
    }, {"tiberium": 375, "RepairBase": 370}, {"tiberium": 725, "RepairBase": 457}, {
        "tiberium": 1150,
        "RepairBase": 564
    }, {"tiberium": 1450, "RepairBase": 696}, {"tiberium": 1820, "RepairBase": 860}, {
        "tiberium": 2300,
        "RepairBase": 1062
    }, {"tiberium": 2890, "RepairBase": 1311}, {"tiberium": 3640, "RepairBase": 1619}, {
        "tiberium": 4590,
        "RepairBase": 2000
    }],
    "modifiers": [{}, {}]
}, {
    "id": 199,
    "speed": 0,
    "display": "Harvester",
    "tech": 79,
    "name": "FOR_Harvester_Crystal",
    "faction": "FOR",
    "health": 1500,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 35, "RepairBase": 196}, {"crystal": 80, "RepairBase": 242}, {
        "crystal": 175,
        "RepairBase": 299
    }, {"crystal": 375, "RepairBase": 370}, {"crystal": 725, "RepairBase": 457}, {
        "crystal": 1150,
        "RepairBase": 564
    }, {"crystal": 1450, "RepairBase": 696}, {"crystal": 1820, "RepairBase": 860}, {
        "crystal": 2300,
        "RepairBase": 1062
    }, {"crystal": 2890, "RepairBase": 1311}, {"crystal": 3640, "RepairBase": 1619}, {
        "crystal": 4590,
        "RepairBase": 2000
    }],
    "modifiers": [{}, {}]
}, {
    "id": 200,
    "speed": 0,
    "display": "Falcon Support",
    "tech": 80,
    "name": "GDI_Support_Air",
    "faction": "GDI",
    "health": 2500,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 5}, {"tiberium": 8}, {"tiberium": 10, "power": 2}, {
        "tiberium": 20,
        "power": 4
    }, {"tiberium": 80, "power": 20}, {"tiberium": 440, "power": 110}, {
        "tiberium": 1440,
        "power": 360
    }, {"tiberium": 4400, "power": 1100}, {"tiberium": 12800, "power": 3200}, {
        "tiberium": 35200,
        "power": 8800
    }, {"tiberium": 89600, "power": 22400}, {"tiberium": 192000, "power": 48000}],
    "repair": [{}, {"tiberium": 3, "RepairBase": 31}, {"tiberium": 4, "RepairBase": 38}, {
        "tiberium": 5,
        "RepairBase": 47
    }, {"tiberium": 10, "RepairBase": 59}, {"tiberium": 36, "RepairBase": 73}, {
        "tiberium": 198,
        "RepairBase": 90
    }, {"tiberium": 432, "RepairBase": 111}, {"tiberium": 660, "RepairBase": 137}, {
        "tiberium": 832,
        "RepairBase": 170
    }, {"tiberium": 1056, "RepairBase": 209}, {"tiberium": 1640, "RepairBase": 259}, {
        "tiberium": 2419,
        "RepairBase": 320
    }],
    "modifiers": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
}, {
    "id": 201,
    "speed": 0,
    "display": "Ion Cannon Support",
    "tech": 81,
    "name": "GDI_Support_Ion",
    "faction": "GDI",
    "health": 2500,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 5}, {"tiberium": 8}, {"tiberium": 10, "power": 2}, {
        "tiberium": 20,
        "power": 4
    }, {"tiberium": 80, "power": 20}, {"tiberium": 440, "power": 110}, {
        "tiberium": 1440,
        "power": 360
    }, {"tiberium": 4400, "power": 1100}, {"tiberium": 12800, "power": 3200}, {
        "tiberium": 35200,
        "power": 8800
    }, {"tiberium": 89600, "power": 22400}, {"tiberium": 192000, "power": 48000}],
    "repair": [{}, {"tiberium": 3, "RepairBase": 31}, {"tiberium": 4, "RepairBase": 38}, {
        "tiberium": 5,
        "RepairBase": 47
    }, {"tiberium": 10, "RepairBase": 59}, {"tiberium": 36, "RepairBase": 73}, {
        "tiberium": 198,
        "RepairBase": 90
    }, {"tiberium": 432, "RepairBase": 111}, {"tiberium": 660, "RepairBase": 137}, {
        "tiberium": 832,
        "RepairBase": 170
    }, {"tiberium": 1056, "RepairBase": 209}, {"tiberium": 1640, "RepairBase": 259}, {
        "tiberium": 2419,
        "RepairBase": 320
    }],
    "modifiers": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
}, {
    "id": 202,
    "speed": 0,
    "display": "Skystrike Support",
    "tech": 82,
    "name": "GDI_Support_Art",
    "faction": "GDI",
    "health": 2500,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 5}, {"tiberium": 8}, {"tiberium": 10, "power": 2}, {
        "tiberium": 20,
        "power": 4
    }, {"tiberium": 80, "power": 20}, {"tiberium": 440, "power": 110}, {
        "tiberium": 1440,
        "power": 360
    }, {"tiberium": 4400, "power": 1100}, {"tiberium": 12800, "power": 3200}, {
        "tiberium": 35200,
        "power": 8800
    }, {"tiberium": 89600, "power": 22400}, {"tiberium": 192000, "power": 48000}],
    "repair": [{}, {"tiberium": 3, "RepairBase": 31}, {"tiberium": 4, "RepairBase": 38}, {
        "tiberium": 5,
        "RepairBase": 47
    }, {"tiberium": 10, "RepairBase": 59}, {"tiberium": 36, "RepairBase": 73}, {
        "tiberium": 198,
        "RepairBase": 90
    }, {"tiberium": 432, "RepairBase": 111}, {"tiberium": 660, "RepairBase": 137}, {
        "tiberium": 832,
        "RepairBase": 170
    }, {"tiberium": 1056, "RepairBase": 209}, {"tiberium": 1640, "RepairBase": 259}, {
        "tiberium": 2419,
        "RepairBase": 320
    }],
    "modifiers": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
}, {
    "id": 203,
    "speed": 0,
    "display": "Eye of Kane",
    "tech": 87,
    "name": "NOD_Support_Air",
    "faction": "NOD",
    "health": 2500,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 5}, {"tiberium": 8}, {"tiberium": 10, "power": 2}, {
        "tiberium": 20,
        "power": 4
    }, {"tiberium": 80, "power": 20}, {"tiberium": 440, "power": 110}, {
        "tiberium": 1440,
        "power": 360
    }, {"tiberium": 4400, "power": 1100}, {"tiberium": 12800, "power": 3200}, {
        "tiberium": 35200,
        "power": 8800
    }, {"tiberium": 89600, "power": 22400}, {"tiberium": 192000, "power": 48000}],
    "repair": [{}, {"tiberium": 2, "RepairBase": 31}, {"tiberium": 4, "RepairBase": 38}, {
        "tiberium": 5,
        "RepairBase": 47
    }, {"tiberium": 10, "RepairBase": 59}, {"tiberium": 36, "RepairBase": 73}, {
        "tiberium": 198,
        "RepairBase": 90
    }, {"tiberium": 432, "RepairBase": 111}, {"tiberium": 660, "RepairBase": 137}, {
        "tiberium": 832,
        "RepairBase": 170
    }, {"tiberium": 1056, "RepairBase": 209}, {"tiberium": 1640, "RepairBase": 259}, {
        "tiberium": 2419,
        "RepairBase": 320
    }],
    "modifiers": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
}, {
    "id": 204,
    "speed": 0,
    "display": "Fist of Kane",
    "tech": 88,
    "name": "NOD_Support_Ion",
    "faction": "NOD",
    "health": 2500,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 5}, {"tiberium": 8}, {"tiberium": 10, "power": 2}, {
        "tiberium": 20,
        "power": 4
    }, {"tiberium": 80, "power": 20}, {"tiberium": 440, "power": 110}, {
        "tiberium": 1440,
        "power": 360
    }, {"tiberium": 4400, "power": 1100}, {"tiberium": 12800, "power": 3200}, {
        "tiberium": 35200,
        "power": 8800
    }, {"tiberium": 89600, "power": 22400}, {"tiberium": 192000, "power": 48000}],
    "repair": [{}, {"tiberium": 2, "RepairBase": 31}, {"tiberium": 4, "RepairBase": 38}, {
        "tiberium": 5,
        "RepairBase": 47
    }, {"tiberium": 10, "RepairBase": 59}, {"tiberium": 36, "RepairBase": 73}, {
        "tiberium": 198,
        "RepairBase": 90
    }, {"tiberium": 432, "RepairBase": 111}, {"tiberium": 660, "RepairBase": 137}, {
        "tiberium": 832,
        "RepairBase": 170
    }, {"tiberium": 1056, "RepairBase": 209}, {"tiberium": 1640, "RepairBase": 259}, {
        "tiberium": 2419,
        "RepairBase": 320
    }],
    "modifiers": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
}, {
    "id": 205,
    "speed": 0,
    "display": "Blade of Kane",
    "tech": 86,
    "name": "NOD_Support_Art",
    "faction": "NOD",
    "health": 2500,
    "movement": "Structure",
    "resources": [{}, {"tiberium": 5}, {"tiberium": 8}, {"tiberium": 10, "power": 2}, {
        "tiberium": 20,
        "power": 4
    }, {"tiberium": 80, "power": 20}, {"tiberium": 440, "power": 110}, {
        "tiberium": 1440,
        "power": 360
    }, {"tiberium": 4400, "power": 1100}, {"tiberium": 12800, "power": 3200}, {
        "tiberium": 35200,
        "power": 8800
    }, {"tiberium": 89600, "power": 22400}, {"tiberium": 192000, "power": 48000}],
    "repair": [{}, {"tiberium": 2, "RepairBase": 31}, {"tiberium": 4, "RepairBase": 38}, {
        "tiberium": 5,
        "RepairBase": 47
    }, {"tiberium": 10, "RepairBase": 59}, {"tiberium": 36, "RepairBase": 73}, {
        "tiberium": 198,
        "RepairBase": 90
    }, {"tiberium": 432, "RepairBase": 111}, {"tiberium": 660, "RepairBase": 137}, {
        "tiberium": 832,
        "RepairBase": 170
    }, {"tiberium": 1056, "RepairBase": 209}, {"tiberium": 1640, "RepairBase": 259}, {
        "tiberium": 2419,
        "RepairBase": 320
    }],
    "modifiers": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
}, {
    "id": 206,
    "speed": 0,
    "display": "Tiberium Silo",
    "tech": 116,
    "name": "FOR_Tiberium Booster",
    "faction": "FOR",
    "health": 1500,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"tiberium": 35, "RepairBase": 196}, {"tiberium": 80, "RepairBase": 242}, {
        "tiberium": 175,
        "RepairBase": 299
    }, {"tiberium": 375, "RepairBase": 370}, {"tiberium": 725, "RepairBase": 457}, {
        "tiberium": 1150,
        "RepairBase": 564
    }, {"tiberium": 1450, "RepairBase": 696}, {"tiberium": 1820, "RepairBase": 860}, {
        "tiberium": 2300,
        "RepairBase": 1062
    }, {"tiberium": 2890, "RepairBase": 1311}, {"tiberium": 3640, "RepairBase": 1619}, {
        "tiberium": 4590,
        "RepairBase": 2000
    }],
    "modifiers": [{}, {}]
}, {
    "id": 207,
    "speed": 0,
    "display": "Crystal Silo",
    "tech": 117,
    "name": "FOR_Crystal Booster",
    "faction": "FOR",
    "health": 1500,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 35, "RepairBase": 196}, {"crystal": 80, "RepairBase": 242}, {
        "crystal": 175,
        "RepairBase": 299
    }, {"crystal": 375, "RepairBase": 370}, {"crystal": 725, "RepairBase": 457}, {
        "crystal": 1150,
        "RepairBase": 564
    }, {"crystal": 1450, "RepairBase": 696}, {"crystal": 1820, "RepairBase": 860}, {
        "crystal": 2300,
        "RepairBase": 1062
    }, {"crystal": 2890, "RepairBase": 1311}, {"crystal": 3640, "RepairBase": 1619}, {
        "crystal": 4590,
        "RepairBase": 2000
    }],
    "modifiers": [{}, {}]
}, {
    "id": 208,
    "speed": 60,
    "display": "Mammoth",
    "tech": -1,
    "name": "FOR_Mammoth",
    "faction": "FOR",
    "health": 1650,
    "movement": "Track",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 2, "ResearchPoints": 45}, {"crystal": 3, "ResearchPoints": 105}, {
        "crystal": 6,
        "ResearchPoints": 180
    }, {"crystal": 10, "ResearchPoints": 330}, {"crystal": 59, "ResearchPoints": 510}, {
        "crystal": 238,
        "ResearchPoints": 780
    }, {"crystal": 495, "ResearchPoints": 990}, {"crystal": 792, "ResearchPoints": 1260}, {
        "crystal": 901,
        "ResearchPoints": 1560
    }, {"crystal": 1188, "ResearchPoints": 1980}, {"crystal": 1812, "ResearchPoints": 2490}, {
        "crystal": 2661,
        "ResearchPoints": 3120
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 110,
        "id": 312,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 230,
        "id": 313,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 100,
        "id": 314,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 210,
    "speed": 40,
    "display": "Sniper Team",
    "tech": -1,
    "name": "FOR_Sniper",
    "faction": "FOR",
    "health": 500,
    "movement": "Feet",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 1, "ResearchPoints": 30}, {"crystal": 1, "ResearchPoints": 70}, {
        "crystal": 2,
        "ResearchPoints": 120
    }, {"crystal": 3, "ResearchPoints": 220}, {"crystal": 18, "ResearchPoints": 340}, {
        "crystal": 72,
        "ResearchPoints": 520
    }, {"crystal": 150, "ResearchPoints": 660}, {"crystal": 240, "ResearchPoints": 840}, {
        "crystal": 273,
        "ResearchPoints": 1040
    }, {"crystal": 360, "ResearchPoints": 1320}, {"crystal": 549, "ResearchPoints": 1660}, {
        "crystal": 806,
        "ResearchPoints": 2080
    }],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 260,
        "id": 315,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 40,
        "id": 316,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 30,
        "id": 317,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 211,
    "speed": 0,
    "display": "Camouflaged Flak",
    "tech": -1,
    "name": "FOR_Fortress_DEF_Turret_VS_Air",
    "faction": "FOR",
    "health": 800,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 400,
        "id": 349,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 397, "type": 2, "health": 0}]
}, {
    "id": 212,
    "speed": 40,
    "display": "Advanced Sniper Team",
    "tech": -1,
    "name": "FOR_Fortress_DEF_Sniper",
    "faction": "FOR",
    "health": 500,
    "movement": "Feet",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "weapons": [{
        "range": {"min": 0, "max": 350},
        "armorType": "LightArmorInfantry",
        "damage": 260,
        "id": 350,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 350},
        "armorType": "HeavyArmorVehicles",
        "damage": 40,
        "id": 351,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 30,
        "id": 352,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 350},
        "armorType": "MediumArmorAir",
        "damage": 30,
        "id": 401,
        "type": 7,
        "health": 0
    }]
}, {
    "id": 213,
    "speed": 40,
    "display": "Special-equipped Forgotten",
    "tech": -1,
    "name": "FOR_Fortress_DEF_Inf_VS_Inf",
    "faction": "FOR",
    "health": 700,
    "movement": "Feet",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 180,
        "id": 353,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 110,
        "id": 354,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "MediumArmorAir",
        "damage": 70,
        "id": 355,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 0,
        "id": 395,
        "type": 3,
        "health": 0
    }]
}, {
    "id": 214,
    "speed": 0,
    "display": "Overcharged MG Nest",
    "tech": -1,
    "name": "FOR_Fortress_DEF_Turret_VS_Inf",
    "faction": "FOR",
    "health": 900,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 220,
        "id": 356,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 100,
        "id": 357,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 60,
        "id": 358,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 250}, "armorType": "MediumArmorAir", "damage": 0, "id": 400, "type": 3, "health": 0}]
}, {
    "id": 215,
    "speed": 0,
    "display": "Buster",
    "tech": -1,
    "name": "FOR_Fortress_DEF_Turret_VS_Veh",
    "faction": "FOR",
    "health": 1150,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 50,
        "id": 359,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 380,
        "id": 360,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 216,
    "speed": 60,
    "display": "Shielded Mammoth",
    "tech": -1,
    "name": "FOR_Fortress_DEF_Mammoth",
    "faction": "FOR",
    "health": 1650,
    "movement": "Track",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 110,
        "id": 361,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 230,
        "id": 362,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 100,
        "id": 363,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 394, "type": 5, "health": 500}]
}, {
    "id": 217,
    "speed": 80,
    "display": "Upgraded Scrap Bus",
    "tech": -1,
    "name": "FOR_Fortress_DEF_Veh_VS_Air",
    "faction": "FOR",
    "health": 900,
    "movement": "Wheel",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 60,
        "id": 364,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 80,
        "id": 365,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 220,
        "id": 366,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 0,
        "id": 396,
        "type": 3,
        "health": 0
    }]
}, {
    "id": 218,
    "speed": 0,
    "display": "Advanced SAM site",
    "tech": -1,
    "name": "FOR_Fortress_DEF_Turret_VS_Air_ranged",
    "faction": "FOR",
    "health": 500,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "weapons": [{
        "range": {"min": 350, "max": 550},
        "armorType": "MediumArmorAir",
        "damage": 160,
        "id": 367,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 300, "max": 550},
        "armorType": "MediumArmorAir",
        "damage": 160,
        "id": 403,
        "type": 7,
        "health": 0
    }]
}, {
    "id": 219,
    "speed": 0,
    "display": "Advanced Reaper Artillery",
    "tech": -1,
    "name": "FOR_Fortress_DEF_Turret_VS_Inf_ranged",
    "faction": "FOR",
    "health": 500,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "weapons": [{
        "range": {"min": 300, "max": 550},
        "armorType": "LightArmorInfantry",
        "damage": 90,
        "id": 368,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 300, "max": 550},
        "armorType": "HeavyArmorVehicles",
        "damage": 25,
        "id": 369,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 350, "max": 550},
        "armorType": "MediumArmorAir",
        "damage": 15,
        "id": 370,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 300, "max": 550},
        "armorType": "MediumArmorAir",
        "damage": 15,
        "id": 405,
        "type": 7,
        "health": 0
    }]
}, {
    "id": 220,
    "speed": 0,
    "display": "Advanced Demolisher Artillery",
    "tech": -1,
    "name": "FOR_Fortress_DEF_Turret_VS_Veh_ranged",
    "faction": "FOR",
    "health": 600,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "weapons": [{
        "range": {"min": 300, "max": 550},
        "armorType": "LightArmorInfantry",
        "damage": 10,
        "id": 371,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 350, "max": 550},
        "armorType": "HeavyArmorVehicles",
        "damage": 130,
        "id": 372,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 300, "max": 550},
        "armorType": "HeavyArmorVehicles",
        "damage": 130,
        "id": 407,
        "type": 7,
        "health": 0
    }]
}, {
    "id": 221,
    "speed": 0,
    "display": "Particle Cannon",
    "tech": -1,
    "name": "FOR_Fortress_DEF_Tower",
    "faction": "FOR",
    "health": 1300,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "weapons": [{
        "range": {"min": 0, "max": 350},
        "armorType": "LightArmorInfantry",
        "damage": 160,
        "id": 373,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 350},
        "armorType": "HeavyArmorVehicles",
        "damage": 180,
        "id": 374,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 200,
        "id": 375,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 350},
        "armorType": "MediumArmorAir",
        "damage": 200,
        "id": 410,
        "type": 7,
        "health": 0
    }]
}, {
    "id": 222,
    "speed": 40,
    "display": "Predatory Rocket Fist",
    "tech": -1,
    "name": "FOR_Fortress_DEF_Unit",
    "faction": "FOR",
    "health": 1200,
    "movement": "Track",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 100,
        "id": 376,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 360,
        "id": 377,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 70,
        "id": 378,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 360,
        "id": 412,
        "type": 7,
        "health": 180
    }]
}, {
    "id": 223,
    "speed": 0,
    "display": "Camouflaged Flak",
    "tech": 123,
    "name": "FOR_Fortress_BASE_Turret_VS_Air",
    "faction": "FOR",
    "health": 800,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"RepairBase": 98}, {"RepairBase": 121}, {"RepairBase": 149}, {"RepairBase": 185}, {"RepairBase": 228}, {"RepairBase": 282}, {"RepairBase": 348}, {"RepairBase": 430}, {"RepairBase": 531}, {"RepairBase": 655}, {"RepairBase": 809}, {"RepairBase": 1000}],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 400,
        "id": 379,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 0}, "armorType": "NONE", "damage": 0, "id": 398, "type": 2, "health": 0}],
    "modifiers": [{}, {}]
}, {
    "id": 224,
    "speed": 0,
    "display": "Overcharged MG Nest",
    "tech": 124,
    "name": "FOR_Fortress_BASE_Turret_VS_Inf",
    "faction": "FOR",
    "health": 900,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"RepairBase": 98}, {"RepairBase": 121}, {"RepairBase": 149}, {"RepairBase": 185}, {"RepairBase": 228}, {"RepairBase": 282}, {"RepairBase": 348}, {"RepairBase": 430}, {"RepairBase": 531}, {"RepairBase": 655}, {"RepairBase": 809}, {"RepairBase": 1000}],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 220,
        "id": 380,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 100,
        "id": 381,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 60,
        "id": 382,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 0,
        "id": 399,
        "type": 3,
        "health": 0
    }],
    "modifiers": [{}, {}]
}, {
    "id": 225,
    "speed": 0,
    "display": "Buster",
    "tech": 125,
    "name": "FOR_Fortress_BASE_Turret_VS_Veh",
    "faction": "FOR",
    "health": 1150,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"RepairBase": 98}, {"RepairBase": 121}, {"RepairBase": 149}, {"RepairBase": 185}, {"RepairBase": 228}, {"RepairBase": 282}, {"RepairBase": 348}, {"RepairBase": 430}, {"RepairBase": 531}, {"RepairBase": 655}, {"RepairBase": 809}, {"RepairBase": 1000}],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 50,
        "id": 383,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 380,
        "id": 384,
        "type": 1,
        "health": 0
    }],
    "modifiers": [{}, {}]
}, {
    "id": 226,
    "speed": 0,
    "display": "Advanced SAM site",
    "tech": 126,
    "name": "FOR_Fortress_BASE_Turret_VS_Air_ranged",
    "faction": "FOR",
    "health": 500,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"RepairBase": 98}, {"RepairBase": 121}, {"RepairBase": 149}, {"RepairBase": 185}, {"RepairBase": 228}, {"RepairBase": 282}, {"RepairBase": 348}, {"RepairBase": 430}, {"RepairBase": 531}, {"RepairBase": 655}, {"RepairBase": 809}, {"RepairBase": 1000}],
    "weapons": [{
        "range": {"min": 350, "max": 550},
        "armorType": "MediumArmorAir",
        "damage": 160,
        "id": 385,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 300, "max": 550},
        "armorType": "MediumArmorAir",
        "damage": 160,
        "id": 402,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}]
}, {
    "id": 227,
    "speed": 0,
    "display": "Advanced Reaper Artillery",
    "tech": 127,
    "name": "FOR_Fortress_BASE_Turret_VS_Inf_ranged",
    "faction": "FOR",
    "health": 500,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"RepairBase": 98}, {"RepairBase": 121}, {"RepairBase": 149}, {"RepairBase": 185}, {"RepairBase": 228}, {"RepairBase": 282}, {"RepairBase": 348}, {"RepairBase": 430}, {"RepairBase": 531}, {"RepairBase": 655}, {"RepairBase": 809}, {"RepairBase": 1000}],
    "weapons": [{
        "range": {"min": 300, "max": 550},
        "armorType": "LightArmorInfantry",
        "damage": 90,
        "id": 386,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 300, "max": 550},
        "armorType": "HeavyArmorVehicles",
        "damage": 25,
        "id": 387,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 350, "max": 550},
        "armorType": "MediumArmorAir",
        "damage": 15,
        "id": 388,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 300, "max": 550},
        "armorType": "MediumArmorAir",
        "damage": 15,
        "id": 404,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}]
}, {
    "id": 228,
    "speed": 0,
    "display": "Advanced Demolisher Artillery",
    "tech": 128,
    "name": "FOR_Fortress_BASE_Turret_VS_Veh_ranged",
    "faction": "FOR",
    "health": 600,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"RepairBase": 98}, {"RepairBase": 121}, {"RepairBase": 149}, {"RepairBase": 185}, {"RepairBase": 228}, {"RepairBase": 282}, {"RepairBase": 348}, {"RepairBase": 430}, {"RepairBase": 531}, {"RepairBase": 655}, {"RepairBase": 809}, {"RepairBase": 1000}],
    "weapons": [{
        "range": {"min": 300, "max": 550},
        "armorType": "LightArmorInfantry",
        "damage": 10,
        "id": 389,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 350, "max": 550},
        "armorType": "HeavyArmorVehicles",
        "damage": 130,
        "id": 390,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 300, "max": 550},
        "armorType": "HeavyArmorVehicles",
        "damage": 130,
        "id": 406,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}]
}, {
    "id": 229,
    "speed": 0,
    "display": "Particle Cannon",
    "tech": 129,
    "name": "FOR_Fortress_BASE_Tower",
    "faction": "FOR",
    "health": 1300,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"RepairBase": 17}, {"RepairBase": 21}, {"RepairBase": 26}, {"RepairBase": 33}, {"RepairBase": 41}, {"RepairBase": 50}, {"RepairBase": 62}, {"RepairBase": 77}, {"RepairBase": 95}, {"RepairBase": 118}, {"RepairBase": 145}, {"RepairBase": 180}],
    "weapons": [{
        "range": {"min": 0, "max": 350},
        "armorType": "LightArmorInfantry",
        "damage": 160,
        "id": 391,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 350},
        "armorType": "HeavyArmorVehicles",
        "damage": 180,
        "id": 392,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 200,
        "id": 393,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 350},
        "armorType": "MediumArmorAir",
        "damage": 200,
        "id": 411,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}]
}, {
    "id": 230,
    "speed": 0,
    "display": "Wall",
    "tech": 130,
    "name": "FOR_Fortress_BASE_Wall",
    "faction": "FOR",
    "health": 2000,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"RepairBase": 98}, {"RepairBase": 121}, {"RepairBase": 149}, {"RepairBase": 185}, {"RepairBase": 228}, {"RepairBase": 282}, {"RepairBase": 348}, {"RepairBase": 430}, {"RepairBase": 531}, {"RepairBase": 655}, {"RepairBase": 809}, {"RepairBase": 1000}],
    "modifiers": [{}, {}]
}, {
    "id": 231,
    "speed": 0,
    "display": "Barbwire",
    "tech": 131,
    "name": "FOR_Fortress_BASE_Barbwire_VS_Inf",
    "faction": "FOR",
    "health": 1000,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"RepairBase": 98}, {"RepairBase": 121}, {"RepairBase": 149}, {"RepairBase": 185}, {"RepairBase": 228}, {"RepairBase": 282}, {"RepairBase": 348}, {"RepairBase": 430}, {"RepairBase": 531}, {"RepairBase": 655}, {"RepairBase": 809}, {"RepairBase": 1000}],
    "modifiers": [{}, {}]
}, {
    "id": 232,
    "speed": 0,
    "display": "Anti-tank barrier",
    "tech": 132,
    "name": "FOR_Fortress_BASE_Barrier_VS_Veh",
    "faction": "FOR",
    "health": 1500,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"RepairBase": 98}, {"RepairBase": 121}, {"RepairBase": 149}, {"RepairBase": 185}, {"RepairBase": 228}, {"RepairBase": 282}, {"RepairBase": 348}, {"RepairBase": 430}, {"RepairBase": 531}, {"RepairBase": 655}, {"RepairBase": 809}, {"RepairBase": 1000}],
    "modifiers": [{}, {}]
}, {
    "id": 233,
    "speed": 0,
    "display": "Tacitus Enclosure",
    "tech": 133,
    "name": "FOR_Fortress_BASE_Construction Yard",
    "faction": "FOR",
    "health": 5500,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"RepairBase": 196}, {"RepairBase": 242}, {"RepairBase": 299}, {"RepairBase": 370}, {"RepairBase": 457}, {"RepairBase": 564}, {"RepairBase": 696}, {"RepairBase": 860}, {"RepairBase": 1062}, {"RepairBase": 1311}, {"RepairBase": 1619}, {"RepairBase": 2000}],
    "modifiers": [{}, {
        "TiberiumStorage": 1000000000,
        "CrystalStorage": 1000000000,
        "BuildingSlots": 30,
        "PowerStorage": 100000,
        "HeadCountDefense": 400
    }]
}, {
    "id": 234,
    "speed": 60,
    "display": "Colossus",
    "tech": -1,
    "name": "FOR_Fortress_DEF_Unit_ranged",
    "faction": "FOR",
    "health": 1000,
    "movement": "Track",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "weapons": [{
        "range": {"min": 0, "max": 350},
        "armorType": "LightArmorInfantry",
        "damage": 70,
        "id": 413,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 350},
        "armorType": "HeavyArmorVehicles",
        "damage": 100,
        "id": 414,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 400,
        "id": 415,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 350},
        "armorType": "MediumArmorAir",
        "damage": 400,
        "id": 416,
        "type": 7,
        "health": 0
    }]
}, {
    "id": 235,
    "speed": 0,
    "display": "Heavy MG Nest",
    "tech": 134,
    "name": "FOR_Fortress_BASE_MgNestHeavy",
    "faction": "FOR",
    "health": 1200,
    "movement": "Structure",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"RepairBase": 0}, {"RepairBase": 0}, {"RepairBase": 0}, {"RepairBase": 0}, {"RepairBase": 0}, {"RepairBase": 0}, {"RepairBase": 0}, {"RepairBase": 0}, {"RepairBase": 0}, {"RepairBase": 0}, {"RepairBase": 0}, {"RepairBase": 0}],
    "weapons": [{
        "range": {"min": 0, "max": 350},
        "armorType": "LightArmorInfantry",
        "damage": 220,
        "id": 417,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 350},
        "armorType": "HeavyArmorVehicles",
        "damage": 120,
        "id": 418,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 350},
        "armorType": "MediumArmorAir",
        "damage": 80,
        "id": 419,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 350},
        "armorType": "MediumArmorAir",
        "damage": 80,
        "id": 420,
        "type": 7,
        "health": 0
    }],
    "modifiers": [{}, {}]
}, {
    "id": 236,
    "speed": 60,
    "display": "Rocket Fist",
    "tech": -1,
    "name": "FOR_OFF_Inf_VS_Veh",
    "faction": "FOR",
    "health": 1100,
    "movement": "Feet",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 1, "RepairInf": 0}, {"crystal": 2, "RepairInf": 0}, {
        "crystal": 3,
        "RepairInf": 0
    }, {"crystal": 4, "RepairInf": 0}, {"crystal": 18, "RepairInf": 0}, {
        "crystal": 72,
        "RepairInf": 0
    }, {"crystal": 150, "RepairInf": 0}, {"crystal": 240, "RepairInf": 0}, {
        "crystal": 273,
        "RepairInf": 0
    }, {"crystal": 363, "RepairInf": 0}, {"crystal": 549, "RepairInf": 0}, {"crystal": 807, "RepairInf": 0}],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 80,
        "id": 425,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 320,
        "id": 426,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 70,
        "id": 427,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 150}, "armorType": "StructureBase", "damage": 70, "id": 428, "type": 1, "health": 0}]
}, {
    "id": 237,
    "speed": 60,
    "display": "Forgotten",
    "tech": -1,
    "name": "FOR_OFF_Inf_VS_Inf",
    "faction": "FOR",
    "health": 700,
    "movement": "Feet",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 1, "RepairInf": 0}, {"crystal": 2, "RepairInf": 0}, {
        "crystal": 3,
        "RepairInf": 0
    }, {"crystal": 4, "RepairInf": 0}, {"crystal": 18, "RepairInf": 0}, {
        "crystal": 72,
        "RepairInf": 0
    }, {"crystal": 150, "RepairInf": 0}, {"crystal": 240, "RepairInf": 0}, {
        "crystal": 273,
        "RepairInf": 0
    }, {"crystal": 360, "RepairInf": 0}, {"crystal": 549, "RepairInf": 0}, {"crystal": 807, "RepairInf": 0}],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 180,
        "id": 429,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 110,
        "id": 430,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 70,
        "id": 431,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 150}, "armorType": "StructureBase", "damage": 70, "id": 432, "type": 1, "health": 0}]
}, {
    "id": 238,
    "speed": 60,
    "display": "Missile Squad",
    "tech": -1,
    "name": "FOR_OFF_Inf_VS_Air",
    "faction": "FOR",
    "health": 700,
    "movement": "Feet",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 1, "RepairInf": 0}, {"crystal": 2, "RepairInf": 0}, {
        "crystal": 3,
        "RepairInf": 0
    }, {"crystal": 4, "RepairInf": 0}, {"crystal": 8, "RepairInf": 0}, {"crystal": 29, "RepairInf": 0}, {
        "crystal": 60,
        "RepairInf": 0
    }, {"crystal": 96, "RepairInf": 0}, {"crystal": 110, "RepairInf": 0}, {
        "crystal": 144,
        "RepairInf": 0
    }, {"crystal": 220, "RepairInf": 0}, {"crystal": 323, "RepairInf": 0}],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 50,
        "id": 433,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 120,
        "id": 434,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 200,
        "id": 435,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 200,
        "id": 436,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 239,
    "speed": 60,
    "display": "Sniper Team",
    "tech": -1,
    "name": "FOR_OFF_Sniper",
    "faction": "FOR",
    "health": 500,
    "movement": "Feet",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 1, "RepairInf": 0}, {"crystal": 2, "RepairInf": 0}, {
        "crystal": 3,
        "RepairInf": 0
    }, {"crystal": 4, "RepairInf": 0}, {"crystal": 18, "RepairInf": 0}, {
        "crystal": 72,
        "RepairInf": 0
    }, {"crystal": 150, "RepairInf": 0}, {"crystal": 240, "RepairInf": 0}, {
        "crystal": 273,
        "RepairInf": 0
    }, {"crystal": 360, "RepairInf": 0}, {"crystal": 549, "RepairInf": 0}, {"crystal": 807, "RepairInf": 0}],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 260,
        "id": 437,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 40,
        "id": 438,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 30,
        "id": 439,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 250}, "armorType": "StructureBase", "damage": 30, "id": 440, "type": 1, "health": 0}]
}, {
    "id": 240,
    "speed": 90,
    "display": "Scooper",
    "tech": -1,
    "name": "FOR_OFF_Veh_VS_Veh",
    "faction": "FOR",
    "health": 900,
    "movement": "Track",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 1, "RepairVeh": 0}, {"crystal": 2, "RepairVeh": 0}, {
        "crystal": 3,
        "RepairVeh": 0
    }, {"crystal": 4, "RepairVeh": 0}, {"crystal": 20, "RepairVeh": 0}, {
        "crystal": 80,
        "RepairVeh": 0
    }, {"crystal": 165, "RepairVeh": 0}, {"crystal": 264, "RepairVeh": 0}, {
        "crystal": 301,
        "RepairVeh": 0
    }, {"crystal": 396, "RepairVeh": 0}, {"crystal": 604, "RepairVeh": 0}, {"crystal": 888, "RepairVeh": 0}],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 60,
        "id": 441,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 220,
        "id": 442,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 95,
        "id": 443,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 250}, "armorType": "StructureBase", "damage": 95, "id": 444, "type": 1, "health": 0}]
}, {
    "id": 241,
    "speed": 120,
    "display": "Bowler",
    "tech": -1,
    "name": "FOR_OFF_Veh_VS_Inf",
    "faction": "FOR",
    "health": 1000,
    "movement": "Wheel",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 1, "RepairVeh": 0}, {"crystal": 2, "RepairVeh": 0}, {
        "crystal": 3,
        "RepairVeh": 0
    }, {"crystal": 4, "RepairVeh": 0}, {"crystal": 15, "RepairVeh": 0}, {
        "crystal": 58,
        "RepairVeh": 0
    }, {"crystal": 120, "RepairVeh": 0}, {"crystal": 192, "RepairVeh": 0}, {
        "crystal": 219,
        "RepairVeh": 0
    }, {"crystal": 288, "RepairVeh": 0}, {"crystal": 440, "RepairVeh": 0}, {"crystal": 646, "RepairVeh": 0}],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 300,
        "id": 445,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 100,
        "id": 446,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 60,
        "id": 447,
        "type": 1,
        "health": 0
    }, {"range": {"min": 0, "max": 150}, "armorType": "StructureBase", "damage": 60, "id": 448, "type": 1, "health": 0}]
}, {
    "id": 242,
    "speed": 120,
    "display": "Scrap Bus",
    "tech": -1,
    "name": "FOR_OFF_Veh_VS_Air",
    "faction": "FOR",
    "health": 900,
    "movement": "Wheel",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 1, "RepairVeh": 0}, {"crystal": 2, "RepairVeh": 0}, {
        "crystal": 3,
        "RepairVeh": 0
    }, {"crystal": 5, "RepairVeh": 0}, {"crystal": 26, "RepairVeh": 0}, {
        "crystal": 101,
        "RepairVeh": 0
    }, {"crystal": 210, "RepairVeh": 0}, {"crystal": 336, "RepairVeh": 0}, {
        "crystal": 383,
        "RepairVeh": 0
    }, {"crystal": 504, "RepairVeh": 0}, {"crystal": 769, "RepairVeh": 0}, {"crystal": 1129, "RepairVeh": 0}],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 60,
        "id": 449,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 80,
        "id": 450,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 220,
        "id": 451,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "StructureBase",
        "damage": 220,
        "id": 452,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 243,
    "speed": 90,
    "display": "Mammoth",
    "tech": -1,
    "name": "FOR_OFF_Mammoth",
    "faction": "FOR",
    "health": 1650,
    "movement": "Track",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 2, "RepairVeh": 0}, {"crystal": 4, "RepairVeh": 0}, {
        "crystal": 6,
        "RepairVeh": 0
    }, {"crystal": 10, "RepairVeh": 0}, {"crystal": 60, "RepairVeh": 0}, {
        "crystal": 238,
        "RepairVeh": 0
    }, {"crystal": 495, "RepairVeh": 0}, {"crystal": 792, "RepairVeh": 0}, {
        "crystal": 901,
        "RepairVeh": 0
    }, {"crystal": 1188, "RepairVeh": 0}, {"crystal": 1812, "RepairVeh": 0}, {"crystal": 2662, "RepairVeh": 0}],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 110,
        "id": 453,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 230,
        "id": 454,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 130,
        "id": 455,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "StructureBase",
        "damage": 130,
        "id": 456,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 244,
    "speed": 120,
    "display": "Wasp",
    "tech": -1,
    "name": "FOR_OFF_Orca",
    "faction": "FOR",
    "health": 750,
    "movement": "Air",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 1, "RepairAir": 0}, {"crystal": 2, "RepairAir": 0}, {
        "crystal": 3,
        "RepairAir": 0
    }, {"crystal": 5, "RepairAir": 0}, {"crystal": 26, "RepairAir": 0}, {
        "crystal": 101,
        "RepairAir": 0
    }, {"crystal": 210, "RepairAir": 0}, {"crystal": 336, "RepairAir": 0}, {
        "crystal": 383,
        "RepairAir": 0
    }, {"crystal": 504, "RepairAir": 0}, {"crystal": 769, "RepairAir": 0}, {"crystal": 1129, "RepairAir": 0}],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 360,
        "id": 457,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 180,
        "id": 458,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 120,
        "id": 459,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 120,
        "id": 460,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 245,
    "speed": 120,
    "display": "Locust",
    "tech": -1,
    "name": "FOR_OFF_Paladin",
    "faction": "FOR",
    "health": 875,
    "movement": "Air",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 1, "RepairAir": 0}, {"crystal": 2, "RepairAir": 0}, {
        "crystal": 3,
        "RepairAir": 0
    }, {"crystal": 5, "RepairAir": 0}, {"crystal": 26, "RepairAir": 0}, {
        "crystal": 101,
        "RepairAir": 0
    }, {"crystal": 210, "RepairAir": 0}, {"crystal": 336, "RepairAir": 0}, {
        "crystal": 383,
        "RepairAir": 0
    }, {"crystal": 504, "RepairAir": 0}, {"crystal": 769, "RepairAir": 0}, {"crystal": 1129, "RepairAir": 0}],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 40,
        "id": 461,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 200,
        "id": 462,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 120,
        "id": 463,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "StructureBase",
        "damage": 120,
        "id": 464,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 246,
    "speed": 240,
    "display": "Smoker",
    "tech": -1,
    "name": "FOR_OFF_Firehawk",
    "faction": "FOR",
    "health": 475,
    "movement": "Air2",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 1, "RepairAir": 0}, {"crystal": 2, "RepairAir": 0}, {
        "crystal": 3,
        "RepairAir": 0
    }, {"crystal": 5, "RepairAir": 0}, {"crystal": 26, "RepairAir": 0}, {
        "crystal": 101,
        "RepairAir": 0
    }, {"crystal": 210, "RepairAir": 0}, {"crystal": 336, "RepairAir": 0}, {
        "crystal": 383,
        "RepairAir": 0
    }, {"crystal": 504, "RepairAir": 0}, {"crystal": 769, "RepairAir": 0}, {"crystal": 1129, "RepairAir": 0}],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 3000,
        "id": 465,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 3000,
        "id": 466,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 247,
    "speed": 0,
    "display": "GroundBlocker_Own",
    "tech": -1,
    "name": "GroundBlocker_Own",
    "faction": "FOR",
    "health": 0,
    "movement": "Structure",
    "resources": [{}],
    "repair": [{}]
}, {
    "id": 248,
    "speed": 60,
    "display": "Thumper",
    "tech": -1,
    "name": "FOR_OFF_Juggernaut",
    "faction": "FOR",
    "health": 1070,
    "movement": "Track",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 1, "RepairVeh": 0}, {"crystal": 3, "RepairVeh": 0}, {
        "crystal": 4,
        "RepairVeh": 0
    }, {"crystal": 7, "RepairVeh": 0}, {"crystal": 45, "RepairVeh": 0}, {
        "crystal": 178,
        "RepairVeh": 0
    }, {"crystal": 371, "RepairVeh": 0}, {"crystal": 594, "RepairVeh": 0}, {
        "crystal": 675,
        "RepairVeh": 0
    }, {"crystal": 891, "RepairVeh": 0}, {"crystal": 1359, "RepairVeh": 0}, {"crystal": 1996, "RepairVeh": 0}],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 30,
        "id": 523,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 80,
        "id": 524,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 360,
        "id": 525,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "StructureBase",
        "damage": 360,
        "id": 526,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 249,
    "speed": 60,
    "display": "Commando",
    "tech": -1,
    "name": "FOR_OFF_Commando",
    "faction": "FOR",
    "health": 900,
    "movement": "Feet",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 1, "RepairInf": 0}, {"crystal": 3, "RepairInf": 0}, {
        "crystal": 4,
        "RepairInf": 0
    }, {"crystal": 6, "RepairInf": 0}, {"crystal": 28, "RepairInf": 0}, {
        "crystal": 115,
        "RepairInf": 0
    }, {"crystal": 240, "RepairInf": 0}, {"crystal": 384, "RepairInf": 0}, {
        "crystal": 436,
        "RepairInf": 0
    }, {"crystal": 576, "RepairInf": 0}, {"crystal": 878, "RepairInf": 0}, {"crystal": 1291, "RepairInf": 0}],
    "weapons": [{
        "range": {"min": 0, "max": 150},
        "armorType": "LightArmorInfantry",
        "damage": 60,
        "id": 527,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "HeavyArmorVehicles",
        "damage": 30,
        "id": 528,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "Structure",
        "damage": 370,
        "id": 529,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 150},
        "armorType": "StructureBase",
        "damage": 370,
        "id": 530,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 250,
    "speed": 120,
    "display": "Dreadnought",
    "tech": -1,
    "name": "FOR_OFF_Kodiak",
    "faction": "FOR",
    "health": 1500,
    "movement": "Air",
    "resources": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    "repair": [{}, {"crystal": 2, "RepairAir": 0}, {"crystal": 5, "RepairAir": 0}, {
        "crystal": 7,
        "RepairAir": 0
    }, {"crystal": 12, "RepairAir": 0}, {"crystal": 65, "RepairAir": 0}, {
        "crystal": 252,
        "RepairAir": 0
    }, {"crystal": 525, "RepairAir": 0}, {"crystal": 840, "RepairAir": 0}, {
        "crystal": 957,
        "RepairAir": 0
    }, {"crystal": 1260, "RepairAir": 0}, {"crystal": 1922, "RepairAir": 0}, {"crystal": 2822, "RepairAir": 0}],
    "weapons": [{
        "range": {"min": 0, "max": 250},
        "armorType": "LightArmorInfantry",
        "damage": 100,
        "id": 531,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "HeavyArmorVehicles",
        "damage": 150,
        "id": 532,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "MediumArmorAir",
        "damage": 0,
        "id": 533,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "Structure",
        "damage": 400,
        "id": 534,
        "type": 1,
        "health": 0
    }, {
        "range": {"min": 0, "max": 250},
        "armorType": "StructureBase",
        "damage": 400,
        "id": 535,
        "type": 1,
        "health": 0
    }]
}, {
    "id": 251,
    "speed": 0,
    "display": "FOR_EVENT_Construction_Yard",
    "tech": 140,
    "name": "FOR_EVENT_Construction_Yard",
    "faction": "FOR",
    "health": 5500,
    "movement": "Structure",
    "resources": [{}, {}],
    "repair": [{}, {"tiberium": 10, "RepairBase": 196}],
    "modifiers": [{}, {
        "TiberiumStorage": 1000000000,
        "BuildingSlots": 30,
        "PowerStorage": 100000,
        "HeadCountDefense": 400
    }]
}]