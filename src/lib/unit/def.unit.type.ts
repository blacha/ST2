import { Tile } from '../base/tile';
import { Constants } from '../constants';
import { Faction } from '../data/faction';
import { UnitType } from './unit.type';

export class DefUnitType extends UnitType {
    canBuildOn(x: number, y: number, tile: Tile): boolean {
        if (y <= Constants.MAX_BASE_Y) {
            return false;
        }

        if (y >= Constants.MAX_DEF_Y) {
            return false;
        }

        return super.canBuildOn(x, y, tile);
    }

    toString() {
        return '<DUnit:' + super.getName() + '>';
    }

    static GDI = {
        // Walls
        Wall: new DefUnitType(106), //, Faction.GDI, 'Wall', 'w', 'GDI_Wall'),
        AntitankBarrier: new DefUnitType(105), //, Faction.GDI, 'AntitankBarrier', 't', 'GDI_Antitank_Barrier'),
        Barbwire: new DefUnitType(104), //, Faction.GDI, 'Barbwire', 'b', 'GDI_Barbwire'),

        // Arty
        Watchtower: new DefUnitType(128), //, Faction.GDI, 'Watchtower', 'r', 'GDI_Art_Inf'),
        SAMSite: new DefUnitType(129), //, Faction.GDI, 'SAM Site', 'e', 'GDI_Art_Air'),
        TitanArtillery: new DefUnitType(127), //, Faction.GDI, 'Titan Artillery', 'a', 'GDI_Art_Tank'),

        // Inf
        MissileSquad: new DefUnitType(97), //, Faction.GDI, 'MissileSquad', 'q', 'GDI_Def_Missile_Squad'),
        Sniper: new DefUnitType(96), //, Faction.GDI, 'Sniper', 's', 'GDI_Def_Sniper'),
        ZoneTrooper: new DefUnitType(95), //, Faction.GDI, 'ZoneTrooper', 'z', 'GDI_Def_Zone_Trooper'),

        // Turret
        MGNest: new DefUnitType(102), //, Faction.GDI, 'MG Nest', 'm', 'GDI_Turret'),
        Flak: new DefUnitType(103), //, Faction.GDI, 'Flak', 'f', 'GDI_Flak'),
        Cannon: new DefUnitType(101), //, Faction.GDI, 'Cannon', 'c', 'GDI_Cannon'),

        // Tank
        APCGuardian: new DefUnitType(99), //, Faction.GDI, 'Guardian', 'g', 'GDI_Def_APC_Guardian'),
        Pitbull: new DefUnitType(100), //, Faction.GDI, 'Pitbull', 'p', 'GDI_Def_Pitbull'),
        Predator: new DefUnitType(98), //, Faction.GDI, 'Predator', 'd', 'GDI_Def_Predator')
    };

    static NOD = {
        // Walls
        LazerFence: new DefUnitType(169), //, Faction.NOD, 'Laser Fence', 'b', 'NOD_Def_Barbwire'),
        AntitankBarrier: new DefUnitType(173), //, Faction.NOD, 'Antitank Barrier', 't', 'NOD_Def_Antitank_Barrier'),
        Wall: new DefUnitType(174), //, Faction.NOD, 'Wall', 'w', 'NOD_Def_Wall'),

        // Arty
        SamSite: new DefUnitType(172), //, Faction.NOD, 'Sam Site', 'e', 'NOD_Def_Art_Air'),
        GatlingCannon: new DefUnitType(171), //, Faction.NOD, 'Gatling Cannon', 'r', 'NOD_Def_Art_Inf'),
        ObeliskArtillery: new DefUnitType(170), //, Faction.NOD, 'Obelisk Artillery', 'a', 'NOD_Def_Art_Tank'),

        // Inf
        BlackHand: new DefUnitType(160), //, Faction.NOD, 'Black Hand', 'z', 'NOD_Def_Black_Hand'),
        Confessor: new DefUnitType(161), //, Faction.NOD, 'Confessor', 's', 'NOD_Def_Confessor'),
        MilitantRocketSoldiers: new DefUnitType(162), //, Faction.NOD, 'Militant Rocket Soldiers', 'q', 'NOD_Def_Militant_Rocket_Soldiers'),

        // Turret
        BeamCannon: new DefUnitType(166), //, Faction.NOD, 'Beam Cannon', 'c', 'NOD_Def_Cannon'),
        Flak: new DefUnitType(168), //, Faction.NOD, 'Flak', 'f', 'NOD_Def_Flak'),
        MGNest: new DefUnitType(167), //, Faction.NOD, 'MGNest', 'm', 'NOD_Def_MG_Nest'),

        // Tank
        AttackBike: new DefUnitType(165), //, Faction.NOD, 'Attack Bike', 'p', 'NOD_Def_Attack_Bike'),
        Reckoner: new DefUnitType(164), //, Faction.NOD, 'Reckoner', 'g', 'NOD_Def_Reckoner'),
        ScorpionTank: new DefUnitType(163), //, Faction.NOD, 'Scorpion Tank', 'd', 'NOD_Def_Scorpion_Tank')
    };

