import {Faction} from '../data/faction';
import {GameDataObject} from '../data/gamedataobject';
import {Tile} from '../base/tile';
import {Constants} from '../constants';
import {UnitType} from './unittype';
import * as Util from '../util';

export class DUnitType extends UnitType {

    canBuildOn(x:Number, y:Number, tile:Tile):boolean {
        if (y <= Constants.MAX_BASE_Y) {
            return false;
        }

        if (y >= Constants.MAX_DEF_Y) {
            return false;
        }

        return super.canBuildOn(x, y, tile);
    }

    toString() {
        return '<DUnit:' + super.getName() + '>'
    }

    static GDI = {
        // Walls
        Wall: new DUnitType(106), //, Faction.GDI, 'Wall', 'w', 'GDI_Wall'),
        AntitankBarrier: new DUnitType(105), //, Faction.GDI, 'AntitankBarrier', 't', 'GDI_Antitank_Barrier'),
        Barbwire: new DUnitType(104), //, Faction.GDI, 'Barbwire', 'b', 'GDI_Barbwire'),

        // Arty
        Watchtower: new DUnitType(128), //, Faction.GDI, 'Watchtower', 'r', 'GDI_Art_Inf'),
        SAMSite: new DUnitType(129), //, Faction.GDI, 'SAM Site', 'e', 'GDI_Art_Air'),
        TitanArtillery: new DUnitType(127), //, Faction.GDI, 'Titan Artillery', 'a', 'GDI_Art_Tank'),

        // Inf
        MissileSquad: new DUnitType(97), //, Faction.GDI, 'MissileSquad', 'q', 'GDI_Def_Missile_Squad'),
        Sniper: new DUnitType(96), //, Faction.GDI, 'Sniper', 's', 'GDI_Def_Sniper'),
        ZoneTrooper: new DUnitType(95), //, Faction.GDI, 'ZoneTrooper', 'z', 'GDI_Def_Zone_Trooper'),

        // Turret
        MGNest: new DUnitType(102), //, Faction.GDI, 'MG Nest', 'm', 'GDI_Turret'),
        Flak: new DUnitType(103), //, Faction.GDI, 'Flak', 'f', 'GDI_Flak'),
        Cannon: new DUnitType(101), //, Faction.GDI, 'Cannon', 'c', 'GDI_Cannon'),

        // Tank
        APCGuardian: new DUnitType(99), //, Faction.GDI, 'Guardian', 'g', 'GDI_Def_APC_Guardian'),
        Pitbull: new DUnitType(100), //, Faction.GDI, 'Pitbull', 'p', 'GDI_Def_Pitbull'),
        Predator: new DUnitType(98), //, Faction.GDI, 'Predator', 'd', 'GDI_Def_Predator')
    };

    static NOD = {
        // Walls
        LazerFence: new DUnitType(169), //, Faction.NOD, 'Laser Fence', 'b', 'NOD_Def_Barbwire'),
        AntitankBarrier: new DUnitType(173), //, Faction.NOD, 'Antitank Barrier', 't', 'NOD_Def_Antitank_Barrier'),
        Wall: new DUnitType(174), //, Faction.NOD, 'Wall', 'w', 'NOD_Def_Wall'),

        // Arty
        SamSite: new DUnitType(172), //, Faction.NOD, 'Sam Site', 'e', 'NOD_Def_Art_Air'),
        GatlingCannon: new DUnitType(171), //, Faction.NOD, 'Gatling Cannon', 'r', 'NOD_Def_Art_Inf'),
        ObeliskArtillery: new DUnitType(170), //, Faction.NOD, 'Obelisk Artillery', 'a', 'NOD_Def_Art_Tank'),

        // Inf
        BlackHand: new DUnitType(160), //, Faction.NOD, 'Black Hand', 'z', 'NOD_Def_Black_Hand'),
        Confessor: new DUnitType(161), //, Faction.NOD, 'Confessor', 's', 'NOD_Def_Confessor'),
        MilitantRocketSoldiers: new DUnitType(162), //, Faction.NOD, 'Militant Rocket Soldiers', 'q', 'NOD_Def_Militant_Rocket_Soldiers'),

        // Turret
        BeamCannon: new DUnitType(166), //, Faction.NOD, 'Beam Cannon', 'c', 'NOD_Def_Cannon'),
        Flak: new DUnitType(168), //, Faction.NOD, 'Flak', 'f', 'NOD_Def_Flak'),
        MGNest: new DUnitType(167), //, Faction.NOD, 'MGNest', 'm', 'NOD_Def_MG_Nest'),

        // Tank
        AttackBike: new DUnitType(165), //, Faction.NOD, 'Attack Bike', 'p', 'NOD_Def_Attack_Bike'),
        Reckoner: new DUnitType(164), //, Faction.NOD, 'Reckoner', 'g', 'NOD_Def_Reckoner'),
        ScorpionTank: new DUnitType(163), //, Faction.NOD, 'Scorpion Tank', 'd', 'NOD_Def_Scorpion_Tank')
    };

