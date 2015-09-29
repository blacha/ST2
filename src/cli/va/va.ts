import * as Util from '../../lib/util';
import {Constants} from '../../lib/constants';
import {Base} from '../../lib/base';
import {GameDataWeapon} from '../../lib/data/gamedata';


// What units will move for the Off
var MOVE = {
    FOR_Inf_VS_Air: 'air',
    FOR_Veh_VS_Air: 'air',

    FOR_Inf_VS_Inf: 'inf',
    FOR_Veh_VS_Inf: 'inf',

    FOR_Veh_VS_Veh: 'veh',
    FOR_Inf_VS_Veh: 'veh'
};

// List of objects that can be used as blockers
var BLOCKERS = {
    FOR_Veh_VS_Inf: 'veh',
    FOR_Wall: 'inf',
    FOR_Barrier_VS_Veh: 'inf',
    FOR_Barbwire_VS_Inf: 'inf',
    FOR_Turret_VS_Air_ranged: 'inf',
    FOR_Turret_VS_Air: 'veh'
};

var MAXX = Constants.MAX_BASE_X;
var MAXY = Constants.MAX_DEF_Y;
var MINY = Constants.MAX_BASE_Y;

var OFFSET_MIN = MAXX * MINY;
var OFFSET_MAX = MAXX * MAXY;

export class BaseAttack {
    CY:{x: number; y:number};
    DF:{x: number; y:number};
    //CY:BaseNode;
    //DF:BaseNode;
    unitslevel:number;
    unitcount:number;
    RP:number;
    def:{MediumArmorAir: number; LightArmorInfantry: number; HeavyArmorVehicles: number;}[];

    attackVector = {
        inf: [-1, -1, -1, -1],
        air: [-1, -1, -1, -1],
        veh: [-1, -1, -1, -1]
    };

    loot = {
        crystal: 0,
        tiberium: 0,
        ResearchPoints: 0,
        credits: 0
    };

    constructor(private base:Base, private tryPull = true) {

        base.baseForEach((x, y, building) => {
            if (building == null) {
                return;
            }

            var className = building.getClassName();

            var plunder = building.getPlunder();
            Util.addObject(plunder, this.loot);

            if (className == 'construction-yard') {
                this.CY = {
                    x: x,
                    y: y
                }
            } else if (className === 'defense-hq') {
                this.DF = {
                    x: x,
                    y: y
                }
            }
        });

        this.setVector('air', -1, -1, this.CY.x, this.CY.x);
        this.unitcount = 0;
        this.unitslevel = 0;
        this.def = [];
    }


    setVector(type, wave0 = -1, wave1 = -1, wave2 = -1, wave3 = -1) {
        this.attackVector[type] = [wave0, wave1, wave2, wave3];
    }


    getCYTotal() {
        var cyTotal = 0;
        for (var i = 0; i < Constants.MAX_DEF_Y; i++) {
            var index = Base.$index(this.CY.x, i);
            var def = this.def[index];

            if (def != null) {
                cyTotal += def.MediumArmorAir || 0;
            }
        }

        return cyTotal;
    }

    attack() {
        console.log({attack: this.attackVector}, 'Attack Vector');

        var startTime = +new Date();
        this.moveUnits();
        console.log({duration: +new Date() - startTime}, 'Move');

        startTime = +new Date();
        this.calculate();
        console.log({duration: +new Date() - startTime}, 'Calculate');

        //console.log(this.print());
        return this.getCYTotal();
    }

    // Move all the units that can move towards the attack vectors
    moveUnits(count = 0) {
        // paranoia
        if (count > 10) {
            return;
        }

        var moved = false;

        this.base.defForEach((x, y, unit) => {
            if (unit == null) {
                return;
            }

            var gd = unit.getGameData();
            var moveType = MOVE[gd.name];
            if (moveType == undefined) {
                return;
            }

            if ((<any>unit).moved == count) {
                return;
            }

            var currentWave = count > 3 ? 3 : count;
            // Where to move to
            var moveX = this.attackVector[moveType][currentWave];
            if (moveX == undefined || moveX == -1) {
                return;
            }
            // Where to move too?
            var offset = x - moveX;
            if (offset == 0) {
                return;
            }

            // move right?
            var nextX = x - 1;
            // move left one
            if (offset < 0) {
                nextX = x + 1;
            }

            var node = this.base.getBase(nextX, y);

            if (node != null) {
                return;
            }
            console.log({
                from: x + ':' + y,
                to: nextX + ':' + y,
                distance: offset,
                speed: gd.speed
            }, 'Moving unit', gd.name);

            moved = true;

            this.base.setBase(x, y, null);
            this.base.setBase(nextX, y, unit);

            (<any>unit).moved = count;
        });
        if (count > 4 && !moved) {
            return;
        }
        this.moveUnits(++count);
    }