    static Forgotten = {
        // Walls
        Wall: new DefUnitType(190), //, Faction.Forgotten, 'Wall', 'b', 'FOR_Wall'),
        AntitankBarrier: new DefUnitType(191), //, Faction.Forgotten, 'Antitank Barrier', 't', 'FOR_Barrier_VS_Veh'),
        Barbwire: new DefUnitType(192), //, Faction.Forgotten, 'Barbwire', 'w', 'FOR_Barbwire_VS_Inf'),

        // Arty
        ReaperArtillery: new DefUnitType(181), //, Faction.Forgotten, 'Reaper Artillery', 'd', 'FOR_Turret_VS_Veh_ranged'),
        DemolisherArtillery: new DefUnitType(182), //, Faction.Forgotten, 'Demolisher Artillery', 'a', 'FOR_Turret_VS_Inf_ranged'),
        SAMsite: new DefUnitType(183), //, Faction.Forgotten, 'SAM Site', 'e', 'FOR_Turret_VS_Air_ranged'),

        // Inf
        Forgotten: new DefUnitType(185), //, Faction.Forgotten, 'Forgotten', 'g', 'FOR_Inf_VS_Inf'),
        RocketFist: new DefUnitType(184), //, Faction.Forgotten, 'Rocket Fist', 'r', 'FOR_Inf_VS_Veh'),
        MissileSquad: new DefUnitType(186), //, Faction.Forgotten, 'Missile Squad', 'q', 'FOR_Inf_VS_Air'),
        Sniper: new DefUnitType(210), //, Faction.Forgotten, 'Sniper', 'n', 'FOR_Sniper'),

        // Turrets
        MGNest: new DefUnitType(179), //, Faction.Forgotten, 'MGNest', 'm', 'FOR_Turret_VS_Inf'),
        Buster: new DefUnitType(178), //, Faction.Forgotten, 'Buster', 'v', 'FOR_Turret_VS_Veh'),
        Flak: new DefUnitType(180), //, Faction.Forgotten, 'Flak', 'f', 'FOR_Turret_VS_Air'),

        // Tanks
        Scooper: new DefUnitType(187), //, Faction.Forgotten, 'Scooper', 's', 'FOR_Veh_VS_Veh'),
        Bowler: new DefUnitType(188), //, Faction.Forgotten, 'Bowler', 'o', 'FOR_Veh_VS_Inf'),
        ScrapBus: new DefUnitType(189), //, Faction.Forgotten, 'Scrap Bus', 'u', 'FOR_Veh_VS_Air'),
        Mammoth: new DefUnitType(208), //, Faction.Forgotten, 'Mammoth', 'y', 'FOR_Mammoth')
    };

    static Fortress = {
        Flak: new DefUnitType(211),
        MGNest: new DefUnitType(214),
        Buster: new DefUnitType(215),
        Cannon: new DefUnitType(221),

        SniperTeam: new DefUnitType(212),
        Forgotten: new DefUnitType(213),
        RocketFist: new DefUnitType(222),

        Mammoth: new DefUnitType(216),
        ScrapBus: new DefUnitType(217),
        Colossus: new DefUnitType(234),

        SAMSite: new DefUnitType(218),
        Reaper: new DefUnitType(219),
        Demolisher: new DefUnitType(220),
    };

    static MAP: { [key: string]: { [key: string]: DefUnitType } } = {};
    static ID_MAP: { [key: number]: DefUnitType } = {};

    static make(faction: Faction, char: string) {
        char = (char || '').toLowerCase();
        const u = DefUnitType.MAP[faction.code][char];
        if (u) {
            return u;
        }

        return null;
    }
}