    static Forgotten = {
        // Walls
        Wall: new DUnitType(190), //, Faction.Forgotten, 'Wall', 'b', 'FOR_Wall'),
        AntitankBarrier: new DUnitType(191), //, Faction.Forgotten, 'Antitank Barrier', 't', 'FOR_Barrier_VS_Veh'),
        Barbwire: new DUnitType(192), //, Faction.Forgotten, 'Barbwire', 'w', 'FOR_Barbwire_VS_Inf'),

        // Arty
        ReaperArtillery: new DUnitType(181), //, Faction.Forgotten, 'Reaper Artillery', 'd', 'FOR_Turret_VS_Veh_ranged'),
        DemolisherArtillery: new DUnitType(182), //, Faction.Forgotten, 'Demolisher Artillery', 'a', 'FOR_Turret_VS_Inf_ranged'),
        SAMsite: new DUnitType(183), //, Faction.Forgotten, 'SAM Site', 'e', 'FOR_Turret_VS_Air_ranged'),

        // Inf
        Forgotten: new DUnitType(185), //, Faction.Forgotten, 'Forgotten', 'g', 'FOR_Inf_VS_Inf'),
        RocketFist: new DUnitType(184), //, Faction.Forgotten, 'Rocket Fist', 'r', 'FOR_Inf_VS_Veh'),
        MissileSquad: new DUnitType(186), //, Faction.Forgotten, 'Missile Squad', 'q', 'FOR_Inf_VS_Air'),
        Sniper: new DUnitType(210), //, Faction.Forgotten, 'Sniper', 'n', 'FOR_Sniper'),

        // Turrets
        MGNest: new DUnitType(179), //, Faction.Forgotten, 'MGNest', 'm', 'FOR_Turret_VS_Inf'),
        Buster: new DUnitType(178), //, Faction.Forgotten, 'Buster', 'v', 'FOR_Turret_VS_Veh'),
        Flak: new DUnitType(180), //, Faction.Forgotten, 'Flak', 'f', 'FOR_Turret_VS_Air'),

        // Tanks
        Scooper: new DUnitType(187), //, Faction.Forgotten, 'Scooper', 's', 'FOR_Veh_VS_Veh'),
        Bowler: new DUnitType(188), //, Faction.Forgotten, 'Bowler', 'o', 'FOR_Veh_VS_Inf'),
        ScrapBus: new DUnitType(189), //, Faction.Forgotten, 'Scrap Bus', 'u', 'FOR_Veh_VS_Air'),
        Mammoth: new DUnitType(208), //, Faction.Forgotten, 'Mammoth', 'y', 'FOR_Mammoth')
    };

    static Fortress = {
        Flak: new DUnitType(211),
        MGNest: new DUnitType(214),
        Buster: new DUnitType(215),
        Cannon: new DUnitType(221),

        SniperTeam: new DUnitType(212),
        Forgotten: new DUnitType(213),
        RocketFist: new DUnitType(222),

        Mammoth: new DUnitType(216),
        ScrapBus: new DUnitType(217),
        Colossus: new DUnitType(234),

        SAMSite: new DUnitType(218),
        Reaper: new DUnitType(219),
        Demolisher: new DUnitType(220),
    };


    static MAP:{[key:string] : { [key:string]: DUnitType} } = {};

    static make(faction:Faction, char:string) {
        char = (char || '').toLowerCase();
        var u = DUnitType.MAP[faction.code][char];
        if (u) {
            return u;
        }

        return null;
    }
}