    calculate() {

        this.RP = 0;
        this.base.defForEach((x, y, unit) => {
            if (unit == null) {
                return;
            }

            var data = unit.getGameData();
            if (data == null) {
                console.error({tile: unit.getClassName()}, 'No game data');
                return;
            }

            if (data.weapons == null) {
                return;
            }

            //console.log(unit.getClassName(), data.weapons);
            data.weapons.forEach((weapon:GameDataWeapon) => {
                if (weapon.damage == 0) {
                    return;
                }

                var attackMax = weapon.range.max / 100;
                var attackMin = weapon.range.min === 0 ? weapon.range.min : weapon.range.min / 100;

                var attackMaxRound = Math.ceil(attackMax);

                //console.log('Weapon', {max: attackMax, min: attackMin, x:x, y:row});
                for (var wX = x - attackMaxRound; wX <= x + attackMaxRound; wX++) {
                    if (wX < 0 || wX >= Constants.MAX_BASE_X) {
                        continue;
                    }
                    for (var wY = y - attackMaxRound; wY <= y + attackMaxRound; wY++) {
                        if (wY < Constants.MAX_BASE_Y || wY > Constants.MAX_DEF_Y + 2) {
                            continue;
                        }
                        var distance = calcDistance(wX, wY, x, y);
                        //console.log(x, y, '=>', wX, wY, distance, attackMax, attackMin);
                        if (distance < attackMax && distance >= attackMin) {
                            this.addWeapon(wX, wY, weapon, unit.getLevel());
                        } else if (distance < attackMax + 0.5 && distance >= attackMin) {
                            this.addWeapon(wX, wY, weapon, unit.getLevel(), 0.5);
                            //console.log(distance - attackMaxRound)
                        }
                    }
                }


            });
        });
    }

    addWeapon(x:number, y:number, weapon:GameDataWeapon, level:number, modifier = 1) {
        var index = Base.$index(x, y);
        var defTile = this.def[index] = this.def[index] || {
                MediumArmorAir: 0,
                LightArmorInfantry: 0,
                HeavyArmorVehicles: 0
            };
        defTile[weapon.armorType] = (defTile[weapon.armorType] || 0) +  modifier * Math.ceil(weapon.damage * Math.pow(1.1, level));
    }

    print() {
        var output = [];
        var line = [];

        line.push(this.base.getName());
        output.push(line);

        line = [];
        line[this.CY.x] = 'cy';
        line[this.DF.x] = 'df';
        output.push(line);

        var cyTotal = 0;

        var currentY = 0;
        this.base.defForEach((x, y, unit) => {
            var index = Base.$index(x, y);
            if (currentY != y) {
                line = [];
                output.push(line);
                currentY = y;
            }

            if (unit == null) {
                line[MAXX + x] = '';
            } else {
                line[MAXX + x] = unit.getGameData().display.substr(0, 2).toLowerCase() + " " +
                    Util.formatNumber(unit.getPlunder().ResearchPoints);
            }

            var def = this.def[index];
            if (def == null) {
                line[x] = '';
            } else {
                line[x] = def.MediumArmorAir;
                if (x == this.CY.x) {
                    cyTotal += def.MediumArmorAir;
                }
            }
        });

        output.push([]);
        output.push([]);

        line = [];
        line[this.CY.x] = cyTotal;
        output.push(line);

        for (var i = 0; i < 4; i++) {
            line = [];
            if (this.attackVector.air[i] > -1) {
                line[MAXX + this.attackVector.air[i]] = 'air';
            }

            if (this.attackVector.inf[i] > -1) {
                line[MAXX + this.attackVector.inf[i]] = 'inf';
            }

            if (this.attackVector.veh[i] > -1) {
                line[MAXX + this.attackVector.veh[i]] = 'veh';
            }

            output.push(line);
        }
        console.log('Loot');
        Object.keys(this.loot).forEach((key) => {
            console.log(key, Util.formatNumber(this.loot[key]));
        });
        return output.map(function (line) {
            return line.map(pad).join('\t');
        }).join('\n');
    }

}
var PAD = 5;
var PAD_EMPTY = pad('');

function pad(str) {
    if (str == null) {
        return PAD_EMPTY;
    }

    str = str + '';

    while (str.length < PAD) {
        str = ' ' + str;
    }
    return str;
}

function calcDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}
