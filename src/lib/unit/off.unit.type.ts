import { Tile } from '../base/tile';
import { Constants } from '../constants';
import { Faction } from '../data/faction';
import { UnitType } from './unit.type';
import { GameDataObjectType } from '../data/game.data.object';

export class OffUnitType extends UnitType {
    constructor(id: number, faction: Faction, code: string) {
        super(GameDataObjectType.OffUnit, id, faction, code);
    }

    canBuildOn(x: number, y: number, tile: Tile): boolean {
        if (y >= Constants.MAX_OFF_Y) {
            return false;
        }
        return super.canBuildOn(x, y, tile);
    }

    toString() {
        return '<OUnit:' + super.getName() + '>';
    }

    static GDI = {
        // Inf
        Commando: new OffUnitType(85, Faction.Gdi, 'c'),
        MissileSquad: new OffUnitType(82, Faction.Gdi, 'q'),
        Riflemen: new OffUnitType(81, Faction.Gdi, 'r'),
        SniperTeam: new OffUnitType(83, Faction.Gdi, 's'),
        ZoneTrooper: new OffUnitType(84, Faction.Gdi, 'z'),

        // Tank
        APCGuardian: new OffUnitType(88, Faction.Gdi, 'g'),
        Juggernaut: new OffUnitType(90, Faction.Gdi, 'j'),
        Mammoth: new OffUnitType(89, Faction.Gdi, 'm'),
        Pitbull: new OffUnitType(86, Faction.Gdi, 'p'),
        Predator: new OffUnitType(87, Faction.Gdi, 'd'),

        // Air
        Firehawk: new OffUnitType(94, Faction.Gdi, 'f'),
        Kodiak: new OffUnitType(93, Faction.Gdi, 'k'),
        Orca: new OffUnitType(91, Faction.Gdi, 'o'),
        Paladin: new OffUnitType(92, Faction.Gdi, 'a'),
    };

    static NOD = {
        // Inf
        Militants: new OffUnitType(133, Faction.Nod, 'm'),
        MilitantRocketSoldiers: new OffUnitType(134, Faction.Nod, 'q'),
        Confessor: new OffUnitType(135, Faction.Nod, 's'),
        BlackHand: new OffUnitType(136, Faction.Nod, 'z'),
        Commando: new OffUnitType(137, Faction.Nod, 'c'),

        // Tank
        AttackBike: new OffUnitType(138, Faction.Nod, 'b'),
        ScorpionTank: new OffUnitType(139, Faction.Nod, 'o'),
        Reckoner: new OffUnitType(140, Faction.Nod, 'k'),
        Avatar: new OffUnitType(141, Faction.Nod, 'a'),
        SpecterArtilery: new OffUnitType(142, Faction.Nod, 'p'),

        // Air
        Venom: new OffUnitType(143, Faction.Nod, 'v'),
        Cobra: new OffUnitType(144, Faction.Nod, 'r'),
        Salamander: new OffUnitType(145, Faction.Nod, 'l'),
        Vertigo: new OffUnitType(146, Faction.Nod, 't'),
    };

    static Forgotten = {
        RocketFist: new OffUnitType(236, Faction.Forgotten, 'r'),
        Forgotten: new OffUnitType(237, Faction.Forgotten, 'f'),
        MissileSquad: new OffUnitType(238, Faction.Forgotten, 'q'),
        SniperTeam: new OffUnitType(239, Faction.Forgotten, 's'),
        Commando: new OffUnitType(249, Faction.Forgotten, 'c'),

        Scooper: new OffUnitType(240, Faction.Forgotten, 'p'),
        Bowler: new OffUnitType(241, Faction.Forgotten, 'b'),
        ScrapBus: new OffUnitType(242, Faction.Forgotten, 'a'),
        Mammoth: new OffUnitType(243, Faction.Forgotten, 'm'),
        Thumper: new OffUnitType(248, Faction.Forgotten, 't'),

        Wasp: new OffUnitType(244, Faction.Forgotten, 'w'),
        Locust: new OffUnitType(245, Faction.Forgotten, 'l'),
        Smoker: new OffUnitType(246, Faction.Forgotten, 'k'),
        Dreadnought: new OffUnitType(250, Faction.Forgotten, 'd'),
    };
}
