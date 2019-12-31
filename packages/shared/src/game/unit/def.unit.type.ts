import { BaseY } from '@cncta/clientlib';
import { Tile } from '../base/tile';
import { Faction } from '../data/faction';
import { GameDataObjectType } from '../data/game.data.object';
import { UnitType } from './unit.type';

export class DefUnitType extends UnitType {
    constructor(id: number, faction: Faction, code: string) {
        super(GameDataObjectType.DefUnit, id, faction, code);
    }

    canBuildOn(x: number, y: number, tile: Tile): boolean {
        if (y <= BaseY.MaxBuilding) {
            return false;
        }

        if (y >= BaseY.MaxDef) {
            return false;
        }

        return super.canBuildOn(x, y, tile);
    }

    toString() {
        return '<DUnit:' + super.getName() + '>';
    }

    static GDI = {
        // Walls
        Wall: new DefUnitType(106, Faction.Gdi, 'w'),
        AntitankBarrier: new DefUnitType(105, Faction.Gdi, 't'),
        Barbwire: new DefUnitType(104, Faction.Gdi, 'b'),

        // Arty
        Watchtower: new DefUnitType(128, Faction.Gdi, 'r'),
        SAMSite: new DefUnitType(129, Faction.Gdi, 'e'),
        TitanArtillery: new DefUnitType(127, Faction.Gdi, 'a'),

        // Inf
        MissileSquad: new DefUnitType(97, Faction.Gdi, 'q'),
        Sniper: new DefUnitType(96, Faction.Gdi, 's'),
        ZoneTrooper: new DefUnitType(95, Faction.Gdi, 'z'),

        // Turret
        MGNest: new DefUnitType(102, Faction.Gdi, 'm'),
        Flak: new DefUnitType(103, Faction.Gdi, 'f'),
        Cannon: new DefUnitType(101, Faction.Gdi, 'c'),

        // Tank
        APCGuardian: new DefUnitType(99, Faction.Gdi, 'g'),
        PitBull: new DefUnitType(100, Faction.Gdi, 'p'),
        Predator: new DefUnitType(98, Faction.Gdi, 'd'),
    };

    static NOD = {
        // Walls
        LazerFence: new DefUnitType(169, Faction.Nod, 'b'),
        AntitankBarrier: new DefUnitType(173, Faction.Nod, 't'),
        Wall: new DefUnitType(174, Faction.Nod, 'w'),

        // Arty
        SamSite: new DefUnitType(172, Faction.Nod, 'e'),
        GatlingCannon: new DefUnitType(171, Faction.Nod, 'r'),
        ObeliskArtillery: new DefUnitType(170, Faction.Nod, 'a'),

        // Inf
        BlackHand: new DefUnitType(160, Faction.Nod, 'z'),
        Confessor: new DefUnitType(161, Faction.Nod, 's'),
        MilitantRocketSoldiers: new DefUnitType(162, Faction.Nod, 'q'),

        // Turret
        BeamCannon: new DefUnitType(166, Faction.Nod, 'c'),
        Flak: new DefUnitType(168, Faction.Nod, 'f'),
        MGNest: new DefUnitType(167, Faction.Nod, 'm'),

        // Tank
        AttackBike: new DefUnitType(165, Faction.Nod, 'p'),
        Reckoner: new DefUnitType(164, Faction.Nod, 'g'),
        ScorpionTank: new DefUnitType(163, Faction.Nod, 'd'),
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
