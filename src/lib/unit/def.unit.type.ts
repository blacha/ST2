import { Tile } from '../base/tile';
import { Constants } from '../constants';
import { Faction } from '../data/faction';
import { UnitType } from './unit.type';
import { GameDataObjectType } from '../data/game.data.object';

export class DefUnitType extends UnitType {
    constructor(id: number, faction: Faction, code: string) {
        super(GameDataObjectType.DefUnit, id, faction, code);
    }

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
        Wall: new DefUnitType(106, Faction.GDI, 'w'),
        AntitankBarrier: new DefUnitType(105, Faction.GDI, 't'),
        Barbwire: new DefUnitType(104, Faction.GDI, 'b'),

        // Arty
        Watchtower: new DefUnitType(128, Faction.GDI, 'r'),
        SAMSite: new DefUnitType(129, Faction.GDI, 'e'),
        TitanArtillery: new DefUnitType(127, Faction.GDI, 'a'),

        // Inf
        MissileSquad: new DefUnitType(97, Faction.GDI, 'q'),
        Sniper: new DefUnitType(96, Faction.GDI, 's'),
        ZoneTrooper: new DefUnitType(95, Faction.GDI, 'z'),

        // Turret
        MGNest: new DefUnitType(102, Faction.GDI, 'm'),
        Flak: new DefUnitType(103, Faction.GDI, 'f'),
        Cannon: new DefUnitType(101, Faction.GDI, 'c'),

        // Tank
        APCGuardian: new DefUnitType(99, Faction.GDI, 'g'),
        PitBull: new DefUnitType(100, Faction.GDI, 'p'),
        Predator: new DefUnitType(98, Faction.GDI, 'd'),
    };

    static NOD = {
        // Walls
        LazerFence: new DefUnitType(169, Faction.NOD, 'b'),
        AntitankBarrier: new DefUnitType(173, Faction.NOD, 't'),
        Wall: new DefUnitType(174, Faction.NOD, 'w'),

        // Arty
        SamSite: new DefUnitType(172, Faction.NOD, 'e'),
        GatlingCannon: new DefUnitType(171, Faction.NOD, 'r'),
        ObeliskArtillery: new DefUnitType(170, Faction.NOD, 'a'),

        // Inf
        BlackHand: new DefUnitType(160, Faction.NOD, 'z'),
        Confessor: new DefUnitType(161, Faction.NOD, 's'),
        MilitantRocketSoldiers: new DefUnitType(162, Faction.NOD, 'q'),

        // Turret
        BeamCannon: new DefUnitType(166, Faction.NOD, 'c'),
        Flak: new DefUnitType(168, Faction.NOD, 'f'),
        MGNest: new DefUnitType(167, Faction.NOD, 'm'),

        // Tank
        AttackBike: new DefUnitType(165, Faction.NOD, 'p'),
        Reckoner: new DefUnitType(164, Faction.NOD, 'g'),
        ScorpionTank: new DefUnitType(163, Faction.NOD, 'd'),
    };

    static Forgotten = {
        // Walls
        Wall: new DefUnitType(190, Faction.Forgotten, 'b'),
        AntitankBarrier: new DefUnitType(191, Faction.Forgotten, 't'),
        Barbwire: new DefUnitType(192, Faction.Forgotten, 'w'),

        // Arty
        ReaperArtillery: new DefUnitType(181, Faction.Forgotten, 'd'),
        DemolisherArtillery: new DefUnitType(182, Faction.Forgotten, 'a'),
        SAMsite: new DefUnitType(183, Faction.Forgotten, 'e'),

        // Inf
        Forgotten: new DefUnitType(185, Faction.Forgotten, 'g'),
        RocketFist: new DefUnitType(184, Faction.Forgotten, 'r'),
        MissileSquad: new DefUnitType(186, Faction.Forgotten, 'q'),
        Sniper: new DefUnitType(210, Faction.Forgotten, 'n'),

        // Turrets
        MGNest: new DefUnitType(179, Faction.Forgotten, 'm'),
        Buster: new DefUnitType(178, Faction.Forgotten, 'v'),
        Flak: new DefUnitType(180, Faction.Forgotten, 'f'),

        // Tanks
        Scooper: new DefUnitType(187, Faction.Forgotten, 's'),
        Bowler: new DefUnitType(188, Faction.Forgotten, 'o'),
        ScrapBus: new DefUnitType(189, Faction.Forgotten, 'u'),
        Mammoth: new DefUnitType(208, Faction.Forgotten, 'y'),
    };

    static Fortress = {
        Flak: new DefUnitType(211, Faction.Forgotten, '?'),
        MGNest: new DefUnitType(214, Faction.Forgotten, '?'),
        Buster: new DefUnitType(215, Faction.Forgotten, '?'),
        Cannon: new DefUnitType(221, Faction.Forgotten, '?'),

        SniperTeam: new DefUnitType(212, Faction.Forgotten, '?'),
        Forgotten: new DefUnitType(213, Faction.Forgotten, '?'),
        RocketFist: new DefUnitType(222, Faction.Forgotten, '?'),

        Mammoth: new DefUnitType(216, Faction.Forgotten, '?'),
        ScrapBus: new DefUnitType(217, Faction.Forgotten, '?'),
        Colossus: new DefUnitType(234, Faction.Forgotten, '?'),

        SAMSite: new DefUnitType(218, Faction.Forgotten, '?'),
        Reaper: new DefUnitType(219, Faction.Forgotten, '?'),
        Demolisher: new DefUnitType(220, Faction.Forgotten, '?'),
    };
}
